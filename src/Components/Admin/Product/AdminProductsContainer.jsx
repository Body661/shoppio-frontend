import {Button, Col, Container, FormControl, Row} from 'react-bootstrap'
import {Backdrop, CircularProgress} from "@mui/material";
import AdminProductsCard from "./AdminProductsCard";
import useAdminGetProducts from "../../../hook/admin/Product/useAdminGetProducts";
import Pagination from "../../Utility/Pagination";
import {Link} from "react-router-dom";
import {Inventory} from "@mui/icons-material";

const AdminProductsContainer = () => {
    let content = null;
    const {products, pagination, handleChangePage, loading, error, handleSearch} = useAdminGetProducts();

    if (!loading && !error && products && products?.length > 0) {
        content = products?.map((product) => (
            <Col xs={8} sm={6} md={4} lg={3}>
                <AdminProductsCard key={product?._id} product={product}/>
            </Col>
        ))

    } else if (!loading && !error && (products && products?.length <= 0)) {
        content = <h4 className="notFound">No products found</h4>;

    } else if (!loading && error && !products) {
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
                    <Inventory style={{fontSize: "45px"}}/>
                    <span className="page-header-text"> Products </span>
                </Col>

                <Col sm={12} md={6}>
                    <Link to='/admin/products/add-product'
                          className="mt-3 d-flex justify-content-center">
                        <Button className="btn-outline-light btn-dark b-radius-10 w-100"
                                style={{transition: "0.5s"}}>
                            Add new product
                        </Button>
                    </Link>
                </Col>
            </Row>

            <Row className="d-flex align-items-center justify-content-end">
                <Col xs={12} md={6} className="mt-2">
                    <FormControl placeholder="Search" type="text" className="b-radius-10" onKeyPress={handleSearch}/>
                </Col>
            </Row>

            <Row className="d-flex justify-content-center mt-4">
                {content}

                {pagination > 1 && (<Pagination pageCount={pagination} handleChangePage={handleChangePage}/>)}
            </Row>
        </Container>
    )
}

export default AdminProductsContainer