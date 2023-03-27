import {Row, Col, Modal, Button} from 'react-bootstrap';
import rate from '../../../images/rate.png';
import deleteIcon from '../../../images/delete.png';
import editIcon from '../../../images/edit.png';
import useDeleteReview from '../../../hook/products/review/useDeleteReview';
import useEditReview from '../../../hook/products/review/useEditReview';
import ReactStars from 'react-rating-stars-component';

const Review = ({review}) => {
    const {isUser, handleDelete, handleShow, handleClose, showDelete} = useDeleteReview(review);
    const {
        showEdit,
        handleCloseEdit,
        handleShowEdit,
        handleEdit,
        onChange,
        formData,
    } = useEditReview(review);

    const setting = {
        size: 20,
        count: 5,
        color: '#979797',
        activeColor: '#ffc107',
        value: formData.newRateValue,
        a11y: true,
        isHalf: true,
        emptyIcon: <i className="far fa-star"/>,
        halfIcon: <i className="fa fa-star-half-alt"/>,
        filledIcon: <i className="fa fa-star"/>,
        onChange: (newValue) => {
            onChange({target: {value: newValue}}, 'newRateValue');
        },
    };

    return (
        <div>
            <Modal show={showDelete} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>
                        <div className="font">Confirm delete</div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="font">Do you sure you want to delete this review?</div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="font" variant="success" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button className="font" variant="dark" onClick={handleDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Edit Modal */}
            <Modal show={showEdit} onHide={handleCloseEdit}>
                <Modal.Header>
                    <Modal.Title>
                        <div className="font">Edit review</div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ReactStars {...setting} />
                    <input
                        value={formData.newReviewTitle}
                        onChange={(e) => onChange(e, 'newReviewTitle')}
                        className="input-form p-2 mt-3"
                        placeholder="Write your review title...."
                    />
                    <textarea
                        value={formData.newReview}
                        onChange={(e) => onChange(e, 'newReview')}
                        className="input-form-area p-2 mt-3"
                        rows="2"
                        cols="20"
                        placeholder="Write your review...."
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button className="font" variant="success" onClick={handleCloseEdit}>
                        Cancel
                    </Button>
                    <Button className="font" variant="dark" onClick={handleEdit}>
                        Edit
                    </Button>
                </Modal.Footer>
            </Modal>

            <Row className="mt-3">
                <Col className="d-flex me-5">
                    <div className="rate-name d-inline">{review?.user?.name}</div>
                    <div className="cat-rate d-inline p-0 ps-2">{review?.ratings}</div>
                    <img src={rate} className="ms-2" alt="stars" height="16px" width="16px"/>
                </Col>
            </Row>
            <Row className="border-bottom mx-2">
                <Col className="d-flex me-4 pb-2 flex-column">
                    <div className="ms-2">
                        <strong>{review?.title}</strong>
                    </div>
                    <div className="rate-description ms-2">
                        {review?.description}
                        {isUser && (
                            <div className="d-inline d-flex justify-content-end">
                                <img
                                    src={editIcon}
                                    onClick={handleShowEdit}
                                    width="30px"
                                    height="30px"
                                    style={{cursor: 'pointer'}}
                                    alt="edit"
                                />
                                <img
                                    src={deleteIcon}
                                    onClick={handleShow}
                                    width="30px"
                                    height="30px"
                                    style={{cursor: 'pointer'}}
                                    alt="delete"
                                />
                            </div>
                        )}
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default Review