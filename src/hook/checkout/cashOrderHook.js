import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createOrderCash } from '../../redux/actions/checkOutActions';
import { getOneUserAddress } from '../../redux/actions/userAddressActions';
import notify from '../useNotification';
import GetAllUserCartHook from './../cart/getUserCartHook';

const CashOrderHook = () => {
    const [loading, setLoading] = useState(true);
    const [loadingCreate, setLoadingCreate] = useState(true);
    const [addressDetails, setAddressDetails] = useState([]);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [, , , , , cartID] = GetAllUserCartHook()

    const handelChooseAddress = (e) => {
        if (e.target.value?.trim()) get(e.target.value);
    }

    const get = async (id) => {
        setLoading(true)
        await dispatch(getOneUserAddress(id))
        setLoading(false)
    }

    const resAddress = useSelector(state => state.userAddressesReducer.oneAddress)
    useEffect(() => {
        if (loading === false) {
            if (resAddress && resAddress?.data) {
                setAddressDetails(resAddress?.data)
            }
        }
    }, [loading])

    //when user click
    const handelCreateOrderCash = async () => {
        if (cartID?.trim() === '') {
            notify("Please add products to cart", "warn")
            return
        }
        if (addressDetails?.length <= 0) {
            notify("Please select an address", "warn")
            return
        }
        setLoadingCreate(true)
        await dispatch(createOrderCash(cartID, {
            shippingAddress: {
                details: addressDetails?.street,
                phone: addressDetails?.phone,
                city: addressDetails?.city,
                postalCode: addressDetails?.postalCode
            }
        }))
        setLoadingCreate(false)
    }

    const order = useSelector(state => state.checkoutReducer.createOrderCash)

    useEffect(() => {
        if (loadingCreate === false) {
            if (order && order.status === 201) {
                notify("Order added successfully", "success")
                setTimeout(() => {
                    navigate('/user/allOrders')
                }, 1500);
            }else if (order?.data?.errors) {
                notify(order?.data?.errors[0].msg, "error")
            } else {
                notify("Error while adding order, please try again", "error")
            }
        }
    }, [loadingCreate])


    return [handelChooseAddress, addressDetails, handelCreateOrderCash]

}

export default CashOrderHook