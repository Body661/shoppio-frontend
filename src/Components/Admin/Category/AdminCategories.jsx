import {useAllCategories} from "../../../hook/category/useAllCategories";
import Pagination from "../../Utility/Pagination";
import {Spinner} from "react-bootstrap";
import React from "react";
import AdminCategoriesContainer from "./AdminCategoriesContainer";

const AdminCategories = () => {

    const {categories, pageCount, error, handleChangePage, loading} = useAllCategories()

    let content = null;

    if (loading && !categories && !error) {
        content = <Spinner animation="border" variant="primary"/>;
    } else if (!loading && !error && categories && categories?.length > 0) {
        content = <AdminCategoriesContainer categories={categories} />
    } else if (!loading && !error && !categories) {
        content = <h4 className="notFound">No categories found</h4>;

    } else if (!loading && error && !categories) {
        content = <h4 className="error">Something went wrong</h4>;
    }

    return (
        <div style={{minHeight: '80vh'}}>
            {content}
            {pageCount > 1 ? (<Pagination pageCount={pageCount} handleChangePage={handleChangePage}/>) : null}
        </div>
    );
};

export default AdminCategories;