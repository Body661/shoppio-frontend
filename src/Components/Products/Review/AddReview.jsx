import {Button, Col, FormControl, FormText, Row} from 'react-bootstrap';
import useAddReview from '../../../hook/products/review/useAddReview';
import {useParams} from 'react-router-dom';
import {Rating} from "@mui/material";
import StarIcon from '@mui/icons-material/Star';

const AddReview = () => {
    const {id} = useParams();
    const {handleSubmit, handleChangeRate, formData,handleChangeReview, onSubmit} = useAddReview(id);

    return (
        <div className="mt-2">
            <Row className="mt-3">
                <Col sm="12" className="me-5">
                    <div>
                        <span className="fw-bold fs-5">Add review:</span>
                    </div>

                    <Rating
                        className="mt-2"
                        name="hover-feedback"
                        value={formData?.rate || 0}
                        readOnly={false}
                        icon={<StarIcon style={{color: "black"}} fontSize="20px" color="black"/>}
                        emptyIcon={<StarIcon style={{opacity: 1}} fontSize="20px"/>}
                        precision={0.5}
                        onChange={(event, newValue) => {
                            handleChangeRate(newValue)
                        }}/>

                </Col>
            </Row>

            <Row>
                <Col className="d-flex pb-2 flex-column">
                    <FormControl
                        type="text"
                        value={formData?.reviewTitle}
                        onChange={(e) => handleChangeReview(e, 'reviewTitle')}
                        className="input-form p-2 mt-3"
                        placeholder="Review title"
                    />

                    <FormControl
                        as="textarea"
                        value={formData?.review}
                        onChange={(e) => handleChangeReview(e, 'review')}
                        className="p-2 mt-3"
                        rows="2"
                        cols="20"
                        placeholder="Review"
                    />
                    <div className="d-flex justify-content-end mt-3">
                        <Button onClick={handleSubmit} className="btn-dark b-radius-30 px-3 py-2">
                            Submit
                        </Button>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default AddReview;
