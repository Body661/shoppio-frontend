import React, {useEffect, useState} from 'react'
import {Col, Card, Row, Modal, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {deleteProduct} from "../../../redux/actions/productActions";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";

const AdminProductsCard = ({item}) => {
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(true);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const dispatch = useDispatch();

    const handelDelete = async () => {
        setLoading(true)
        await dispatch(deleteProduct(item?._id))
        setShow(false);
        setLoading(false)
    }

    const deleteResponse = useSelector(state => state.productReducer.deleteProduct)

    useEffect(() => {
        if (!loading) {
            if (deleteResponse && deleteResponse?.status === 200) {
                toast("Product deleted successfully", {type: 'success', toastId: 'deleteProductSuccess'});
                setTimeout(() => {
                    window.location.reload();
                }, 1000)
            } else {
                toast(deleteResponse?.data?.errors ? deleteResponse?.data?.errors[0]?.msg : "Error while deleting product", {
                    type: 'error',
                    toastId: 'deleteProductError'
                });
            }
        }
    }, [loading, deleteResponse])

    return (
        <Col xs="12" sm="6" md="5" lg="4" className="d-flex">

            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>
                        <div className='font'>Confirm delete</div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='font'>Are you sure you want to delete this product?</div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='font' variant="success" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button className='font' variant="dark" onClick={handelDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>

            <Card
                className="my-2"
                style={{
                    width: "100%",
                    height: "350px",
                    borderRadius: "8px",
                    border: "none",
                    backgroundColor: "#FFFFFF",
                }}>
                <Row className="d-flex justify-content-center px-2">
                    <Col className=" d-flex justify-content-between">
                        <div onClick={handleShow} className="d-inline item-delete-edit">Delete</div>
                        <Link to={`/admin/updated-product/${item?._id}`} style={{textDecoration: "none"}}>
                            <div className="d-inline item-delete-edit">Edit</div>
                        </Link>
                    </Col>
                </Row>
                <Link to={`/products/${item?._id}`} style={{textDecoration: "none", overflow: "hidden"}}>
                    <Card.Img style={{height: "230px", width: "100%", objectFit: "contain"}} src={item?.cover}/>
                    <Card.Body>
                        <Card.Title>
                            <div className="card-title">
                                {item?.title}
                            </div>
                        </Card.Title>
                        <Card.Text>
                            <div className="d-flex justify-content-between">
                                <div className="card-rate">{item?.ratingsQuantity}</div>
                                <div className="d-flex">
                                    <div className="card-price">{item.priceAfterDiscount >= 1 ?
                                        (<div><span
                                            style={{textDecorationLine: 'line-through'}}>{item.price}</span> {item.priceAfterDiscount}
                                        </div>)
                                        : item.price}</div>
                                    <div className="card-currency mx-1">Euro</div>
                                </div>
                            </div>
                        </Card.Text>
                    </Card.Body>
                </Link>
            </Card>
        </Col>
    )
}

export default AdminProductsCard
