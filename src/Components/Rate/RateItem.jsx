import {Row, Col, Modal, Button} from 'react-bootstrap'
import rate from '../../images/rate.png'
import {ToastContainer} from 'react-toastify';
import deleteIcon from '../../images/delete.png'
import editIcon from '../../images/edit.png'
import DeleteReviewHook from '../../hook/review/deleteReviewHook'
import EditReviewHook from '../../hook/review/editReviewHook'
import ReactStars from 'react-rating-stars-component'
import React from "react";

const RateItem = ({review}) => {
    const [isUser, handelDelete, handleShow, handleClose, showDelete] = DeleteReviewHook(review);
    const [showEdit, handleCloseEdit, handleShowEdit, handelEdit, onChangeReview, newReview, newReviewTitle, onChangeReviewTitle, OnChangeRateValue, newRateValue] = EditReviewHook(review)

    const setting = {
        size: 20,
        count: 5,
        color: "#979797",
        activeColor: "#ffc107",
        value: newRateValue,
        a11y: true,
        isHalf: true,
        emptyIcon: <i className="far fa-star"/>,
        halfIcon: <i className="fa fa-star-half-alt"/>,
        filledIcon: <i className="fa fa-star"/>,
        onChange: newValue => {
            OnChangeRateValue(newValue);
        }
    };

    return (
        <div>


            <Modal show={showDelete} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>
                        <div className='font'>Confirm delete</div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='font'>Do you sure you want to delete this review?</div>
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


            <Modal show={showEdit} onHide={handleCloseEdit}>
                <Modal.Header>
                    <Modal.Title>
                        <div className='font'>Edit review</div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ReactStars {...setting} />

                    <input
                        value={newReviewTitle}
                        onChange={onChangeReviewTitle}
                        className="input-form p-2 mt-3"
                        placeholder="Write your review title...."
                    />

                    <textarea
                        value={newReview}
                        onChange={onChangeReview}
                        className="input-form-area p-2 mt-3"
                        rows="2"
                        cols="20"
                        placeholder="Write your review...."
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button className='font' variant="success" onClick={handleCloseEdit}>
                        Cancel
                    </Button>
                    <Button className='font' variant="dark" onClick={handelEdit}>
                        Edit
                    </Button>
                </Modal.Footer>
            </Modal>

            <Row className="mt-3">
                <Col className="d-flex me-5">
                    <div className="rate-name  d-inline">{review?.user?.name}</div>
                    <div className="cat-rate  d-inline p-0 ps-2">{review?.ratings}</div>
                    <img src={rate} className="ms-2" alt="stars" height="16px" width="16px"/>
                </Col>
            </Row>
            <Row className="border-bottom mx-2">
                <Col className="d-flex me-4 pb-2 flex-column">
                    <div className="ms-2">
                      <b>{review?.title}</b>
                    </div>
                    <div className="rate-description ms-2">
                        {review?.description}
                        {
                            isUser === true ? (<div className='d-inline d-flex justify-content-end'>
                                <img src={editIcon} onClick={handleShowEdit} width="30px" height="30px"
                                     style={{cursor: "pointer"}} alt="edit"/>
                                <img src={deleteIcon} onClick={handleShow} width="30px" height="30px"
                                     style={{cursor: "pointer"}} alt="delete"/>
                            </div>) : null
                        }
                    </div>

                </Col>
            </Row>
            <ToastContainer/>
        </div>
    )
}

export default RateItem