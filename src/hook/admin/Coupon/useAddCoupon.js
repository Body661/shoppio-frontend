import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addCoupon} from '../../../redux/actions/couponActions';
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

const useAddCoupon = () => {
    const dispatch = useDispatch();
    const [couponName, setCouponName] = useState('');
    const [couponDate, setCouponDate] = useState('');
    const [discount, setDiscount] = useState('');
    const [loading, setLoading] = useState(true);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const navigate = useNavigate()

    const handleChangeName = (event) => {
        setCouponName(event.target.value);
    };

    const handleChangeExpireDate = (event) => {
        setCouponDate(event.target.value);
    };

    const handleChangeDiscount = (event) => {
        setDiscount(event.target.value);
    };

    const handleSubmit = async () => {
        if (couponName.trim() === '') {
            toast('Coupon name is required', {type: 'error'});
            return;
        }

        if ( couponDate.trim() === '' ) {
            toast('Expiration date is required', {type: 'error'});
            return;
        }

        if (discount > 100 || discount <= 0) {
            toast('Discount value must be between 1 and 100!', {type: 'error'});
            return;
        }

        setIsSubmitted(true)
        await dispatch(addCoupon({
            name: couponName,
            expire: couponDate,
            discount,
        }));
        setIsSubmitted(false)
        setLoading(false);
    };

    const addCouponRes = useSelector(state => state.couponReducer.addCoupon)

    useEffect(() => {
        if (loading === false && addCouponRes) {
            if (addCouponRes && addCouponRes.status === 201) {
                toast("Coupon added successfully", {type: 'success'});
                setTimeout(() => {
                    navigate('/admin/coupons')
                }, 1000)
            } else {
                toast(addCouponRes?.data?.errors ? addCouponRes?.data?.errors[0]?.msg : 'Error while adding Coupon', {
                    type: 'error',
                    toastId: 'addCouponError'
                });
            }
        }

    }, [loading, addCouponRes, navigate])

    return {
        couponName,
        couponDate,
        discount,
        handleChangeName,
        handleChangeExpireDate,
        handleChangeDiscount,
        handleSubmit,
        loading,
        isSubmitted
    };
};

export default useAddCoupon;