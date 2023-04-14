import { Container } from 'react-bootstrap';
import SectionTitle from '../Utility/SectionTitle';
import {useHomeBrands} from '../../hook/brand/useHomeBrands';
import HomeBrandsContainer from "../Brand/HomeBrandsContainer";

const HomeBrands = ({ title, btnTitle, path }) => {
    const { brands, loading, error} = useHomeBrands();

    return (
        <Container>
            <SectionTitle title={title} btnTitle={btnTitle} pathText={path} />
            <HomeBrandsContainer brands={brands} loading={loading} error={error} />
        </Container>
    );
};

export default HomeBrands;
