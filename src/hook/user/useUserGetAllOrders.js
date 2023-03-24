import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getAllOrders} from '../../redux/actions/orderActions';

const useUserGetAllOrders = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [results, setResults] = useState(0);
    const [paginate, setPaginate] = useState({});
    const [ordersData, setOrdersData] = useState([]);
    const dispatch = useDispatch();

    const user = JSON.parse(localStorage.getItem('user'));
    const userName = user ? user.name : '';

    const fetchData = async () => {
        setLoading(true);
        await dispatch(getAllOrders('', 50));
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handlePageChange = async (page) => {
        setLoading(true);
        await dispatch(getAllOrders(page, 5));
        setLoading(false);
    };

    const orders = useSelector((state) => state.orderReducer.getAllOrders);

    if (orders?.status !== 200 && !loading) setError(true);

    useEffect(() => {
        if (!loading) {
            if (orders?.data?.amount) setResults(orders.data.amount);
            if (orders?.data?.paginationRes) setPaginate(orders.data.paginationRes);
            if (orders?.data?.data) setOrdersData(orders.data.data);
        }
    }, [loading, orders]);

    console.log(orders)

    return {
        userName,
        results,
        paginate,
        orders: ordersData,
        handlePageChange,
        loading,
        error,
    };
};

export default useUserGetAllOrders;
