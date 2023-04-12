import Pagination from "../../Utility/Pagination";
import {Spinner} from "react-bootstrap";
import React from "react";
import AdminBrandsContainer from "./AdminBrandsContainer";
import {useAllBrands} from "../../../hook/brand/useAllBrands";

const AdminBrands = () => {

    const {brands, loading, error, pageCount, getPage} = useAllBrands()

    let content = null;

    if (loading && !brands && !error) {
        content = <Spinner animation="border" variant="primary"/>;
    } else if (!loading && !error && brands && brands?.length > 0) {
        content = <AdminBrandsContainer brands={brands} />
    } else if (!loading && !error && !brands) {
        content = <h4 className="notFound">No brands found</h4>;

    } else if (!loading && error && !brands) {
        content = <h4 className="error">Something went wrong</h4>;
    }

    return (
        <div style={{minHeight: '670px'}}>
            {content}
            {pageCount > 1 ? (<Pagination pageCount={pageCount} onPress={getPage}/>) : null}
        </div>
    );
};

export default AdminBrands;