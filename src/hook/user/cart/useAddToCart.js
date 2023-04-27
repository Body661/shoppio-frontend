import {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {addProductToCart} from '../../../redux/actions/cartActions';
import {toast} from "react-toastify";

const UseAddToCart = (product) => {
    const dispatch = useDispatch();
    const [indexColor, setIndexColor] = useState('');
    const [colorText, setColorText] = useState('');
    const [loading, setLoading] = useState(true);

    const colorClick = (index, color) => {
        setIndexColor(index);
        setColorText(color);
    };

    const addToCartHandle = async () => {
        if (product?.colors?.length >= 1 && colorText === '') {
            toast('Please select the color', {type: 'warning'})
            return;
        }
        setLoading(true);
        if (product?.colors?.length < 1) {
            await dispatch(addProductToCart({productId: product?._id}));
        } else {
            await dispatch(addProductToCart({productId: product?._id, color: colorText.trim()}));
        }
        setLoading(false);
    };

    const res = useSelector((state) => state.cartReducer.addToCart);

    useEffect(() => {
        if (loading === false && res) {
            if (res?.status === 200) {
                toast('Product added to Cart successfully', {type: 'success', toastId: "addProductToCartSuccess"})
            } else if (res?.data?.error?.name === 'JsonWebTokenError') {
                toast("You are not logged in, please login first", {
                    type: 'error',
                    toastId: 'addToCartLogin',
                });
            } else {
                toast(res?.data?.errors ? res?.data?.errors[0]?.msg : 'Error while adding product to Cart', {
                    type: 'error',
                    toastId: 'addToCartError'
                })
            }
        }
    }, [loading, res]);

    return {colorClick, indexColor, addToCartHandle};
};

export default UseAddToCart;