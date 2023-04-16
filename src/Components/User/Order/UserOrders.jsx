import {Container, Row} from 'react-bootstrap';
import OrderCard from './OrderCard';
import useUserGetAllOrders from '../../../hook/user/useUserGetAllOrders';
import Pagination from '../../Utility/Pagination';
import {Backdrop, CircularProgress} from "@mui/material";
import {ShoppingCart} from "@mui/icons-material";

const UserOrders = () => {
    const {
        paginate,
        orders,
        handlePageChange,
        loading,
        error,
    } = useUserGetAllOrders();

    const renderOrderItems = () => {
        if ((orders && orders?.length >= 1) && !loading && !error) {
            return orders.map((order, index) => (
                <OrderCard key={index} order={order}/>
            ));
        } else if (!loading && !orders && error) {
            return <h4 className="error">Something went wrong</h4>
        } else if ((orders && orders?.length < 1) && !loading && !error) {
            return <h6>No orders found</h6>;
        }
    };

    return (
        <Container>
            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={loading}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>

            <Row>
                <div className="page-header mt-4">
                    <ShoppingCart style={{fontSize: "45px"}}/>
                    <span className="page-header-text"> Orders </span>
                </div>
            </Row>

            <Row className="justify-content-between flex-column mt-4">
                {renderOrderItems()}
            </Row>

            {paginate?.pages >= 2 && (
                <Pagination
                    onPress={handlePageChange}
                    pageCount={paginate?.pages ? paginate?.pages : 0}
                />
            )}
        </Container>
    );
};

export default UserOrders;