import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getAllOrders} from '../../redux/actions/orderActions';

const useUserGetAllOrders = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [paginate, setPaginate] = useState({});
    const [ordersData, setOrdersData] = useState([]);
    const dispatch = useDispatch();

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
        await dispatch(getAllOrders(page, 50));
        setLoading(false);
    };

    const orders = useSelector((state) => state.orderReducer.getAllOrders);

    if (orders?.status !== 200 && !loading) setError(true);

    useEffect(() => {
        if (!loading) {
            if (orders?.data?.paginationRes) setPaginate(orders.data.paginationRes);
            if (orders?.data?.data) setOrdersData(orders.data.data);
        }
    }, [loading, orders]);

    return {
        paginate,
        orders: ordersData,
        handlePageChange,
        loading,
        error,
    };
};

export default useUserGetAllOrders;
