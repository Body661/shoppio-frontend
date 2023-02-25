import React from 'react'
import {Row} from 'react-bootstrap'
import AdminAllOrdersItem from './AdminAllOrdersItem'
import UserGetAllOrdersHook from "../../hook/user/userGetAllOrdersHook";
import Pagination from "../Uitily/Pagination";

const AdminAllOrders = () => {
    const [,, paginate, orderData, onPress] = UserGetAllOrdersHook()

    return (
        <div>
            <div className='admin-content-text'>Manage All orders</div>
            <Row className='justify-content-start'>

                {
                    orderData?.length >= 1 ? (orderData?.map((orderItem, index) => {
                        return <AdminAllOrdersItem key={index} orderItem={orderItem}/>
                    })) : <h6>No orders yet</h6>
                }

                {
                    paginate.pages >= 2 ? (
                        <Pagination onPress={onPress} pageCount={paginate.pages ? paginate.pages : 0}/>) : null
                }
            </Row>
        </div>
    )
}

export default AdminAllOrders
