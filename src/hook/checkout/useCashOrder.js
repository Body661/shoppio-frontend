import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {createOrderCash} from '../../redux/actions/checkOutActions';
import {getOneUserAddress} from '../../redux/actions/userAddressActions';
import notify from '../useNotification';
import useUserCart from '../cart/useUserCart';

const useCashOrder = () => {
    const [loading, setLoading] = useState(true);
    const [loadingCreate, setLoadingCreate] = useState(false);
    const [addressDetails, setAddressDetails] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {cartID} = useUserCart();

    const handleChooseAddress = async (e) => {
        const id = e.target.value.trim();
        setLoading(true);
        await dispatch(getOneUserAddress(id));
        setLoading(false);
    };

    const resAddress = useSelector(state => state.userAddressesReducer.oneAddress);

    useEffect(() => {
        if (loading === false) {
            if (resAddress && resAddress?.data?.data) {
                setAddressDetails(resAddress?.data?.data);
            }
        }
    }, [loading]);

    const handleCreateOrderCash = async () => {
        if (!cartID.trim()) {
            notify('Please add products to cart', 'warn');
            return;
        }
        if (!addressDetails?._id) {
            notify('Please select an address', 'warn');
            return;
        }
        setLoadingCreate(true);
        await dispatch(
            createOrderCash(cartID, {
                shippingAddress: {
                    details: addressDetails.street,
                    phone: addressDetails.phone,
                    city: addressDetails.city,
                    postalCode: addressDetails.postalCode,
                },
            })
        );
        setLoadingCreate(false);
    };

    const order = useSelector((state) => state.checkoutReducer.createOrderCash);

    useEffect(() => {
        if (loadingCreate === false && order) {
            if (order?.status === 201) {
                notify('Order added successfully', 'success');
                setTimeout(() => {
                    navigate('/user/allOrders');
                }, 1500);
            } else if (order?.data?.errors) {
                notify(order?.data?.errors[0].msg, 'error');
            } else {
                notify('Error while adding order, please try again', 'error');
            }
        }
    }, [loadingCreate, order]);

    return [
        handleChooseAddress,
        addressDetails,
        handleCreateOrderCash,
        loading,
        loadingCreate,
    ];
};

export default useCashOrder;
