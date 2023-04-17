import {Container, Row} from 'react-bootstrap';
import CubeCard from "../Utility/CubeCard";
import brandsIcon from "../../imgs/Icons/brands.png";
import {Backdrop, CircularProgress} from "@mui/material";

const BrandsContainer = ({brands, loading, error}) => {

    let content = null;

    if (!loading && !error && brands && brands?.length > 0) {
        content = brands.map((brand) => (
            <CubeCard key={brand?._id} img={brand?.img} id={brand?._id} title={brand?.name} url="brands"/>
        ));

    } else if (!loading && !error && (brands && brands?.length <= 0)) {
        content = <h4 className="notFound">No brands found</h4>;

    } else if (!loading && error && (!brands || brands?.length <= 0)) {
        content = <h4 className="error">Something went wrong</h4>;
    }

    return (
        <Container>
            <div className="page-header">
                <Backdrop
                    sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                    open={loading}
                >
                    <CircularProgress color="inherit"/>
                </Backdrop>

            </div>

            <img src={brandsIcon} className="page-header-icon"/>
            <span className="page-header-text">
                        All brands
                    </span>
            <Row className="my-1 d-flex justify-content-center">{content}</Row>
        </Container>
    );
}

export default BrandsContainer
