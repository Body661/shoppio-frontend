import Pagination from "../../Utility/Pagination";
import {Button, Col, Container, FormControl, FormSelect, Row} from "react-bootstrap";
import {Backdrop, CircularProgress} from "@mui/material";
import {Link} from "react-router-dom";
import {CategoryOutlined} from "@mui/icons-material";
import AdminSubcategoryItem from "./adminSubcategoryItem";
import {useAllSubcategories} from "../../../hook/admin/Subcategory/useAllSubcategories";
import {useAllCategories} from "../../../hook/category/useAllCategories";

const AdminSubcategoriesContainer = () => {

    const {
        subcategories,
        pageCount,
        error,
        handleChangePage,
        loading,
        handleSearch,
        handleSelectCategory
    } = useAllSubcategories()

    let content = null;

    if (!loading && !error && subcategories && subcategories?.length > 0) {
        content = subcategories?.map((subcategory) => <AdminSubcategoryItem key={subcategory?._id}
                                                                            subcategory={subcategory}/>)
    } else if (!loading && !error && !subcategories) {
        content = <h4 className="notFound">No subcategories found</h4>;

    } else if (!loading && error && !subcategories) {
        content = <h4 className="error">Something went wrong</h4>;
    }

    const {categories} = useAllCategories()

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
                    <span className="page-header-text"> Subcategories </span>
                </Col>

                <Col sm={12} md={6}>
                    <Link to='/admin/subcategories/add-subcategory'
                          className="mt-3 d-flex justify-content-center">
                        <Button className="btn-outline-light btn-dark b-radius-10 w-100"
                                style={{transition: "0.5s"}}>
                            Add new subcategory
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

            <Row className="d-flex align-items-center justify-content-end">
                <Col xs={12} md={6} className="mt-2">
                    <FormSelect className="b-radius-10" onChange={handleSelectCategory}>
                        <option value="" defaultChecked={true}>
                            Search by category
                        </option>
                        {categories?.map(category => <option key={category?._id}
                                                             value={category?._id}>{category?.name}</option>)}
                    </FormSelect>
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

export default AdminSubcategoriesContainer;