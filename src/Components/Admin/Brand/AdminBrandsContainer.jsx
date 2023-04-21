import {Button, Col, Container, FormControl, Row} from "react-bootstrap";
import AdminBrandCard from "./adminBrandCard";
import Pagination from "../../Utility/Pagination";
import {useAllBrands} from "../../../hook/brand/useAllBrands";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import {Backdrop, CircularProgress} from "@mui/material";
import {Link} from "react-router-dom";

function AdminBrandsContainer() {
    const {brands, loading, error, pageCount, handleChangePage, handleSearch} = useAllBrands()

    let content;

    if (!loading && !error && brands && brands?.length > 0) {
        content = brands?.map((brand) => <AdminBrandCard brand={brand}/>)
    } else if (!loading && !error && !brands) {
        content = <h4 className="notFound">No brands found</h4>;

    } else if (!loading && error && !brands) {
        content = <h4 className="error">Something went wrong</h4>;
    }

    return (
        <Container>
            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={loading}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>

            <Row className="d-flex justify-content-between align-items-center">
                <Col className="page-header mt-4" xs={12} md={6}>
                    <LoyaltyIcon style={{fontSize: "45px"}}/>
                    <span className="page-header-text"> Brands </span>
                </Col>

                <Col sm={12} md={6}>
                    <Link to='/admin/brands/add-brand'
                          className="mt-3 d-flex justify-content-center">
                        <Button className="btn-outline-light btn-dark b-radius-10 w-100"
                                style={{transition: "0.5s"}}>
                            Add new brand
                        </Button>
                    </Link>
                </Col>
            </Row>

            <Row className="d-flex align-items-center justify-content-end">
                <Col xs={12} md={6} className="mt-2">
                    <FormControl placeholder="Search by name" type="text" className="b-radius-10"
                                 onKeyPress={handleSearch}/>
                </Col>
            </Row>

            <Row className="mt-4">
                {content}
            </Row>

            <Row>
                {pageCount > 1 && <Pagination pageCount={pageCount} handleChangePage={handleChangePage}/>}
            </Row>
        </Container>
    );
}

export default AdminBrandsContainer;