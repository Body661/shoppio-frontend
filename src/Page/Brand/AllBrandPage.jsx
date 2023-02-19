import React from 'react'
import BrandContainer from '../../Components/Brand/BrandContainer'
import Pagination from '../../Components/Uitily/Pagination'
import {AllBrandsHook} from "../../hook/brand/allBrandsHook";

const AllBrand = () => {
    const [brands, loading, pageCount, getPage] = AllBrandsHook();

    return (
        <div style={{minHeight: '670px'}}>
            <div style={{minHeight: '670px'}}>
                <BrandContainer data={brands?.data} loading={loading}/>
                <Pagination pageCount={pageCount} onPress={getPage}/>
            </div>
        </div>
    )
}

export default AllBrand
