import {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import {
    clearAllCartItem,
    deleteCartItem,
    updateCartItem,
} from '../../../redux/actions/cartActions';
import {toast} from "react-toastify";

const useDeleteCart = (item) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [itemCount, setItemCount] = useState(item?.quantity);

    const handleClearCart = async () => {
        setLoading(true);
        await dispatch(clearAllCartItem());
        setLoading(false);
    };

    const handleChangeCount = (e) => {
        setItemCount(Number(e.target.value));
    };

    useEffect(() => {
        if (item) {
            setItemCount(item?.quantity);
        }
    }, [item]);

    const clearCartResponse = useSelector((state) => state.cartReducer.clearCart);

    useEffect(() => {
        if (!loading) {
            if (clearCartResponse?.status === 204) {
                toast('Cart deleted successfully', {type: 'success'})
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            } else if (clearCartResponse?.status !== 204) {
                toast('Error while deleting Cart', {type: 'error', toastId: 'deleteCartError'})
            }
        }
    }, [loading, clearCartResponse]);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDeleteItem = async () => {
        await dispatch(deleteCartItem(item._id));
        setShow(false);
        window.location.reload();
    };

    const handleUpdateCart = async () => {
        await dispatch(
            updateCartItem(item._id, {
                quantity: itemCount,
            })
        );
        window.location.reload();
    };

    return {
        handleClearCart,
        show,
        handleClose,
        handleShow,
        handleDeleteItem,
        itemCount,
        handleChangeCount,
        handleUpdateCart,
    };
};

export default useDeleteCart;
