import {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import notify from '../useNotification';
import {addProductToCart} from '../../redux/actions/cartActions';

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
            notify('Please select the color', 'warn');
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
            if (res && res?.status === 200) {
                notify('Product added to cart successfully', 'success');
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            } else if (res?.status === 401) {
                notify('you are not logged in!', 'error');
            } else if (res?.status === 403) {
                notify('You are not allowed to do this operation', 'error');
            } else if (res?.data?.errors) {
                notify(res?.data?.errors[0].msg, 'error');
            } else {
                notify('Error while adding product to cart', 'error');
            }
        }
    }, [loading, res]);

    return {colorClick, indexColor, addToCartHandle};
};

export default UseAddToCart;