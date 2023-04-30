import {Col, Container, Row} from 'react-bootstrap'
import Pagination from '../../Components/Utility/Pagination'
import SortResults from '../../Components/Utility/sortResults'
import SideFilter from '../../Components/Utility/SideFilter'
import useSearch from "../../hook/products/useSearch";
import ProductsContainer from "../../Components/Products/ProductsContainer";
import {Backdrop, CircularProgress} from "@mui/material";

const ProductsPage = () => {

    const {items, pagination, handleChangePage, error, loading} = useSearch();

    return (
        <div style={{minHeight: "80vh"}}>
            <Container>
                <Backdrop
                    sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                    open={loading}
                >
                    <CircularProgress color="inherit"/>
                </Backdrop>

                <SortResults title={` ${items?.length || 0} Search result`}/>
                <Row className='d-flex flex-row align-items-start products-page-space-between'>
                    <Col xs="1" sm="1" md="1">
                        <SideFilter/>
                    </Col>
                    <Col sm="11" xs="10" md="8" lg={9}>
                        <ProductsContainer products={items} loading={loading} error={error} xSmall={12} small={8}
                                           medium={6} large={4}/>
                    </Col>
                </Row>
                {pagination > 1 && <Pagination pageCount={pagination} handleChangePage={handleChangePage}/>}
            </Container>
        </div>
    )
}

export default ProductsPage
