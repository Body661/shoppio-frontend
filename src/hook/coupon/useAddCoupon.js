import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addCoupon, getAllCoupon} from '../../redux/actions/couponActions';
import notify from '../useNotification';

const useAddCoupon = () => {
    const dispatch = useDispatch();
    const [couponName, setCouponName] = useState('');
    const [couponDate, setCouponDate] = useState('');
    const [couponValue, setCouponValue] = useState('');
    const [loading, setLoading] = useState(true);

    const onChangeName = (event) => {
        setCouponName(event.target.value);
    };

    const onChangeDate = (event) => {
        setCouponDate(event.target.value);
    };

    const onChangeValue = (event) => {
        setCouponValue(event.target.value);
    };

    const onSubmit = async () => {
        if (couponName.trim() === '' || couponDate.trim() === '' || couponValue <= 0) {
            notify('Please fill in all information!', 'warn');
            return;
        }

        setLoading(true);
        await dispatch(addCoupon({
            name: couponName,
            expire: couponDate,
            discount: couponValue,
        }));
        setLoading(false);
    };

    const addCouponRes = useSelector(state => state.couponReducer.addCoupon)

    useEffect(() => {
        if (loading === false && addCouponRes) {
            if (addCouponRes && addCouponRes.status === 201) {
                notify("Coupon added successfully", "success")
                setTimeout(() => {
                    window.location.reload()
                }, 1000)
            } else if (addCouponRes?.status === 401) {
                notify("You are not logged in!", "error")
            } else if (addCouponRes?.status === 403) {
                notify("You are not allowed to do this operation", "error");
            } else if (addCouponRes?.data?.errors) {
                notify(addCouponRes?.data?.errors[0]?.msg, "error");
            } else {
                notify("Error while adding coupon", "error")
            }
        }

    }, [loading, addCouponRes])

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(getAllCoupon());
        };

        fetchData();
    }, [dispatch]);

    const allCoupons = useSelector(state => state.couponReducer.allCoupons)

    let coupons = [];
    if (allCoupons?.data?.data) coupons = allCoupons?.data?.data

    return {
        couponName,
        couponDate,
        couponValue,
        onChangeName,
        onChangeDate,
        onChangeValue,
        onSubmit,
        coupons,
        loading,
    };
};

export default useAddCoupon;