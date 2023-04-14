import {Container, Row, Spinner} from 'react-bootstrap';
import HomeBrandCard from "./HomeBrandCard";

const HomeBrandsContainer = ({brands, loading, error}) => {

    let content = null;

    if (loading && !brands && !error) {
        content = <Spinner animation="border" variant="primary"/>;

    } else if (!loading && !error && brands && brands?.length) {
        content = brands.map((brand) => (
            <HomeBrandCard key={brand?._id} img={brand?.img} id={brand?._id} title={brand?.name}/>
        ));

    } else if (!loading && !error && brands && !brands?.length) {
        content = <h4 className="notFound">No brands found</h4>;

    } else {
        content = <h4 className="error">Something went wrong</h4>;
    }

    return (
        <Container>
            <Row className="my-1 d-flex justify-content-center">{content}</Row>
        </Container>
    );
}

export default HomeBrandsContainer
