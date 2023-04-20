import {useState, useEffect} from 'react'
import {getOneProduct} from '../../../redux/actions/productActions';
import {useSelector, useDispatch} from 'react-redux'
import {getAllCategories} from '../../../redux/actions/CategoryActions'
import {getAllBrands} from '../../../redux/actions/BrandActions';
import {updateProduct} from '../../../redux/actions/productActions';
import {getSubcategory} from "../../../redux/actions/SubcategoryActions";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

const useEditProduct = (id) => {
    const navigate = useNavigate();
    const [options, setOptions] = useState([]);
    const [images, setImages] = useState([]);
    const [prodName, setProdName] = useState('');
    const [prodDescription, setProdDescription] = useState('');
    const [priceBefore, setPriceBefore] = useState(0);
    const [priceAfter, setPriceAfter] = useState(0);
    const [qty, setQty] = useState(0);
    const [CatID, setCatID] = useState('');
    const [BrandID, setBrandID] = useState('');
    const [selectedSubID, setSelectedSubID] = useState([]);
    const [showColor, setShowColor] = useState(false);
    const [colors, setColors] = useState([]);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [loadingFetchData, setLoadingFetchData] = useState(true);
    const [isPress, setIsPress] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoadingFetchData(true)
            await dispatch(getOneProduct(id))
            await dispatch(getAllCategories());
            await dispatch(getAllBrands());
            setLoadingFetchData(false)
        }

        fetchData();

    }, [id])

    const item = useSelector(state => state.productReducer.product);
    const category = useSelector(state => state.categoryReducer.categories);
    const brand = useSelector(state => state.brandReducer.brands);

    useEffect(() => {
        if (item?.data?.data) {
            setImages(item?.data?.data?.images);
            setProdName(item?.data?.data?.title);
            setProdDescription(item?.data?.data?.description);
            setPriceBefore(item?.data?.data?.price);
            setPriceAfter(item?.data?.data?.priceAfterDiscount);
            setQty(item?.data?.data?.quantity);
            setCatID(item?.data?.data?.category?._id);
            setBrandID(item?.data?.data?.brand?._id);
            setColors(item?.data?.data?.colors);
            setSelectedSubID(item?.data?.data?.subcategories)
        }
    }, [item]);

    const onSelectCategory = async (e) => {
        if (e.target.value || e.target.value.trim() !== '') {
            setLoadingFetchData(true)
            setCatID(e.target.value);
            await dispatch(getSubcategory(e.target.value));
            setLoadingFetchData(false)
        }
    };

    useEffect(() => {
        if (CatID) {
            dispatch(getSubcategory(CatID));
        }
    }, [CatID, dispatch]);

    const subCat = useSelector(state => state.subcategoryReducer.subcategory);

    useEffect(() => {
        if (CatID) {
            setOptions(subCat?.data?.data);
        }
    }, [subCat, CatID]);

    const onSelect = (selectedList) => setSelectedSubID(selectedList);
    const onRemove = (selectedList) => setSelectedSubID(selectedList);

    const onChangeProdName = (event) => {
        setProdName(event.target.value);
    };

    const onChangeDesName = (event) => {
        setProdDescription(event.target.value);
    };

    const handleAddColor = (color) => {
        setColors((prevState) => [...prevState, color.hex]);
        setShowColor(!showColor);
    };

    const removeColor = (color) => {
        const newColor = colors.filter((e) => e !== color);
        setColors(newColor);
    };

    const onChangePriceBefore = (event) => {
        setPriceBefore(event.target.value);
    };

    const onChangePriceAfter = (event) => {
        setPriceAfter(event.target.value);
    };

    const onChangeQty = (event) => {
        setQty(event.target.value)
    };

    const onChangeColor = (event) => {
        setShowColor((prev) => !prev);
    };

    const onSelectBrand = (e) => {
        setBrandID(e.target.value);
    };

    //to convert base 64 to file
    const dataURLtoFile = (dataurl, filename) => {
        let arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new File([u8arr], filename, {type: mime});
    }

    //convert url to file
    const convertURLtoFile = async (url) => {
        const response = await fetch(url, {mode: "cors"});
        const data = await response.blob();
        const ext = url.split(".").pop();
        const metadata = {type: `image/${ext}`};
        return new File([data], Math.random() + ".png", metadata);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !CatID ||
            !prodName ||
            prodName.trim() === "" ||
            !prodDescription ||
            prodDescription.trim() === "" ||
            images?.length <= 0 ||
            priceBefore <= 0
        ) {
            return toast("Please fill in all information", {type: 'error'});
        }

        const itemImagesPromises = Array.from(Array(Object.keys(images).length).keys()).map((image, index) => {
            if (images[index].length <= 1000) {
                return convertURLtoFile(images[index]);
            } else {
                return Promise.resolve(dataURLtoFile(images[index], Math.random() + ".png"));
            }
        });

        let imgCoverPromise;
        if (images[0].length <= 1000) {
            imgCoverPromise = convertURLtoFile(images[0]);
        } else {
            imgCoverPromise = Promise.resolve(dataURLtoFile(images[0], Math.random() + ".png"));
        }

        // Wait for all promises to resolve
        const [itemImages, imgCover] = await Promise.all([
            Promise.all(itemImagesPromises),
            imgCoverPromise,
        ]);

        const formData = new FormData();
        formData.append("title", prodName);
        formData.append("description", prodDescription);
        formData.append("quantity", qty);
        formData.append("price", priceBefore);
        formData.append("category", CatID);
        formData.append("brand", BrandID);
        if (priceAfter) formData.append("priceAfterDiscount", priceAfter);
        if (selectedSubID?.length > 0) selectedSubID?.forEach((subcategory) => formData.append("subcategories[]", subcategory._id));
        if (colors?.length > 0) colors.forEach((color) => formData.append("colors[]", color));

        formData.append("cover", imgCover);
        itemImages.forEach((item) => formData.append("images", item));

        setIsPress(true)
        await dispatch(updateProduct(id, formData));
        setLoading(false);
        setIsPress(false)
    };

    const updateProductRes = useSelector((state) => state.productReducer.updateProduct);

    useEffect(() => {
        if (!loading) {
            if (updateProductRes && updateProductRes?.status === 200) {
                toast("Product updated successfully", {type: 'success', toastId: 'updateProductSuccess'});
                setTimeout(() => {
                    navigate(`/admin/products`)
                }, 1000)
            } else {
                toast(updateProductRes?.data?.errors ? updateProductRes?.data?.errors[0]?.msg : "Error while updating product", {
                    type: 'error',
                    toastId: 'updateProductError'
                });
            }
        }
    }, [loading, updateProductRes]);

    return {
        CatID,
        BrandID,
        onChangeDesName,
        onChangeQty,
        onChangeColor,
        onChangePriceAfter,
        onChangePriceBefore,
        onChangeProdName,
        showColor,
        category,
        brand,
        priceAfter,
        images,
        setImages,
        onSelect,
        onRemove,
        options,
        handleAddColor,
        removeColor,
        onSelectCategory,
        handleSubmit,
        onSelectBrand,
        colors,
        priceBefore,
        qty,
        prodDescription,
        prodName,
        loading,
        isPress,
        loadingFetchData,
        selectedSubID,
        currentProductName: item?.data?.data?.title
    }
}

export default useEditProduct