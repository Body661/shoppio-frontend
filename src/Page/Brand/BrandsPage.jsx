import BrandsContainer from '../../Components/Brand/BrandsContainer'
import Pagination from '../../Components/Utility/Pagination'
import {useAllBrands} from "../../hook/brand/useAllBrands";

const AllBrand = () => {
    const {brands, loading, error, pageCount, handleChangePage} = useAllBrands();

    return (
        <div style={{minHeight: "80vh"}}>
            <BrandsContainer brands={brands} loading={loading} error={error} isAll={true}/>
            {pageCount > 1 ? (<Pagination pageCount={pageCount} handleChangePage={handleChangePage}/>) : null}
        </div>
    )
}

export default AllBrand
