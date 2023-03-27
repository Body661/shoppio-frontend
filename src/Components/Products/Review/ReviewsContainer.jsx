import React from 'react'
import {Container, Row, Col, Spinner} from 'react-bootstrap'
import rate from '../../../images/rate.png'
import Pagination from '../../Utility/Pagination';
import Review from './Review';
import AddReview from './AddReview';
import {useParams} from "react-router-dom";
import useViewAllReviews from "../../../hook/products/review/useViewAllReviews";

const ReviewsContainer = ({rateAvg, rateQty}) => {
    const {id} = useParams()
    const {allReviews, onPress, loading, error} = useViewAllReviews(id)

    return (
        <Container className='rate-container'>
            <Row>
                <Col className="d-flex">
                    <div className="sub-tile d-inline p-1 ">Reviews</div>
                    <img className="mt-2" src={rate} alt="" height="16px" width="16px"/>
                    <div className="cat-rate  d-inline  p-1 pt-2">{rateAvg}</div>
                    <div className="rate-count d-inline p-1 pt-2">({`${rateQty}  reviews`})</div>
                </Col>
            </Row>

            <AddReview/>

            {!allReviews?.data?.data && loading && !error && <Spinner animation={"border"} variant={"primary"}/>}

            {allReviews?.data?.data?.length > 0 && !loading && !error ? (allReviews.data?.data?.map((review, index) => {
                return (<Review key={index} review={review}/>)
            })) : <h6>No reviews yet</h6>}

            {!allReviews?.data && !loading && error && <h6 className="error">something went wrong</h6>}

            {allReviews?.data?.paginationResult && allReviews?.data?.paginationResult?.numberOfPages >= 2 ? (
                <Pagination pageCount={allReviews?.data?.paginationResult ? allReviews?.data?.paginationResult?.numberOfPages : 0}
                            onPress={onPress}/>) : null}
        </Container>
    )
}

export default ReviewsContainer
