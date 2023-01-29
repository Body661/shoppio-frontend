import React from 'react'
import {Container, Row, Spinner} from 'react-bootstrap';
import SubTitle from '../Uitily/SubTitle'
import CategoryCard from '../Category/CategoryCard';
import HomeCategoryHook from "../../hook/category/homeCategoryHook";

const HomeCategory = () => {

    const [categories, loading, error] = HomeCategoryHook();

    return (
        <Container>
            <SubTitle title="Categories" btnTitle="more" pathText="/allCategory"/>
            <Row className='my-2 d-flex justify-content-between'>
                {
                    loading && !error && !categories.data && <Spinner animation="border" variant="primary"/>
                }
                {
                    !loading && !error && (
                        categories?.data ? (
                            categories?.data?.map((item, index) => {
                                return (<CategoryCard key={index} title={item?.name} img={item?.img}/>)
                            })
                        ) : <h4 className="notFound">No categories found</h4>
                    )
                }
                {
                    !loading && error && !categories.data && <h4 className="error">Something went wrong</h4>
                }
            </Row>
        </Container>
    )
}

export default HomeCategory