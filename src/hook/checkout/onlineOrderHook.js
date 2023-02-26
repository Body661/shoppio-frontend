import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {createOrderOnline} from '../../redux/actions/checkOutActions';
import notify from '../useNotification';
import GetAllUserCartHook from '../cart/useUserCart';


const OrderPayOnlineHook = (addressDetails) => {

    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch()
    const [, , , , , cartID] = GetAllUserCartHook()

    //when user click
    const handelCreateOrderOnline = async () => {
        if (cartID?.trim() === '') {
            notify("Please add products to cart", "warn")
            return
        }
        if (addressDetails?.length <= 0) {
            notify("Please select an address", "warn")
            return
        }
        setLoading(true)
        await dispatch(createOrderOnline(cartID, {
            shippingAddress: {
                details: addressDetails?.street,
                phone: addressDetails?.phone,
                city: addressDetails?.city,
                postalCode: addressDetails?.postalCode
            }
        }))
        setLoading(false)
    }


    //get response for create order card
    const order = useSelector(state => state.checkoutReducer.createOrderOnline)
    useEffect(() => {
        if (loading === false) {
            if (order && order?.data?.session) {
                window.open(order.data?.session?.url, "_self")
            } else if (order?.data?.errors) {
                notify(order?.data?.errors[0]?.msg, "error")
            } else {
                notify("Error while adding order, please try again", "error")
            }
        }
    }, [loading])


    return [handelCreateOrderOnline]
}

export default OrderPayOnlineHook