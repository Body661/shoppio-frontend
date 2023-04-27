import {Button, Col, FormControl, Modal, Row} from 'react-bootstrap';
import {DeleteOutline, EditOutlined} from "@mui/icons-material";
import useDeleteAddress from "../../../hook/user/useDeleteAddress";
import {Backdrop, CircularProgress} from "@mui/material";
import useEditAddress from "../../../hook/user/useEditAddress";

const ProfileAddressCard = ({address}) => {
    const {
        showDeleteModal,
        handleCloseDeleteModal,
        handleShowDeleteModal,
        handleDeleteAddress,
        loadingDeleteAddress,
        isSubmittedDeleteAddress
    } = useDeleteAddress(address?._id);

    const {
        addressInfo,
        handleChangeAddress,
        handleUpdateAddress,
        isSubmittedUpdateAddress,
        loadingUpdateAddress,
        showUpdateModal,
        handleCloseUpdateModal,
        handleShowUpdateModal
    } = useEditAddress(address);

    const renderInput = (name, placeholder) => (
        <FormControl
            type="text"
            className="input-form d-block mt-3 px-3 b-radius-10"
            placeholder={placeholder}
            value={addressInfo[name]}
            onChange={handleChangeAddress}
            name={name}
        />
    );

    return (
        <Col xs={12} className={`user-address-card p-2 b-radius-10 mt-2`}
             style={{backgroundColor: "var(--main-white)"}}>

            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={(loadingDeleteAddress && isSubmittedDeleteAddress) || (isSubmittedUpdateAddress && loadingUpdateAddress)}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>

            <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
                <Modal.Header>
                    <Modal.Title>
                        <div>Confirm delete</div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>Are you sure you want to delete this address?</div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="outline-dark" className="b-radius-10" onClick={handleCloseDeleteModal}>
                        Cancel
                    </Button>
                    <Button variant="dark" className="b-radius-10" onClick={handleDeleteAddress}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>


            <Modal show={showUpdateModal} onHide={handleCloseUpdateModal}>
                <Modal.Header>
                    <Modal.Title>
                        <div>Edit address</div>
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {renderInput('alias', 'Address alias')}
                    {renderInput('street', 'Street')}
                    {renderInput('postalCode', 'Postal code')}
                    {renderInput('phone', 'Phone number')}
                    {renderInput('city', 'City')}
                    {renderInput('country', 'Country')}
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="outline-dark" className="b-radius-10" onClick={handleCloseUpdateModal}>
                        Cancel
                    </Button>
                    <Button variant="dark" className="b-radius-10" onClick={handleUpdateAddress}>
                        Save changes
                    </Button>
                </Modal.Footer>
            </Modal>

            <Col xs={12}>
                <Row>
                    <Col xs="10">
                        <span className="fw-bold">{address?.alias}</span>
                    </Col>

                    <Col xs="2" className="d-flex justify-content-end">
                        <EditOutlined onClick={handleShowUpdateModal}/>
                        <DeleteOutline onClick={handleShowDeleteModal}/>
                    </Col>
                </Row>
            </Col>

            <Row className="mt-2">
                    <span>
                        {address?.street}
                    </span>
            </Row>

            <Row className="mt-2">
                    <span>
                        {address?.postalCode} {address?.city}
                    </span>
            </Row>
        </Col>
    );
};

export default ProfileAddressCard;
