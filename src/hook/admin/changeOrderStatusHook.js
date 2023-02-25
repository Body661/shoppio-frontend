import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {changeOrderDelivery, changeOrderPay} from '../../redux/actions/orderActions';
import notify from '../useNotification';

const ChangeOrderStatusHook = (id) => {
    const [loading, setLoading] = useState(true);
    const [loadingDelivery, setLoadingDelivery] = useState(true);
    const [pay, setPay] = useState(false);
    const [delivery, setDelivery] = useState(null);
    const dispatch = useDispatch()


    const changePayOrder = async () => {
        if (pay) {
            setLoading(true)
            await dispatch(changeOrderPay(id))
            setLoading(false)
        } else if (!pay) {
            notify('Please select pay status')
        }
    }

    const changeDeliverOrder = async () => {
        if (delivery) {
            setLoadingDelivery(true)
            await dispatch(changeOrderDelivery(id))
            setLoadingDelivery(false)
        } else if (!delivery) {
            notify('Please select the delivery status', 'warn')
        }
    }

    const order = useSelector(state => state.orderReducer.changePay)

    useEffect(() => {
        if (loading === false) {
            if (order && order.status === 200) {
                notify("Order pay status changed successfully", "success")
                setTimeout(() => {
                    window.location.reload()
                }, 1000);
            } else if (order?.data?.errors) {
                notify(order?.data?.errors[0].msg, "error")
            } else if (order.status === 400) {
                notify("Bad request, please check if all information are correct", "error")
            } else {
                notify("Error while updating pay status", "warn")
            }
        }
    }, [loading])


    //get order deliver change
    const deliveryStatus = useSelector(state => state.orderReducer.deliveryStatus)

    useEffect(() => {
        if (loadingDelivery === false) {
            if (deliveryStatus && deliveryStatus.status === 200) {
                notify("Delivery status changed successfully", "success")
                setTimeout(() => {
                    window.location.reload()
                }, 1000);
            } else if (deliveryStatus?.data?.errors) {
                notify(deliveryStatus?.data?.errors[0].msg, "error")
            } else if (deliveryStatus.status === 400) {
                notify("Bad request, please check if all information are correct", "error")
            } else {
                notify("Error while updating delivery status", "warn")
            }
        }
    }, [deliveryStatus])


    const formatDate = (dateString) => {
        const options = {year: "numeric", month: "numeric", day: "numeric"}
        return new Date(dateString).toLocaleDateString(undefined, options)
    }

    const onChangePaid = (e) => {
        setPay(e.target.value)
    }

    const onChangeDeliver = (e) => {
        setDelivery(e.target.value)
    }


    return [formatDate, onChangePaid, changePayOrder, onChangeDeliver, changeDeliverOrder]
}

export default ChangeOrderStatusHook