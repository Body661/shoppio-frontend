import React from 'react'
import CategoryContainer from '../../Components/Category/CategoryContainer'
import Pagination from '../../Components/Uitily/Pagination'
import {AllCategoriesHook} from "../../hook/category/allCategoriesHook";

const AllCategoryPage = () => {
    const [categories, loading, pageCount, getPage, error] = AllCategoriesHook()
    console.log(pageCount)

    return (
        <div style={{minHeight: '670px'}}>
            <CategoryContainer data={categories?.data} loading={loading} error={error}/>
            {pageCount > 1 ? (<Pagination pageCount={pageCount} onPress={getPage}/>) : null}
        </div>
    )
}

export default AllCategoryPage
