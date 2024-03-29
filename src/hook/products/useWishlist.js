import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addProductToWishList, removeProductFromWishList} from '../../redux/actions/wishlistActions';
import favOff from "../../images/Icons/heart.png";
import favOn from "../../images/Icons/heart-filled.png";
import {toast} from "react-toastify";

const useWishlist = (item, isFavProduct) => {
    const dispatch = useDispatch();
    const [favImg, setFavImg] = useState(favOff);

    const [loadingAdd, setLoadingAdd] = useState(true);
    const [loadingRemove, setLoadingRemove] = useState(true)

    const [isFav, setIsFav] = useState(false);

    useEffect(() => {
        setIsFav(isFavProduct?.includes(item?._id));
    }, [isFavProduct, item?._id]);

    useEffect(() => {
        setFavImg(isFav ? favOn : favOff);
    }, [isFav]);

    const handleAddToWishlist = async () => {
        setIsFav(true);
        setFavImg(favOn);
        await dispatch(addProductToWishList({productId: item._id}));
        setLoadingAdd(false);
    };

    const handleRemoveFromWishlist = async () => {
        setIsFav(false);
        setFavImg(favOff);
        await dispatch(removeProductFromWishList(item._id));
        setLoadingRemove(false);
    };

    const handleFav = () => {
        if (isFav) {
            handleRemoveFromWishlist();
        } else {
            handleAddToWishlist();
        }
    };

    let resAdd = useSelector(state => state.wishlistReducer.addToWishList)
    let resRemove = useSelector(state => state.wishlistReducer.removeFromWishList)

    useEffect(() => {
        if (loadingAdd === false && resAdd) {
            if (resAdd?.status === 200) {
                toast("Product added to your wishlist", {type: 'success', toastId: 'addToWishListSuccess'})
            } else if (resAdd?.status === 403) {
                toast("Admins are not allowed to add products to wishlist", {
                    type: 'error',
                    toastId: 'addToWishListAdmin'
                })
                setIsFav(false);
                setFavImg(favOff);
            } else if (resAdd?.status === 401) {
                toast("You are not logged in, please login first", {type: 'error', toastId: 'addToWishListLogin'})
                setIsFav(false);
                setFavImg(favOff);
            } else if (resAdd?.data?.error?.name === 'JsonWebTokenError') {
                toast("You are not logged in, please login first", {
                    type: 'error',
                    toastId: 'addToWishlist',
                });
                setIsFav(false);
                setFavImg(favOff);
            } else {
                toast(resAdd?.data?.errors ? resAdd?.data?.errors[0]?.msg : "Error while adding product to wishlist", {
                    type: 'error',
                    toastId: 'addToWishListAnother'
                })
                setIsFav(false);
                setFavImg(favOff);
            }
        }
    }, [loadingAdd, resAdd])

    useEffect(() => {

        if (loadingRemove === false && resRemove) {
            if (resRemove?.status === 200) {
                toast("Product is removed from your wishlist!", {type: 'success', toastId: 'RemoveFromWishListSuccess'})
            } else {
                toast(resRemove?.data?.errors ? resRemove?.data?.errors[0]?.msg : "Error while removing product from wishlist", {
                    type: 'error',
                    toastId: 'RemoveFromWishListAnother'
                })
                setIsFav(true);
                setFavImg(favOn)
            }
        }

    }, [loadingRemove, resRemove])

    return {isFav, favImg, handleFav};
};

export default useWishlist;
