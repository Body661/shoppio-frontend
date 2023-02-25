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
            if (orders?.results) setResult(orders?.amount)
            if (orders?.paginationRes) setPaginate(orders?.paginationRes)
            if (orders?.data) setOrderData(orders?.data)
        }
    }, [loading])


    return [userName, results, paginate, orderData, onPress]
}

export default UserGetAllOrdersHook