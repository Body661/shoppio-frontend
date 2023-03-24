import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {createOrderOnline} from '../../redux/actions/checkOutActions';
import useUserCart from "../cart/useUserCart";
import {toast} from "react-toastify";

const useOnlinePay = (addressDetails) => {
    const dispatch = useDispatch();
    const {cartID} = useUserCart();

    const [loading, setLoading] = useState(true);

    //when user clicks
    const handelCreateOrderOnline = async () => {
        if (!cartID.trim()) {
            toast('Please add products to cart', {type: 'error'});
            return;
        }
        if (!addressDetails?._id) {
            toast('Please select shipping address', {type: 'error'});
            return;
        }
        setLoading(true);
        await dispatch(
            createOrderOnline(cartID, {
                shippingAddress: {
                    details: addressDetails?.street,
                    phone: addressDetails?.phone,
                    city: addressDetails?.city,
                    postalCode: addressDetails?.postalCode,
                },
            })
        );
        setLoading(false);
    };

    const order = useSelector((state) => state.checkoutReducer.createOrderOnline);

    useEffect(() => {
        if (!loading && order) {
            if (order && order?.data?.session && order?.status === 200) {
                window.open(order.data?.session?.url, '_self');
            } else {
                toast(order?.data?.errors ? order?.data?.errors[0]?.msg : 'Error while adding order, please try again', {
                    type: 'error',
                    toastId: "onlineOrderError"
                });
            }
        }
    }, [loading, order]);

    return {handelCreateOrderOnline};
};

export default useOnlinePay;

