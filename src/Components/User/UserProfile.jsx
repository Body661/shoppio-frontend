import {Row, Col, Modal, Button, FormControl} from 'react-bootstrap';
import useUserProfile from '../../hook/user/useUserProfile';
import {Backdrop, CircularProgress} from "@mui/material";
import {EditOutlined, Person} from "@mui/icons-material";

const UserProfile = () => {
    const {
        userData,
        showUpdateModal,
        handleCloseUpdateModal,
        handleShowUpdateModal,
        handleUpdateProfile,
        name,
        email,
        phone,
        handleChangeName,
        handleChangeEmail,
        handleChangePhone,
        loadingUpdateProfile,
        loadingGetProfile,
        isSubmittedUpdateProfile,
    } = useUserProfile();

    return (
        <>
            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={(loadingUpdateProfile && isSubmittedUpdateProfile) || loadingGetProfile}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>

            <Modal show={showUpdateModal} onHide={handleCloseUpdateModal}>
                <Modal.Header>
                    <Modal.Title>
                        <div>Edit personal information</div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormControl
                        value={name}
                        onChange={handleChangeName}
                        type="text"
                        className="input-form font d-block mt-3 px-3 b-radius-10"
                        placeholder="Name"
                    />
                    <FormControl
                        value={email}
                        onChange={handleChangeEmail}
                        type="email"
                        className="input-form font d-block mt-3 px-3 b-radius-10"
                        placeholder="Email"
                    />
                    <FormControl
                        value={phone}
                        onChange={handleChangePhone}
                        type="phone"
                        className="input-form font d-block mt-3 px-3 b-radius-10"
                        placeholder="Phone"
                    />
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="outline-dark" className="b-radius-10" onClick={handleCloseUpdateModal}>
                        Cancel
                    </Button>
                    <Button variant="dark" className="b-radius-10" onClick={handleUpdateProfile}>
                        Save changes
                    </Button>
                </Modal.Footer>
            </Modal>

            <Row>
                <div className="page-header mt-4">
                    <Person style={{fontSize: "45px"}}/>
                    <span className="page-header-text"> Profile </span>
                </div>
            </Row>

            <div className="mt-4">
                <Row style={{backgroundColor: "var(--main-gray)"}} className="b-radius-10 pt-2 pb-2">

                    <Col xs={12}>
                        <Row>
                            <Col xs="10">
                                <span className="fs-6 fw-bold p-0">Personal Information:</span>
                            </Col>

                            <Col xs="2" className="d-flex justify-content-end">
                                <EditOutlined onClick={handleShowUpdateModal}/>
                            </Col>
                        </Row>
                    </Col>

                    <Col xs="12" className="mt-2">
                        <span>Name: {userData?.name}</span>
                    </Col>

                    <Col xs="12" className="mt-2">
                        <span>Phone: {userData?.phone}</span>
                    </Col>

                    <Col xs="12" className="mt-2">
                        <div>Email: {userData?.email}</div>
                    </Col>
                </Row>
            </div>
        </>
    )

};

export default UserProfile;