import React from 'react';
import { Row, Spinner } from 'react-bootstrap';
import UserAllOrderItem from './UserAllOrderItem';
import useUserGetAllOrders from '../../hook/user/useUserGetAllOrders';
import Pagination from '../../Components/Utility/Pagination';

const UserAllOrders = () => {
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
                <UserAllOrderItem key={index} orderItem={orderItem} />
            ));
        }
        return <h6>No orders yet</h6>;
    };

    return (
        <div>
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
        </div>
    );
};

export default UserAllOrders;