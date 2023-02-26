import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {addProductToWishList, removeProductFromWishList} from '../../redux/actions/wishlistActions';
import notify from '../useNotification';
import favOff from "../../images/fav-off.png";
import favOn from "../../images/fav-on.png";

const ProductWishlistHook = (item, favProd) => {
    const dispatch = useDispatch();
    const [favImg, setFavImg] = useState(favOff)
    let Fav = favProd?.some(fItem => fItem === item._id);
    const [loadingAdd, setLoadingAdd] = useState(true)
    const [loadingRemove, setLoadingRemove] = useState(true)
    const [isFav, setIsFav] = useState(Fav)

    useEffect(() => {
        setIsFav(favProd?.some(fItem => fItem === item._id))
    }, [favProd])

    const addToWishList = async () => {
        setIsFav(true)
        setFavImg(favOn)
        await dispatch(addProductToWishList({
            productId: item._id,
        }))
        setLoadingAdd(false)
    }


    const removeFromWishlist = async () => {
        setIsFav(false)
        setFavImg(favOff)
        await dispatch(removeProductFromWishList(item._id))
        setLoadingRemove(false)
    }
    const handelFav = async () => {
        if (isFav) {
            await removeFromWishlist();
        } else {
            await addToWishList()
        }
    }

    useEffect(() => {

        if (isFav === true) {
            setFavImg(favOn)
        } else {
            setFavImg(favOff)
        }
    }, [isFav])

    const resAdd = useSelector(state => state.wishlistReducer.addToWishList)
    const resRemove = useSelector(state => state.wishlistReducer.removeFromWishList)
    const error = useSelector(state => state.wishlistReducer.error)

    useEffect(() => {
        if (loadingAdd === false) {
            if (resAdd && resAdd?.status === 200) {
                notify("Product added to your wishlist", "success")
            }

            if (error) {
                if (error?.status === 401) {
                    notify("You are not logged in!", "error")
                } else if (error?.data?.errors) {
                    notify(error?.data?.errors[0]?.msg, "error");
                } else if (error?.status === 403) {
                    notify("Admins are not allowed to add product to wishlist", "error")
                } else {
                    notify("Error while adding product to wishlist", "error")
                }
            }
        }
    }, [loadingAdd])

    useEffect(() => {
        if (loadingRemove === false) {
            if (resRemove && resRemove?.status === 200) {
                notify("Product is removed from your wishlist!", "success")
            }

            if (error) {
                if (error?.status === 401) {
                    notify("You are not logged in!", "error")
                } else if (error?.data?.errors) {
                    notify(error?.data?.errors[0]?.msg, "error");
                } else {
                    notify("Error while removing product from wishlist", "error")
                }
            }
        }
    }, [loadingRemove])


    return [addToWishList, removeFromWishlist, handelFav, favImg]
}

export default ProductWishlistHook