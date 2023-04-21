import {useState, useEffect} from 'react'
import {createProduct} from '../../../redux/actions/productActions';
import {useSelector, useDispatch} from 'react-redux'
import {getAllCategories} from '../../../redux/actions/CategoryActions'
import {getAllBrands} from '../../../redux/actions/BrandActions';
import {getSubcategoriesOfCategory} from "../../../redux/actions/SubcategoryActions";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

const useAddProduct = () => {
    const navigate = useNavigate();
    const [options, setOptions] = useState([]);
    const [images, setImages] = useState({});
    const [prodName, setProdName] = useState('');
    const [prodDescription, setProdDescription] = useState('');
    const [priceBefore, setPriceBefore] = useState('');
    const [priceAfter, setPriceAfter] = useState('');
    const [qty, setQty] = useState('');
    const [CatID, setCatID] = useState('');
    const [BrandID, SetBrandID] = useState('');
    const [selectedSubID, setSelectedSubID] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isPress, setIsPress] = useState(false);
    const [loadingFetchData, setLoadingFetchData] = useState(true);
    const [showColor, setShowColor] = useState(false);
    const [colors, setColors] = useState([]);
    const category = useSelector((state) => state.categoryReducer.categories);
    const brand = useSelector((state) => state.brandReducer.brands);
    const subcategories = useSelector((state) => state.subcategoryReducer.subcategories);
    const dispatch = useDispatch();

    useEffect(() => {
        setLoadingFetchData(true)
        dispatch(getAllCategories());
        dispatch(getAllBrands());
        setLoadingFetchData(false)
    }, [dispatch]);

    useEffect(() => {
        if (CatID?.trim() !== '' && subcategories?.data?.data) {
            setOptions(subcategories.data.data);
        }
    }, [CatID, subcategories]);
    const onSelect = (selectedList) => setSelectedSubID(selectedList);
    const onRemove = (selectedList) => setSelectedSubID(selectedList);

    const onChangeProdName = (event) => setProdName(event.target.value);
    const onChangeDescription = (event) => setProdDescription(event.target.value);
    const onChangePriceBefore = (event) => setPriceBefore(event.target.value);
    const onChangePriceAfter = (event) => setPriceAfter(event.target.value);
    const onChangeQty = (event) => setQty(event.target.value);
    const onChangeColor = () => setShowColor(!showColor);

    const handleAddColor = (color) => {
        setColors([...colors, color.hex]);
        setShowColor(!showColor);
    };

    const removeColor = (color) => {
        const newColor = colors.filter((e) => e !== color);
        setColors(newColor);
    };

    const onSelectCategory = async (e) => {
        if (e.target.value || e.target.value.trim() !== '') {
            setLoadingFetchData(true)
            await dispatch(getSubcategoriesOfCategory(e.target.value, '', ''));
            setLoadingFetchData(false)
        }
        setCatID(e.target.value);
    };

    const onSelectBrand = (e) => SetBrandID(e.target.value);

    function dataURLtoFile(dataURL, filename) {
        let arr = dataURL.split(',');
        let mime = arr[0].match(/:(.*?);/)[1];
        let bstr = atob(arr[1]);
        let n = bstr.length;
        let u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, {type: mime});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !CatID ||
            !prodName ||
            prodName.trim() === "" ||
            !prodDescription ||
            prodDescription.trim() === "" ||
            images.length <= 0 ||
            priceBefore <= 0
        ) {
            return toast("Please fill in all information", {type: 'error'});
        }

        const itemImagesPromises = Array.from(Array(Object.keys(images).length).keys()).map((image, index) => {
            return Promise.resolve(dataURLtoFile(images[index], Math.random() + ".png"));
        });

        let imgCoverPromise;
        imgCoverPromise = Promise.resolve(dataURLtoFile(images[0], Math.random() + ".png"));

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
        formData.append("cover", imgCover);
        formData.append("category", CatID);
        formData.append("brand", BrandID);

        if (priceAfter) formData.append("priceAfterDiscount", priceAfter);
        if (selectedSubID?.length > 0) selectedSubID?.forEach((subcategory) => formData.append("subcategories[]", subcategory._id));
        if (colors?.length > 0) colors.forEach((color) => formData.append("colors[]", color));

        itemImages.forEach((image) => formData.append("images", image));

        setLoading(true);
        setIsPress(true);
        await dispatch(createProduct(formData));
        setLoading(false);
        setIsPress(false);
    };

    const product = useSelector((state) => state.productReducer.createdProduct);

    useEffect(() => {
        if (!loading) {
            if (product && product?.status === 201) {
                toast("Product added successfully", {type: 'success', toastId: 'addProductSuccess'});
                setTimeout(() => {
                    navigate(`/admin/products`)
                }, 1000)
            } else {
                toast(product?.data?.errors ? product?.data?.errors[0]?.msg : "Error while adding product", {
                    type: 'error',
                    toastId: 'addProductError'
                });
            }
        }
    }, [loading, product]);


    return {
        onChangeDescription,
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
        loadingFetchData,
        isPress
    }

}

export default useAddProduct