import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {changeOrderDelivery, changeOrderPay} from '../../redux/actions/orderActions';
import notify from '../useNotification';

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
            notify('Please select pay status');
        }
    };

    const changeDeliverOrder = async () => {
        if (delivery) {
            setLoadingDelivery(true);
            await dispatch(changeOrderDelivery(id));
            setLoadingDelivery(false);
        } else {
            notify('Please select the delivery status', 'warn');
        }
    };


    const changePayRes = useSelector((state) => state.orderReducer.changePay);

    useEffect(() => {
        if (!loadingPay && changePayRes) {
            if (changePayRes.status === 200) {
                notify('Order pay status changed successfully', 'success');
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            } else if (changePayRes?.data?.errors) {
                notify(changePayRes?.data?.errors[0].msg, 'error');
            } else if (changePayRes.status === 400) {
                notify('Bad request, please check if all information are correct', 'error');
            } else {
                notify('Error while updating pay status', 'warn');
            }
        }
    }, [loadingPay, changePayRes]);

    const deliveryStatus = useSelector((state) => state.orderReducer.deliveryStatus);

    useEffect(() => {
        if (!loadingDelivery && deliveryStatus) {
            if (deliveryStatus.status === 200) {
                notify('Delivery status changed successfully', 'success');
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            } else if (deliveryStatus?.data?.errors) {
                notify(deliveryStatus?.data?.errors[0].msg, 'error');
            } else if (deliveryStatus.status === 400) {
                notify('Bad request, please check if all information are correct', 'error');
            } else {
                notify('Error while updating delivery status', 'warn');
            }
        }
    }, [loadingDelivery, deliveryStatus]);

    return {formatDate, onChangePaid, changePayOrder, onChangeDeliver, changeDeliverOrder};
};

export default useChangeOrderStatus;