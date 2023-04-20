import CategoryContainer from '../../Components/Category/CategoryContainer'
import Pagination from '../../Components/Utility/Pagination'
import {useAllCategories} from "../../hook/category/useAllCategories";

const CategoriesPage = () => {
    const {categories, loading, pageCount, handleChangePage, error} = useAllCategories()

    return (
        <div style={{minHeight: "80vh"}}>
            <CategoryContainer categories={categories} loading={loading} error={error} isAll={true}/>
            {pageCount > 1 ? (<Pagination pageCount={pageCount} handleChangePage={handleChangePage}/>) : null}
        </div>
    )
}

export default CategoriesPage
