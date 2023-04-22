import {Button, Col, Modal} from "react-bootstrap";
import {Link} from "react-router-dom";
import {Backdrop, CircularProgress} from "@mui/material";
import {Delete, Edit} from "@mui/icons-material";
import useDeleteCoupon from "../../../hook/admin/Coupon/useDeleteCoupon";

function AdminCouponCard({coupon}) {
    const {isModalOpen, handleModalOpen, handleModalClose, handleDelete, loading, isPress} = useDeleteCoupon(coupon?._id)

    const formatDate = (dateString) => {
        const options = {year: 'numeric', month: '2-digit', day: 'numeric'};
        return new Date(dateString).toLocaleDateString(undefined, options);
    };


    return (
        <Col xs={12} sm={6} md={5} lg={3}>
            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={loading && isPress}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>

            <Modal show={isModalOpen} onHide={handleModalClose}>
                <Modal.Header>
                    <Modal.Title>
                        <div>Confirm delete</div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>Do you sure you want to delete this coupon?</div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-dark" onClick={handleModalClose}>
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
                        <Link to={`/admin/coupons/${coupon?._id}`} className="d-flex">
                            <Edit/>
                        </Link>

                        <Delete onClick={handleModalOpen}/>
                    </div>

                    <div>
                        <p className="my-2 text-center ">
                            <span>Coupon: </span>
                            <span className="fw-bold"> {coupon?.name}</span>
                        </p>

                        <p className="my-2 text-center">
                            <span>Expiration date: </span>
                            <span className="fw-bold"> {formatDate(coupon?.expire)}</span>
                        </p>

                        <p className="my-2 text-center">
                            <span>Discount: </span>
                            <span className="fw-bold"> {coupon?.discount}</span>
                        </p>
                    </div>
                </div>

            </Col>
        </Col>
    );
}

export default AdminCouponCard;