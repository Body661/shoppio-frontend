import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {applyCartCoupon} from '../../../redux/actions/cartActions';
import {toast} from "react-toastify";

const UseApplyCoupon = () => {
    const dispatch = useDispatch();
    const [couponName, setCouponName] = useState('');
    const [loading, setLoading] = useState(true);

    const handleChangeCoupon = (coupon) => {
        setCouponName(coupon);
    };

    const handleSubmitCoupon = async () => {
        if (couponName.trim() === '') {
            toast('Please enter Coupon code', {type: 'error'})
            return;
        }

        setLoading(true);
        await dispatch(applyCartCoupon({coupon: couponName}));
        setLoading(false);
    };
    const res = useSelector((state) => state.cartReducer.applyCoupon);

    useEffect(() => {
        if (!loading) {
            if (res?.status === 200) {
                toast('Coupon applied successfully', {type: 'success'})
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            } else if (res?.status === 404) {
                toast('Coupon not found or expired', {type: 'error', toastId: 'couponNotFound'})
            } else {
                toast(res?.data?.errors ? res?.data?.errors[0].msg : 'Error while applying Coupon to Cart', {
                    type: 'error',
                    toastId: 'applyCouponError'
                })
            }
        }
    }, [loading, res]);

    return {couponName, handleChangeCoupon, handleSubmitCoupon, loading};
};

export default UseApplyCoupon;