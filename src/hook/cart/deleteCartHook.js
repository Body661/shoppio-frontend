import {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import 'react-toastify/dist/ReactToastify.css';
import notify from '../useNotification'
import {clearAllCartItem, deleteCartItem, updateCartItem} from '../../redux/actions/cartActions';

const DeleteCartHook = (item) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true)
    const [itemCount, setItemCount] = useState(0)

    const handelDeleteCart = async () => {
        setLoading(true)
        await dispatch(clearAllCartItem())
        setLoading(false)
    }

    const onChangeCount = (e) => {
        setItemCount(e.target.value)
    }

    useEffect(() => {
        if (item)
            setItemCount(item?.quantity)
    }, [])

    const res = useSelector(state => state.cartReducer.clearCart)

    useEffect(() => {
        if (loading === false) {
            if (res) {
                notify("Cart delete successfully", "success")
                setTimeout(() => {
                    window.location.reload()
                }, 1000);
            }
        }
    }, [loading])


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDeleteItem = async () => {
        await dispatch(deleteCartItem(item._id))
        setShow(false);
        window.location.reload();
    }

    const handleUpdateCart = async () => {
        await dispatch(updateCartItem(item._id, {
            quantity: itemCount
        }))

        window.location.reload();
    }

    return [handelDeleteCart, show, handleClose, handleShow, handleDeleteItem, itemCount, onChangeCount, handleUpdateCart]

}

export default DeleteCartHook