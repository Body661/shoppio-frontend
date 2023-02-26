import {Container, Row, Spinner} from 'react-bootstrap'
import SubTitle from '../Uitily/SubTitle'
import BrandCard from '../Brand/BrandCard'
import HomeBrandHook from "../../hook/brand/homeBrandHook";

const HomeBrands = ({title, btnTitle, path}) => {

    const [brands, loading, error] = HomeBrandHook()

    return (
        <Container>
            <SubTitle title={title} btnTitle={btnTitle} pathText={path}/>
            <Row className='my-1 d-flex justify-content-center'>
                {
                    loading && !error && !brands?.data?.data && <Spinner animation="border" variant="primary"/>
                }
                {
                    !loading && !error && (
                        brands?.data?.data ? (
                            brands?.data?.data?.map((item, index) => {
                                return (<BrandCard key={index} img={item?.img} id={item?._id}/>)
                            })
                        ) : <h4 className="notFound">No brands found</h4>
                    )
                }

                {
                    !loading && error && !brands?.data && <h4 className="error">Something went wrong</h4>
                }
            </Row>
        </Container>
    )
}
export default HomeBrands;