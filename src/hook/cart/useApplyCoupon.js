import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import notify from '../useNotification';
import {applyCartCoupon} from '../../redux/actions/cartActions';

const UseApplyCoupon = () => {
    const dispatch = useDispatch();
    const [couponName, setCouponName] = useState('');
    const [loading, setLoading] = useState(false);

    const onChangeCoupon = (coupon) => {
        setCouponName(coupon);
    };

    const handleSubmitCoupon = async () => {
        if (couponName.trim() === '') {
            notify('Please enter coupon name', 'warn');
            return;
        }

        setLoading(true);
        await dispatch(applyCartCoupon({coupon: couponName}));
        setLoading(false);
    };
    const res = useSelector((state) => state.cartReducer.applyCoupon);

    useEffect(() => {
        if (!loading) {

            if (res && res.status === 200) {
                notify('Coupon applied successfully', 'success');
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            } else if (res) {
                if (res.status === 401) {
                    notify('you are not logged in!', 'error');
                } else if (res.status === 403) {
                    notify('You are not allowed to do this operation', 'error');
                } else if (res.status === 404) {
                    notify('Coupon not found or expired', 'error');
                } else if (res?.data?.errors) {
                    notify(res?.data?.errors[0].msg, 'error');
                } else {
                    notify('Error while applying coupon to cart', 'error');
                }
            }
        }
    }, [loading]);

    return {couponName, onChangeCoupon, handleSubmitCoupon, loading};
};

export default UseApplyCoupon;