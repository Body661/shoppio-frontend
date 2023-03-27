import {Row, Spinner} from 'react-bootstrap'
import AdminOrder from './AdminOrder'
import UserGetAllOrdersHook from "../../../hook/user/useUserGetAllOrders";
import Pagination from "../../Utility/Pagination";

const AdminOrders = () => {
    const {paginate, orders, onPress, loading, error} = UserGetAllOrdersHook()

    const renderOrderItems = () => {
        if (!loading && !error && orders?.length >= 1) return (orders?.map((orderItem, index) => {
            return <AdminOrder key={index} orderItem={orderItem}/>
        }))

        if (loading && !error && orders?.length < 1) return <Spinner animation="border" variant="primary"/>

        if (!loading && error && orders?.length < 1) return <h4 className="error">Something went wrong</h4>

        return <h6>No orders yet</h6>;
    };

    return (
        <div>
            <div className='admin-content-text'>Manage All orders</div>
            <Row className='justify-content-start'>

                {renderOrderItems()}

                {
                    paginate.pages > 1 ? (
                        <Pagination onPress={onPress} pageCount={paginate.pages ? paginate.pages : 0}/>) : null
                }
            </Row>
        </div>
    )
}

export default AdminOrders
