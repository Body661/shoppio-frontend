import {Button, Col, Modal} from "react-bootstrap";
import {Link} from "react-router-dom";
import {Backdrop, CircularProgress} from "@mui/material";
import {Delete, Edit} from "@mui/icons-material";
import useDeleteSubcategory from "../../../hook/admin/Subcategory/useDeleteSubcategory";

function AdminSubcategoryItem({subcategory}) {

    const {
        showDelete,
        handleDelete,
        handleOpenDelete,
        handleCloseDelete,
        loading,
        isSubmitted
    } = useDeleteSubcategory(subcategory?._id)

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
                    <div>Do you sure you want to delete this subcategory?</div>
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
                        <Link to={`/admin/subcategories/${subcategory?._id}`} className="d-flex">
                            <Edit/>
                        </Link>

                        <Delete onClick={handleOpenDelete}/>
                    </div>


                    <p className="my-2 text-center">
                        {subcategory?.category?.name} / <span className="fw-bold">{subcategory?.name}</span>
                    </p>
                </div>

            </Col>
        </Col>
    );
}

export default AdminSubcategoryItem;