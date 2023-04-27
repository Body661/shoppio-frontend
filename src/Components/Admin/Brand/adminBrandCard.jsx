import {Button, Col, Modal} from "react-bootstrap";
import {Link} from "react-router-dom";
import useDeleteBrand from "../../../hook/admin/Brand/useDeleteBrand";
import {Backdrop, CircularProgress} from "@mui/material";
import {Delete, Edit} from "@mui/icons-material";

function AdminBrandCard({brand}) {

    const {
        showDelete,
        handleDelete,
        handleOpenDelete,
        handleCloseDelete,
        loading,
        isSubmitted
    } = useDeleteBrand(brand?._id)

    return (
        <Col xs={12} sm={6} md={5} lg={3}>
            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={loading && isSubmitted}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>

            <Modal show={showDelete} onHide={handleCloseDelete}>
                <Modal.Header>
                    <Modal.Title>
                        <div>Confirm delete</div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>Do you sure you want to delete this brand?</div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-dark" onClick={handleCloseDelete}>
                        Cancel
                    </Button>
                    <Button variant="dark" onClick={handleDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>

            <Col className="mt-4">
                <div className="d-flex flex-column align-items-center gap-2 p-2 b-radius-10"
                     style={{backgroundColor: "var(--main-gray)"}}>
                    <div className="d-flex justify-content-between w-100">
                        <Link to={`/admin/brands/${brand?._id}`} className="d-flex">
                            <Edit/>
                        </Link>

                        <Delete onClick={handleOpenDelete}/>
                    </div>

                    <Link to={`/brands/${brand?._id}`}>
                        <img src={brand?.img} className="b-radius-100p" alt={brand?.name}/>
                        <div
                            style={{backgroundImage: `URL(${brand?.img})`}}
                        />
                    </Link>
                </div>

                <p className="my-2 text-center fw-bold">{brand?.name}</p>
            </Col>
        </Col>
    );
}

export default AdminBrandCard;