import {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import 'react-toastify/dist/ReactToastify.css';
import notify from '../useNotification'
import {addProductToCart} from '../../redux/actions/cartActions';

const AddToCartHook = (prdID, item) => {

    const dispatch = useDispatch();

    const [indexColor, setIndexColor] = useState('')
    const [colorText, setColorText] = useState('')
    const [loading, setLoading] = useState(true)
    const colorClick = (index, color) => {
        setIndexColor(index)
        setColorText(color)
    }


    //add product to cart
    const addToCartHandel = async () => {
        if (item?.colors?.length >= 1) {
            if (colorText === "") {
                notify("Please select the color", "warn")
                return
            }
        } else {
            setColorText('')
        }
        setLoading(true)
        if (colorText.trim() !== "") {
            await dispatch(addProductToCart({
                productId: prdID,
                color: colorText
            }))
        } else {
            await dispatch(addProductToCart({
                productId: prdID,
            }))
        }
        setLoading(false)
    }

    const res = useSelector(state => state.cartReducer.addToCart)
    const error = useSelector(state => state.cartReducer.error)

    useEffect(() => {

        if (loading === false) {
            if (res && res.status === 200) {
                notify("Product added to cart successfully", "success")
                setTimeout(() => {
                    window.location.reload()
                }, 1000);
            }

            if (error) {
                if (error.status === 401) {
                    notify("you are not logged in!", "error")
                } else if (error.status === 403) {
                    notify("You are not allowed to do this operation", "error");
                } else if (error?.data?.errors) {
                    notify(error?.data?.errors[0]?.msg, "error");
                } else {
                    notify("Error while adding product to cart", "error")
                }
            }
        }
    }, [loading])

    return [colorClick, indexColor, addToCartHandel]

}

export default AddToCartHook