import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {getAllOrders} from '../../redux/actions/orderActions';

const UserGetAllOrdersHook = () => {
    const [loading, setLoading] = useState(true);
    const [results, setResult] = useState(0);
    const [paginate, setPaginate] = useState({});
    const [orderData, setOrderData] = useState([]);
    const dispatch = useDispatch()

    const user = JSON.parse(localStorage.getItem('user'))
    let userName = ''

    if (user != null) userName = user?.name

    const get = async () => {
        setLoading(true)
        await dispatch(getAllOrders('', 8))
        setLoading(false)
    }

    useEffect(() => {
        get()
    }, [])

    const onPress = async (page) => {
        setLoading(true)
        await dispatch(getAllOrders(page, 5))
        setLoading(false)
    }

    const orders = useSelector(state => state.orderReducer.getAllOrders)
    useEffect(() => {
        if (loading === false) {
            if (orders?.data?.amount) setResult(orders?.data?.amount)
            if (orders?.data?.paginationRes) setPaginate(orders?.data?.paginationRes)
            if (orders?.data?.data) setOrderData(orders?.data?.data)
        }
    }, [loading])


    return [userName, results, paginate, orderData, onPress]
}

export default UserGetAllOrdersHook