import { Container, Row, Spinner } from 'react-bootstrap';
import SubTitle from '../Uitily/SubTitle';
import BrandCard from '../Brand/BrandCard';
import {useHomeBrands} from '../../hook/brand/useHomeBrands';

const HomeBrands = ({ title, btnTitle, path }) => {
    const { brands, loading, error} = useHomeBrands();

    let content;

    if (loading && !brands && !error) {
        content = <Spinner animation="border" variant="primary" />;

    } else if (!loading && brands?.length) {
        content = brands.map((brand) => (
            <BrandCard key={brand._id} img={brand.img} id={brand._id} />
        ));

    } else if (!loading && !error && !brands) {
        content = <h4 className="notFound">No brands found</h4>;

    } else {
        content = <h4 className="error">Something went wrong</h4>;
    }

    return (
        <Container>
            <SubTitle title={title} btnTitle={btnTitle} pathText={path} />
            <Row className="my-1 d-flex justify-content-center">{content}</Row>
        </Container>
    );
};

export default HomeBrands;
