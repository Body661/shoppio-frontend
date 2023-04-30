import {useState, useEffect} from 'react'
import {getOneProduct} from '../../../redux/actions/productActions';
import {useSelector, useDispatch} from 'react-redux'
import {getAllCategories} from '../../../redux/actions/CategoryActions'
import {getAllBrands} from '../../../redux/actions/BrandActions';
import {updateProduct} from '../../../redux/actions/productActions';
import {getSubcategoriesOfCategory} from "../../../redux/actions/SubcategoryActions";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import validator from "validator/es";

const useEditProduct = (id) => {
    const navigate = useNavigate();
    const [options, setOptions] = useState([]);
    const [images, setImages] = useState({});
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [priceBeforeDiscount, setPriceBeforeDiscount] = useState(0);
    const [priceAfterDiscount, setPriceAfterDiscount] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [categoryId, setCategoryId] = useState('');
    const [brandId, setBrandId] = useState('');
    const [selectedSubcategoryId, setSelectedSubcategoryId] = useState([]);
    const [showColor, setShowColor] = useState(false);
    const [colors, setColors] = useState([]);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [loadingFetchData, setLoadingFetchData] = useState(true);
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoadingFetchData(true)
            await dispatch(getOneProduct(id))
            await dispatch(getAllCategories());
            await dispatch(getAllBrands());
            setLoadingFetchData(false)
        }

        fetchData();

    }, [id, dispatch])

    const item = useSelector(state => state.productReducer.product);
    const category = useSelector(state => state.categoryReducer.categories);
    const brand = useSelector(state => state.brandReducer.brands);

    useEffect(() => {
        if (item?.data?.data) {
            setImages(item?.data?.data?.images);
            setProductName(item?.data?.data?.title);
            setProductDescription(item?.data?.data?.description);
            setPriceBeforeDiscount(item?.data?.data?.price);
            setPriceAfterDiscount(item?.data?.data?.priceAfterDiscount);
            setQuantity(item?.data?.data?.quantity);
            setCategoryId(item?.data?.data?.category?._id);
            setBrandId(item?.data?.data?.brand?._id);
            setColors(item?.data?.data?.colors);
            setSelectedSubcategoryId(item?.data?.data?.subcategories)
        }
    }, [item]);

    const handleChangeCategory = async (e) => {
        if (e.target.value || e.target.value.trim() !== '') {
            setLoadingFetchData(true)
            setCategoryId(e.target.value);
            await dispatch(getSubcategoriesOfCategory(e.target.value));
            setLoadingFetchData(false)
        }
    };

    useEffect(() => {
        if (categoryId) {
            dispatch(getSubcategoriesOfCategory(categoryId));
        }
    }, [categoryId, dispatch]);

    const subcategories = useSelector((state) => state.subcategoryReducer.subcategories);

    useEffect(() => {
        if (categoryId) {
            setOptions(subcategories?.data?.data);
        }
    }, [subcategories, categoryId]);

    const onSelect = (selectedList) => setSelectedSubcategoryId(selectedList);
    const onRemove = (selectedList) => setSelectedSubcategoryId(selectedList);

    const handleChangeProductName = (event) => {
        setProductName(event.target.value);
    };

    const handleChangeDescription = (event) => {
        setProductDescription(event.target.value);
    };

    const handleAddColor = (color) => {
        setColors((prevState) => [...prevState, color.hex]);
        setShowColor(!showColor);
    };

    const removeColor = (color) => {
        const newColor = colors.filter((e) => e !== color);
        setColors(newColor);
    };

    const handleChangePrice = (event) => {
        setPriceBeforeDiscount(event.target.value);
    };

    const handleChangePriceAfterDiscount = (event) => {
        setPriceAfterDiscount(event.target.value);
    };

    const handleChangeQuantity = (event) => {
        setQuantity(event.target.value)
    };

    const handleChangeColor = () => {
        setShowColor((prev) => !prev);
    };

    const handleChangeBrand = (e) => {
        setBrandId(e.target.value);
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

        if (Object.keys(images).length === 0) {
            return toast("Product images are required", {type: 'error'});
        }

        if (!productName || productName.trim() === "") {
            return toast("Product name is required", {type: 'error'});
        }

        if (!productDescription || productDescription.trim() === "") {
            return toast("Product description is required", {type: 'error'});
        }

        if(productDescription.length < 20 || productDescription.length > 2000) {
            return toast("Product description must be between 20 and 2000 characters", {type: 'error'});
        }

        if (priceBeforeDiscount <= 0) {
            return toast("Product price is not valid", {type: 'error'});
        }

        if (priceAfterDiscount >= 0 && (priceAfterDiscount > priceBeforeDiscount)) {
            return toast("Price before discount must be greater that price after discount", {type: 'error'});
        }

        if (quantity <= 0) {
            return toast("Available quantity must be greater than 0", {type: 'error'});
        }

        if (!validator.isMongoId(categoryId)) {
            return toast("Please select a category", {type: 'error'});
        }

        if (!validator.isMongoId(brandId)) {
            return toast("Please select a brand", {type: 'error'});
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
        formData.append("title", productName);
        formData.append("description", productDescription);
        formData.append("quantity", quantity);
        formData.append("price", priceBeforeDiscount);
        formData.append("category", categoryId);
        formData.append("brand", brandId);
        if (priceAfterDiscount) formData.append("priceAfterDiscount", priceAfterDiscount);
        if (selectedSubcategoryId?.length > 0) selectedSubcategoryId?.forEach((subcategory) => formData.append("subcategories[]", subcategory._id));
        if (colors?.length > 0) colors.forEach((color) => formData.append("colors[]", color));

        formData.append("cover", imgCover);
        itemImages.forEach((item) => formData.append("images", item));

        setIsSubmitted(true)
        await dispatch(updateProduct(id, formData));
        setLoading(false);
        setIsSubmitted(false)
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
    }, [loading, updateProductRes, navigate]);

    return {
        categoryId,
        brandId,
        handleChangeDescription,
        handleChangeQuantity,
        handleChangeColor,
        handleChangePriceAfterDiscount,
        handleChangePrice,
        handleChangeProductName,
        showColor,
        category,
        brand,
        priceAfterDiscount,
        images,
        setImages,
        onSelect,
        onRemove,
        options,
        handleAddColor,
        removeColor,
        handleChangeCategory,
        handleSubmit,
        handleChangeBrand,
        colors,
        priceBeforeDiscount,
        quantity,
        productDescription,
        productName,
        loading,
        isSubmitted,
        loadingFetchData,
        selectedSubcategoryId,
        currentProductName: item?.data?.data?.title
    }
}

export default useEditProduct