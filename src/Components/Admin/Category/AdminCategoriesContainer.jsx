import {useAllCategories} from "../../../hook/category/useAllCategories";
import Pagination from "../../Utility/Pagination";
import {Button, Col, Container, FormControl, Row} from "react-bootstrap";
import {Backdrop, CircularProgress} from "@mui/material";
import {Link} from "react-router-dom";
import {CategoryOutlined} from "@mui/icons-material";
import AdminCategoryItem from "./adminCategoryItem";

const AdminCategoriesContainer = () => {

    const {categories, pageCount, error, handleChangePage, loading, handleSearch} = useAllCategories()

    let content = null;

    if (!loading && !error && categories && categories?.length > 0) {
        content = categories?.map((category) => <AdminCategoryItem category={category}/>)
    } else if (!loading && !error && !categories) {
        content = <h4 className="notFound">No categories found</h4>;

    } else if (!loading && error && !categories) {
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
                    <CategoryOutlined style={{fontSize: "45px"}}/>
                    <span className="page-header-text"> Categories </span>
                </Col>

                <Col sm={12} md={6}>
                    <Link to='/admin/categories/add-category'
                          className="mt-3 d-flex justify-content-center">
                        <Button className="btn-outline-light btn-dark b-radius-10 w-100"
                                style={{transition: "0.5s"}}>
                            Add new category
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
};

export default AdminCategoriesContainer;