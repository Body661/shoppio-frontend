import {useEffect, useState} from 'react'
import {Col, Card, Modal, Button, CardImg} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {deleteProduct} from "../../../redux/actions/productActions";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {DeleteOutline, EditOutlined, Star} from "@mui/icons-material";

const AdminProductsCard = ({product}) => {
    const [showDelete, setShow] = useState(false);
    const [loading, setLoading] = useState(true);

    const handleCloseDelete = () => setShow(false);
    const handleShowDelete = () => setShow(true);

    const dispatch = useDispatch();

    const handleDelete = async () => {
        setLoading(true)
        await dispatch(deleteProduct(product?._id))
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
        <Col className="d-flex">
            <Modal show={showDelete} onHide={handleCloseDelete}>
                <Modal.Header>
                    <Modal.Title>
                        <div>Confirm delete</div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>Do you sure you want to delete this product?</div>
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

            <Card className="my-2 product-card">
                <div className="product-card-img-holder b-radius-20">
                    <div className="d-flex justify-content-between">
                        <DeleteOutline className="favorite-icon" onClick={handleShowDelete}/>
                        <Link to={`/admin/products/${product?._id}`}>
                            <EditOutlined className="favorite-icon-right"/>
                        </Link>
                    </div>

                    <Link to={`/products/${product?._id}`}>
                        <CardImg src={product?.cover} className="product-cover"/>
                    </Link>
                </div>

                <Card.Body>
                    <Card.Title>
                        <div className="product-card-title text-center">
                            {product?.title}
                        </div>
                    </Card.Title>
                    <Card.Text>
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                                <Star style={{fontSize: "17px"}}/>
                                <div className="product-card-rate-text mx-2">{product?.ratingsAvg?.toFixed(1) || 0}</div>
                            </div>
                            <div className="d-flex">
                                <div className="product-card-price">
                                    {product.priceAfterDiscount >= 1 ?
                                        (<div>
                                            <span
                                                style={{
                                                    textDecorationLine: 'line-through',
                                                    color: "gray"
                                                }}> €{product.price} </span> €{product.priceAfterDiscount}
                                        </div>) : ` € ${product.price}`}
                                </div>
                            </div>
                        </div>
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default AdminProductsCard
