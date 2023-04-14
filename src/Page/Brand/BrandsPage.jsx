import React from 'react'
import BrandsContainer from '../../Components/Brand/BrandsContainer'
import Pagination from '../../Components/Utility/Pagination'
import {useAllBrands} from "../../hook/brand/useAllBrands";

const AllBrand = () => {
    const {brands, loading, error, pageCount, getPage} = useAllBrands();

    return (
        <div style={{minHeight: "80vh"}}>
            <BrandsContainer brands={brands} loading={loading} error={error} isAll={true}/>
            {pageCount > 1 ? (<Pagination pageCount={pageCount} onPress={getPage}/>) : null}
        </div>
    )
}

export default AllBrand
