import {Row, Modal, Button, FormControl} from 'react-bootstrap';
import useDeleteReview from '../../../hook/products/review/useDeleteReview';
import useEditReview from '../../../hook/products/review/useEditReview';
import {Rating} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import {DeleteOutline, Edit} from "@mui/icons-material";

const ReviewCard = ({review}) => {
    const {isUser, handleDelete, handleShowDelete, handleCloseDelete, showDelete} = useDeleteReview(review);
    const {
        showEdit,
        handleCloseEdit,
        handleShowEdit,
        handleEdit,
        onChange,
        formData,
    } = useEditReview(review);

    return (
        <>
            {/*Delete modal*/}
            <Modal show={showDelete} onHide={handleCloseDelete}>
                <Modal.Header>
                    <Modal.Title>
                        <div className="font">Confirm delete</div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="font">Do you sure you want to delete this review?</div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="font" variant="outline-dark" onClick={handleCloseDelete}>
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

                    <Rating
                        className="mt-2"
                        name="hover-feedback"
                        value={formData?.newRateValue || 0}
                        readOnly={false}
                        icon={<StarIcon style={{color: "black"}} fontSize="20px" color="black"/>}
                        emptyIcon={<StarIcon style={{opacity: 1}} fontSize="20px"/>}
                        precision={0.5}
                        onChange={(event, newValue) => {
                            onChange({target: {value: newValue}}, 'newRateValue');
                        }}/>

                    <FormControl
                        type="text"
                        value={formData.newReviewTitle}
                        onChange={(e) => onChange(e, 'newReviewTitle')}
                        className="input-form p-2 mt-3"
                        placeholder="Review title"
                    />
                    <FormControl
                        as="textarea"
                        value={formData.newReview}
                        onChange={(e) => onChange(e, 'newReview')}
                        className="input-form-area p-2 mt-3"
                        rows="2"
                        cols="20"
                        placeholder="Review"
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button className="font" variant="outline-dark" onClick={handleCloseEdit}>
                        Cancel
                    </Button>
                    <Button className="font" variant="dark" onClick={handleEdit}>
                        Save changes
                    </Button>
                </Modal.Footer>
            </Modal>

            <Row className="mt-3 border border-dark p-1 b-radius-10">
                <div className="d-flex align-items-center gap-1">
                    <Rating
                        name="simple-controlled"
                        value={review?.ratings}
                        precision={0.5}
                        icon={<StarIcon style={{color: "black"}} fontSize="20px" color="black"/>}
                        emptyIcon={<StarIcon style={{opacity: 1}} fontSize="20px"/>}
                        readOnly
                    />
                    <span className="fw-bold">({review?.ratings})</span>
                </div>

                <div className="d-flex mt-2 flex-column" style={{wordWrap: "break-word"}}>
                    <span className="fw-bold">{review?.title} | {review?.user?.name}</span>

                    <p className="mt-2">
                        {review?.description}
                    </p>

                    {isUser && (
                        <div className="d-inline d-flex justify-content-end">
                            <Edit onClick={handleShowEdit} style={{cursor: 'pointer'}}/>
                            <DeleteOutline onClick={handleShowDelete} style={{cursor: 'pointer'}}/>
                        </div>
                    )}
                </div>
            </Row>
        </>
    )
}

export default ReviewCard