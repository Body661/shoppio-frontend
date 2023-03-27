import {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import {addProductToCart} from '../../../redux/actions/cartActions';
import {toast} from "react-toastify";

const UseAddToCart = (productId, item) => {
    const dispatch = useDispatch();
    const [indexColor, setIndexColor] = useState('');
    const [colorText, setColorText] = useState('');
    const [loading, setLoading] = useState(false);

    const colorClick = (index, color) => {
        setIndexColor(index);
        setColorText(color);
    };

    const addToCartHandle = async () => {
        if (item?.colors?.length >= 1 && colorText === '') {
            toast('Please select the color', {type: 'warning'})
            return;
        }
        setLoading(true);
        if (item?.colors?.length < 1) {
            await dispatch(addProductToCart({productId}));
        } else {
            await dispatch(addProductToCart({productId, color: colorText.trim()}));
        }
        setLoading(false);
    };

    const res = useSelector((state) => state.cartReducer.addToCart);

    useEffect(() => {
        if (loading === false && res) {
            if (res?.status === 200) {
                toast('Product added to Cart successfully', {type: 'success'})
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            } else if(res?.data?.error?.name === 'JsonWebTokenError'){
                toast("You are not logged in, please login first", {
                    type: 'error',
                    toastId: 'addToCartLogin',
                });
            } else {
                toast(res?.data?.errors ? res?.data?.errors[0]?.msg : 'Error while adding product to Cart', {
                    type: 'error',
                    toastId: 'addToCartAnother'
                })
            }
        }
    }, [loading, res]);

    return {colorClick, indexColor, addToCartHandle};
};

export default UseAddToCart;