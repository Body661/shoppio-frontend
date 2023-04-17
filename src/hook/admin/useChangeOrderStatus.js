import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {changeOrderDelivery, changeOrderPay} from '../../redux/actions/orderActions';
import {toast} from "react-toastify";

const useChangeOrderStatus = (id) => {
    const [loadingPay, setLoadingPay] = useState(false);
    const [loadingDelivery, setLoadingDelivery] = useState(false);
    const dispatch = useDispatch();

    const handleChangePayStatus = async (status) => {
        if (status || status === false) {
            setLoadingPay(true);
            await dispatch(changeOrderPay(id, {
                isPaid: status
            }));
            setLoadingPay(false);
        } else {
            toast("Please select pay status", {type: 'error'})
        }
    };

    const handleChangeDeliveryStatus = async (status) => {
        if (status || status === false) {
            setLoadingDelivery(true);
            await dispatch(changeOrderDelivery(id, {
                isDelivered: status
            }));
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
            } else {
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
            } else {
                toast(deliveryStatus?.data?.errors ? deliveryStatus?.data?.errors[0]?.msg : "Error while updating delivery status", {
                    type: 'error',
                    toastId: 'changeDeliveryAnother'
                })
            }
        }
    }, [loadingDelivery, deliveryStatus]);

    return {handleChangePayStatus, handleChangeDeliveryStatus, loadingPay, loadingDelivery};
};

export default useChangeOrderStatus;