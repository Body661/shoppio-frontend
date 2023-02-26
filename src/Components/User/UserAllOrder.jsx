import React from 'react'
import {Row} from 'react-bootstrap'
import UserAllOrderItem from './UserAllOrderItem'
import UserGetAllOrdersHook from "../../hook/user/userGetAllOrdersHook";
import Pagination from '../../Components/Uitily/Pagination';

const UserAllOrder = () => {
    const [userName, results, paginate, orderData, onPress] = UserGetAllOrdersHook()

    return (
        <div>
            <div className="admin-content-text pb-4">Welcome {userName}</div>
            <div className="admin-content-text pb-4">{results} Orders</div>
        <Row className='justify-content-between flex-column'>
            {
                orderData?.length >= 1 ? (orderData?.map((orderItem, index) => {
                    return <UserAllOrderItem key={index} orderItem={orderItem} />
                })) : <h6>No orders yet </h6>
            }

            {
                paginate?.pages >= 2 ? (<Pagination onPress={onPress} pageCount={paginate?.pages ? paginate?.pages : 0} />) : null
            }
        </Row>
        </div>
    )
}

export default UserAllOrder
