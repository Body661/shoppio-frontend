import React from 'react';
import {Container, Row, Spinner} from 'react-bootstrap';
import OrderItem from './OrderItem';
import useUserGetAllOrders from '../../../hook/user/useUserGetAllOrders';
import Pagination from '../../Utility/Pagination';

const UserOrders = () => {
    const {
        userName,
        results,
        paginate,
        orders,
        handlePageChange,
        loading,
        error,
    } = useUserGetAllOrders();

    const renderOrderItems = () => {
        if (loading) return <Spinner animation="border" variant="primary" />;
        if (error) return <h4 className="error">Something went wrong</h4>;
        if (orders?.length >= 1) {
            return orders.map((orderItem, index) => (
                <OrderItem key={index} orderItem={orderItem} />
            ));
        }
        return <h6>No orders yet</h6>;
    };

    return (
        <Container>
            <div className="admin-content-text pb-4">Welcome {userName}</div>
            <div className="admin-content-text pb-4">{results} Orders</div>
            <Row className="justify-content-between flex-column">
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