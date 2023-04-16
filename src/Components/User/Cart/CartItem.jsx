import {Button, Col, FormControl, Modal, Row} from 'react-bootstrap';
import useDeleteCart from '../../../hook/user/cart/useDeleteCart';
import {Link} from "react-router-dom";
import React from "react";
import {Rating} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import {DeleteOutline} from "@mui/icons-material";

const CartItem = ({item}) => {

    const {
        show,
        handleClose,
        handleShow,
        handleDeleteItem,
        itemCount,
        handleChangeCount,
        handleUpdateCart
    } = useDeleteCart(item);

    return (
        <Col className="cart-item-body w-100">
            <Modal show={show} onHide={handleShow}>
                <Modal.Header>
                    <Modal.Title>
                        <div>Confirm delete</div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div> Are you sure you want to delete this product from your cart?</div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-dark" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="dark" onClick={handleDeleteItem}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>

            <div className="w-100 d-flex align-items-center gap-4" style={{height: "200px"}}>
                <div style={{width: "200px", backgroundColor: "var(--main-gray)"}} className="h-100 d-flex b-radius-20">
                    <img
                        style={{objectFit: "contain"}}
                        width="100%"
                        src={item?.product?.cover}
                        alt={item?.product?.title}
                        className="p-2"
                    />
                </div>

                <Row>
                    <div className="d-inline pt-2 xs-black-text">
                        {item?.product?.brand?.name || "Brand not found"}
                    </div>

                    <Col sm="12" className=" d-flex flex-row justify-content-between align-items-center">
                        <Link to={`/products/${item?.product?._id}`} className="pt-2 fw-bold">
                            {item?.product?.title || 'Product title not available'}
                        </Link>

                        <div>
                            <div className="xs-black-text d-inline me-2">
                                {item?.priceAfterDiscount >= 1 ?
                                    (<>
                                        <span style={{textDecorationLine: 'line-through'}}>
                                            €{item?.price}
                                        </span>

                                        <span className="fw-bold fs-5"> €{item?.priceAfterDiscount}</span>
                                    </>) : (<span className="fw-bold fs-5"> €{item?.price} </span>)}
                            </div>
                        </div>
                    </Col>

                    <Col>
                        {item?.color && <div className="color" style={{backgroundColor: item?.color}}/>}
                    </Col>

                    <div className="d-flex flex-row gap-2 align-items-center mt-2">
                        <Rating
                            name="simple-controlled"
                            value={item?.product?.ratingsAvg}
                            readOnly
                            icon={<StarIcon style={{color: "black"}} fontSize="20px" color="black"/>}
                            emptyIcon={<StarIcon style={{opacity: 1}} fontSize="20px"/>}
                            precision={0.5}
                        />
                        <span>({item?.product?.ratingsQuantity})</span>
                    </div>

                    <Col sm="12">
                        <div className="d-inline pt-2 d-flex align-items-center">
                            <FormControl
                                min={0}
                                value={itemCount}
                                onChange={handleChangeCount}
                                className="mx-2 text-center"
                                type="number"
                                style={{width: "60px", height: "40px"}}
                            />
                            <Button onClick={handleUpdateCart} className='btn btn-dark'>Apply</Button>

                            <DeleteOutline className="ps-2" onClick={handleShow}
                                           style={{fontSize: "40px", cursor: "pointer"}}/>
                        </div>
                    </Col>
                </Row>
            </div>
        </Col>
    )
}

export default CartItem
