import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {changeOrderDelivery, changeOrderPay} from '../../redux/actions/orderActions';
import {toast} from "react-toastify";

const useChangeOrderStatus = (id) => {
    const [loadingPay, setLoadingPay] = useState(true);
    const [loadingDelivery, setLoadingDelivery] = useState(true);
    const dispatch = useDispatch();
    const [pay, setPay] = useState(false);
    const [delivery, setDelivery] = useState(null);

    const formatDate = (dateString) => {
        const options = {year: 'numeric', month: 'numeric', day: 'numeric'};
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const onChangePaid = (e) => {
        const value = e.target.value;
        setPay(value);
    };

    const onChangeDeliver = (e) => {
        const value = e.target.value;
        setDelivery(value);
    };

    const changePayOrder = async () => {
        if (pay) {
            setLoadingPay(true);
            await dispatch(changeOrderPay(id));
            setLoadingPay(false);
        } else {
            toast("Please select pay status", {type: 'error'})
        }
    };

    const changeDeliverOrder = async () => {
        if (delivery) {
            setLoadingDelivery(true);
            await dispatch(changeOrderDelivery(id));
            setLoadingDelivery(false);
        } else {
            toast("Please select the delivery status", {type: 'error'})
        }
    };


    const changePayRes = useSelector((state) => state.orderReducer.changePay);

    useEffect(() => {
        if (!loadingPay && changePayRes) {
            if (changePayRes.status === 200) {
                toast("OrderCard pay status changed successfully", {type: 'success'})
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }  else {
                toast(changePayRes?.data?.errors ? changePayRes?.data?.errors[0]?.msg : "Error while updating pay status", {
                    type: 'error',
                    toastId: 'changePayError'
                })
            }
        }
    }, [loadingPay, changePayRes]);

    const deliveryStatus = useSelector((state) => state.orderReducer.deliveryStatus);

    useEffect(() => {
        if (!loadingDelivery && deliveryStatus) {
            if (deliveryStatus.status === 200) {
                toast("Delivery status changed successfully", {type: 'success'})
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }  else {
                toast(deliveryStatus?.data?.errors ? deliveryStatus?.data?.errors[0]?.msg : "Error while updating delivery status", {
                    type: 'error',
                    toastId: 'changeDeliveryAnother'
                })
            }
        }
    }, [loadingDelivery, deliveryStatus]);

    return {formatDate, onChangePaid, changePayOrder, onChangeDeliver, changeDeliverOrder};
};

export default useChangeOrderStatus;