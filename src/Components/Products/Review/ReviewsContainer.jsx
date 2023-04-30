import {Container, Row, Col, Spinner} from 'react-bootstrap'
import Pagination from '../../Utility/Pagination';
import ReviewCard from './ReviewCard';
import AddReview from './AddReview';
import {useParams} from "react-router-dom";
import useGetProductReviews from "../../../hook/products/review/useGetProductReviews";

const ReviewsContainer = ({reviewsAmount}) => {
    const {id} = useParams()
    const {reviews, handleChangePage, loading, error} = useGetProductReviews(id)

    let content = null;

    if (!reviews && loading && !error) {
        content = <Spinner animation={"border"} variant={"primary"}/>
    } else if ((reviews && reviews?.data?.data?.length > 0) && !loading && !error) {
        content = reviews.data?.data?.map((review) => (<ReviewCard key={review?._id} review={review}/>))
    } else if ((reviews && reviews?.data?.data?.length <= 0) && !loading && !error) {
        content = <h6>No reviews found</h6>
    } else if (!reviews && !loading && error) {
        content = <h6 className="error">something went wrong</h6>
    }

    return (
        <Container>
            <AddReview/>

            <Row className="mt-2">
                <Col className="d-flex" sm={12}>
                    <div className="fw-bold"><span className="fs-5">Reviews</span> ({reviewsAmount})</div>
                </Col>

                <Col sm={12} className="mt-2">
                    {content}

                    {reviews?.data?.pagination?.pages > 1 && (<Pagination pageCount={reviews?.data?.pagination.pages || 0} handleChangePage={handleChangePage}/>)}
                </Col>
            </Row>

        </Container>
    )
}

export default ReviewsContainer
