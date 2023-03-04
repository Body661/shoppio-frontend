import React from 'react'
import BrandContainer from '../../Components/Brand/BrandContainer'
import Pagination from '../../Components/Uitily/Pagination'
import {useAllBrands} from "../../hook/brand/useAllBrands";

const AllBrand = () => {
    const {brands, loading, error, pageCount, getPage} = useAllBrands();

    return (
        <div style={{minHeight: '670px'}}>
            <BrandContainer brands={brands} loading={loading} error={error}/>
            {pageCount > 1 ? (<Pagination pageCount={pageCount} onPress={getPage}/>) : null}
        </div>
    )
}

export default AllBrand
