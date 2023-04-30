import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {editCoupon, getOneCoupon} from '../../../redux/actions/couponActions';
import {toast} from "react-toastify";

const useEditCoupon = (id) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true);
    const [loadingUpdate, setLoadingUpdate] = useState(true);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [couponName, setCouponName] = useState('');
    const [couponDate, setCouponDate] = useState('');
    const [discount, setDiscount] = useState('');


    const formatDate = (dateString) => {
        const options = {year: 'numeric', month: '2-digit', day: 'numeric'};
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    useEffect(() => {
        const getCoupon = async () => {
            setLoading(true);
            await dispatch(getOneCoupon(id));
            setLoading(false);
        };
        getCoupon();

    }, [dispatch]);

    const oneCoupon = useSelector((state) => state.couponReducer.oneCoupon);

    useEffect(() => {
        if (loading === false && oneCoupon?.data?.data) {
            setCouponName(oneCoupon?.data?.data?.name);
            setCouponDate(formatDate(oneCoupon?.data?.data?.expire));
            setDiscount(oneCoupon?.data?.data?.discount);
        }
    }, [loading, oneCoupon]);

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

        setLoadingUpdate(true);
        setIsSubmitted(true)
        await dispatch(editCoupon(id, {
            name: couponName,
            expire: couponDate.split('-').reverse().join('-'),
            discount
        }));
        setLoadingUpdate(false);
        setIsSubmitted(false)
    };

    const res = useSelector(state => state.couponReducer.editCoupon)
    useEffect(() => {
        if (!loadingUpdate && res) {
            if (res?.status === 200) {
                toast('Coupon updated successfully', {type: 'success'});
                setTimeout(() => {
                    navigate('/admin/coupons');
                }, 1000);
            } else {
                toast(res?.data?.errors ? res?.data?.errors[0]?.msg : 'Error while updating Coupon', {
                    type: 'error',
                    toastId: 'updateCouponError'
                });
            }
        }

    }, [loadingUpdate, res, navigate])

    return {couponName, couponDate, discount, handleChangeName, handleChangeExpireDate, handleChangeDiscount, handleSubmit, loadingUpdate, isSubmitted};
};

export default useEditCoupon;
