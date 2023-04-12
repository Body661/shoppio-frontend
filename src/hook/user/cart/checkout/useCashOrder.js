import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {createOrderCash} from '../../../../redux/actions/checkOutActions';
import {getOneUserAddress} from '../../../../redux/actions/userAddressActions';
import useUserCart from '../useUserCart';
import {toast} from "react-toastify";

const useCashOrder = () => {
    const [loading, setLoading] = useState(true);
    const [loadingCreate, setLoadingCreate] = useState(true);
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
    }, [loading, resAddress]);

    const handleCreateOrderCash = async () => {
        if (!cartID.trim()) {
            toast('Please add products to Cart', {type: 'error'});
            return;
        }
        if (!addressDetails?._id) {
            toast('Please select shipping address', {type: 'error'});
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
        if (!loadingCreate && order) {
            if (order?.status === 201) {
                toast('Order added successfully', {type: 'success'});
                setTimeout(() => {
                    navigate('/user/orders');
                }, 1500);
            } else {
                toast(order?.data?.errors ? order?.data?.errors[0]?.msg : 'Error while adding order, please try again', {
                    type: 'error',
                    toastId: "cashOrderError"
                });
            }
        }
    }, [loadingCreate, order]);

    return {
        handleChooseAddress,
        addressDetails,
        handleCreateOrderCash,
        loading,
        loadingCreate,
    };
};

export default useCashOrder;
