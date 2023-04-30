import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {getOrderDetails} from '../../redux/actions/orderActions';

const useGetOrderDetails = (id) => {
    const [loading, setLoading] = useState(true);
    const [orderData, setOrderData] = useState(null);
    const dispatch = useDispatch()
    const get = async () => {
        setLoading(true)
        await dispatch(getOrderDetails(id))
        setLoading(false)
    }

    useEffect(() => {
        get()
    }, [id, dispatch])

    const order = useSelector(state => state.orderReducer.orderDetails)

    useEffect(() => {
        if (loading === false) {
            if (order?.data?.data) setOrderData(order?.data?.data)
        }
    }, [loading, order])


    return {orderData, loading}

}

export default useGetOrderDetails