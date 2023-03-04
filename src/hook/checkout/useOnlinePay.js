import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {createOrderOnline} from '../../redux/actions/checkOutActions';
import notify from '../useNotification';
import GetAllUserCartHook from '../cart/useUserCart';
import useUserCart from "../cart/useUserCart";

const useOnlinePay = (addressDetails) => {
    const dispatch = useDispatch();
    const {cartID} = useUserCart();

    const [loading, setLoading] = useState(false);

    //when user clicks
    const handelCreateOrderOnline = async () => {
        if (cartID?.trim() === '') {
            notify('Please add products to cart', 'warn');
            return;
        }
        if (!addressDetails?._id) {
            notify('Please select an address', 'warn');
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

    //get response for create order card
    const order = useSelector(
        (state) => state.checkoutReducer.createOrderOnline
    );
    console.log(order);
    useEffect(() => {
        if (loading === false && order) {
            if (order && order?.data?.session && order?.status === 200) {
                window.open(order.data?.session?.url, '_self');
            } else if (order?.data?.errors) {
                notify(order?.data?.errors[0]?.msg, 'error');
            }
        }
    }, [loading, order]);

    return [handelCreateOrderOnline];
};

export default useOnlinePay;

