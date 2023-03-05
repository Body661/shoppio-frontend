import {Row, Spinner} from 'react-bootstrap';
import UserAllOrderItem from './UserAllOrderItem';
import UserGetAllOrdersHook from '../../hook/user/userGetAllOrdersHook';
import Pagination from '../../Components/Uitily/Pagination';
import React from "react";

const UserAllOrder = () => {
    const {userName, results, paginate, orders, onPress, loading, error} = UserGetAllOrdersHook();

    const renderOrderItems = () => {
        if (!loading && !error && orders?.length >= 1) return (orders?.map((orderItem, index) => {
            return <UserAllOrderItem key={index} orderItem={orderItem}/>
        }))

        if (loading && !error && orders?.length < 1) return <Spinner animation="border" variant="primary"/>

        if (!loading && error && orders?.length < 1) return <h4 className="error">Something went wrong</h4>

        return <h6>No orders yet</h6>;
    };

    return (
        <div>
            <div className="admin-content-text pb-4">Welcome {userName}</div>
            <div className="admin-content-text pb-4">{results} Orders</div>
            <Row className="justify-content-between flex-column">{renderOrderItems()}</Row>
            {paginate?.pages >= 2 && (
                <Pagination onPress={onPress} pageCount={paginate?.pages ? paginate?.pages : 0}/>
            )}
        </div>
    );
};

export default UserAllOrder;
