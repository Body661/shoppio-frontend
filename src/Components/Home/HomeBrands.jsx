import { Container } from 'react-bootstrap';
import SubTitle from '../Utility/SubTitle';
import {useHomeBrands} from '../../hook/brand/useHomeBrands';
import BrandContainer from "../Brand/BrandContainer";

const HomeBrands = ({ title, btnTitle, path }) => {
    const { brands, loading, error} = useHomeBrands();

    return (
        <Container>
            <SubTitle title={title} btnTitle={btnTitle} pathText={path} />
            <BrandContainer brands={brands} loading={loading} error={error} />
        </Container>
    );
};

export default HomeBrands;
