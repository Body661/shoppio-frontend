import {Col, Container, Row} from 'react-bootstrap';
import CubeCard from "../Utility/CubeCard";
import {Backdrop, CircularProgress} from "@mui/material";
import LoyaltyIcon from "@mui/icons-material/Loyalty";

const BrandsContainer = ({brands, loading, error, isAll}) => {

    let content = null;

    if (!loading && !error && brands && brands?.length > 0) {
        content = brands.map((brand) => (
            <CubeCard key={brand?._id} img={brand?.img} id={brand?._id} title={brand?.name} url="brands"/>
        ));

    } else if (!loading && !error && (!brands || brands?.length <= 0)) {
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

            {isAll &&
                <Col className="page-header">
                    <LoyaltyIcon style={{fontSize: "45px"}}/>
                    <span className="page-header-text">  All brands </span>
                </Col>
            }
            <Row className="my-1 d-flex justify-content-center">{content}</Row>
        </Container>
    );
}

export default BrandsContainer
