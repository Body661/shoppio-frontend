import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {editCoupon, getOneCoupon} from '../../redux/actions/couponActions';
import notify from '../useNotification';

const useEditCoupon = (id) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [loadingUpdate, setLoadingUpdate] = useState(true);
    const [couponName, setCouponName] = useState('');
    const [couponDate, setCouponDate] = useState('');
    const [couponValue, setCouponValue] = useState('');


    const formatDate = (dateString) => {
        const options = {year: 'numeric', month: 'numeric', day: 'numeric'};
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    useEffect(() => {
        const getCoupon = async () => {
            setLoading(true);
            await dispatch(getOneCoupon(id));
            setLoading(false);
        };
        getCoupon();
    }, []);

    const oneCoupon = useSelector((state) => state.couponReducer.oneCoupon);

    useEffect(() => {
        if (loading === false && oneCoupon?.data?.data) {
            setCouponName(oneCoupon?.data?.data?.name);
            setCouponDate(formatDate(oneCoupon?.data?.data?.expire));
            setCouponValue(oneCoupon?.data?.data?.discount);
        }
    }, [loading, oneCoupon]);

    const onChangeName = (event) => {
        event.persist();
        setCouponName(event.target.value);
    };

    const onChangeDate = (event) => {
        event.persist();
        setCouponDate(event.target.value);
    };

    const onChangeValue = (event) => {
        event.persist();
        setCouponValue(event.target.value);
    };

    const onSubmit = async () => {
        if (couponName.trim() === '' || couponDate.trim() === '' || couponValue <= 0) {
            notify('Please fill in all information!', 'warn');
            return;
        }
        setLoadingUpdate(true);
        await dispatch(editCoupon(id, {name: couponName, expire: couponDate.split('-').reverse().join('-'), discount: couponValue}));
        setLoadingUpdate(false);
    };

    const res = useSelector(state => state.couponReducer.editCoupon)
    useEffect(() => {
        if (!loadingUpdate && res) {
            if (res?.status === 200) {
                notify('Coupon updated successfully', 'success');
                setTimeout(() => {
                    navigate('/admin/addCoupon');
                }, 1000);
            } else if (res?.status === 401) {
                notify('You are not logged in!', 'error');
            } else if (res?.status === 403) {
                notify('You are not allowed to do this operation', 'error');
            } else if (res?.data?.errors) {
                notify(res?.data?.errors[0]?.msg, 'error');
            } else {
                notify('Error while updating coupon', 'error');
            }
        }

    }, [loadingUpdate, res])

    return {couponName, couponDate, couponValue, onChangeName, onChangeDate, onChangeValue, onSubmit, loadingUpdate};
};

export default useEditCoupon;
