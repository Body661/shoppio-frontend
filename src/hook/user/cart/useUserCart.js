import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { getAllUserCartItems } from '../../../redux/actions/cartActions';

const useUserCart = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const [itemsNum, setItemsNum] = useState(0);
    const [cartItems, setCartItems] = useState([]);
    const [couponName, setCouponName] = useState('');
    const [totalCartPrice, setTotalCartPrice] = useState(0);
    const [totalCartPriceAfterDiscount, setTotalCartPriceAfterDiscount] = useState(0);
    const [cartID, setCartID] = useState('');

    const userCart = useSelector((state) => state.cartReducer.userCart);

    useEffect(() => {
        const fetchUserCart = async () => {
            setIsLoading(true);
            await dispatch(getAllUserCartItems());
            setIsLoading(false);
        };
        fetchUserCart();
    }, [dispatch]);

    useEffect(() => {
        if (!isLoading && userCart) {
            if (userCart?.data?.data) {
                const {
                    cartItems,
                    totalCartPrice,
                    _id,
                    coupon,
                    totalPriceAfterDiscount,
                } = userCart.data.data;
                setItemsNum(cartItems.length);
                setCartItems(cartItems);
                setTotalCartPrice(totalCartPrice);
                setCartID(_id);
                setCouponName(coupon || '');
                setTotalCartPriceAfterDiscount(totalPriceAfterDiscount || 0);
            } else {
                setItemsNum(0);
                setCartItems([]);
                setCouponName('');
                setTotalCartPrice(0);
                setTotalCartPriceAfterDiscount(0);
            }
        }
    }, [isLoading, userCart]);

    return {
        itemsNum,
        cartItems,
        totalCartPrice,
        couponName,
        totalCartPriceAfterDiscount,
        cartID,
    };
};

export default useUserCart;
