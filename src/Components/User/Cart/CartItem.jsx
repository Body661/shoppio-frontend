import {Button, Col, Modal, Row} from 'react-bootstrap';
import deleteIcon from '../../../images/delete.png';
import useDeleteCart from '../../../hook/user/cart/useDeleteCart';

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
        <Col xs="12" className="cart-item-body my-2 d-flex px-2">
            <Modal show={show} onHide={handleShow}>
                <Modal.Header>
                    <Modal.Title>
                        <div className="font">Confirm delete</div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="font">
                        Are you sure you want to delete this product from your cart?
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="font" variant="success" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button className="font" variant="dark" onClick={handleDeleteItem}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>

            <img
                width="160px"
                height="197px"
                src={item?.product?.cover}
                alt={item?.product?.title}
            />
            <div className="w-100">
                <Row className="justify-content-between">
                    <Col sm="12" className=" d-flex flex-row justify-content-between">
                        <div className="d-inline pt-2 xs-black-text">
                            {item?.product?.category?.name || 'No category'}
                        </div>
                        <div
                            className="d-flex pt-2 "
                            style={{cursor: 'pointer'}}
                            onClick={handleShow}
                        >
                            <img src={deleteIcon} alt="" width="20px" height="24px"/>
                            <div className="xs-black-text d-inline me-2">Delete</div>
                        </div>
                    </Col>
                </Row>
                <Row className="justify-content-center mt-2">
                    <Col sm="12" className=" d-flex flex-row justify-content-start">
                        <div className="d-inline pt-2 cat-title">
                            {item?.product?.title || 'Product title not available'}
                        </div>
                        <div className="d-inline pt-2 cat-rate me-2">
                            {item?.product?.ratingsAvg || 'No rating'}
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col sm="12" className="mt-1">
                        <div className="xs-black-text d-inline">Brand :</div>
                        <div className="brand-text d-inline mx-1">
                            {item?.product?.brand?.name || 'Unknown'}
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col sm="12" className="mt-1 d-flex">
                        {item?.color && (
                            <div
                                className="color ms-2 border"
                                style={{backgroundColor: `${item?.color}`}}
                            ></div>
                        )}
                    </Col>
                </Row>

                <Row className="justify-content-between">
                    <Col sm="12" className=" d-flex flex-row justify-content-between">
                        <div className="d-inline pt-2 d-flex">
                            <div className="xs-black-text mt-2  d-inline">Quantity:</div>
                            <input
                                value={itemCount}
                                onChange={handleChangeCount}
                                className="mx-2 text-center"
                                type="number"
                                style={{width: "60px", height: "40px"}}
                            />
                            <Button onClick={handleUpdateCart} className='btn btn-dark'>Apply</Button>
                        </div>
                        <div className="d-inline pt-2 brand-text">
                            {item?.product?.priceAfterDiscount >= 1 ? (<><span
                                style={{textDecorationLine: 'line-through'}}>{item?.product?.price}</span> {item?.product?.priceAfterDiscount}</>) : item?.product?.price} Euro
                        </div>
                    </Col>
                </Row>
            </div>
        </Col>
    )
}

export default CartItem
