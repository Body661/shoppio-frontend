import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {getOneOrder} from '../../redux/actions/orderActions';

const useGetOrderDetails = (id) => {
    const [loading, setLoading] = useState(true);
    const [orderData, setOrderData] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const dispatch = useDispatch()


    const get = async () => {
        setLoading(true)
        await dispatch(getOneOrder(id))
        setLoading(false)
    }

    useEffect(() => {
        get()
    }, [])

    const order = useSelector(state => state.orderReducer.getOneOrder)

    useEffect(() => {
        if (loading === false) {
            if (order?.data?.data)
                setOrderData(order?.data?.data)
            if (order?.data?.data?.cartItems)
                setCartItems(order?.data?.data?.cartItems)
        }
    }, [loading, order])


    return {orderData, cartItems}

}

export default useGetOrderDetails