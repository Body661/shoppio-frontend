import {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {createProduct} from '../../../redux/actions/productActions';
import {getAllCategories} from '../../../redux/actions/CategoryActions';
import {getAllBrands} from '../../../redux/actions/BrandActions';
import {getSubcategoriesOfCategory} from '../../../redux/actions/SubcategoryActions';
import {toast} from 'react-toastify';
import {useNavigate} from 'react-router-dom';
import validator from 'validator/es';

const useAddProduct = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const category = useSelector((state) => state.categoryReducer.categories);
    const brand = useSelector((state) => state.brandReducer.brands);
    const subcategories = useSelector((state) => state.subcategoryReducer.subcategories);

    // State variables
    const [options, setOptions] = useState([]);
    const [images, setImages] = useState({});
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [priceBeforeDiscount, setPriceBeforeDiscount] = useState('');
    const [priceAfterDiscount, setPriceAfterDiscount] = useState('');
    const [quantity, setQuantity] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [brandId, SetBrandId] = useState('');
    const [selectedSubcategoryId, setSelectedSubcategoryId] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [loadingFetchData, setLoadingFetchData] = useState(true);
    const [showColor, setShowColor] = useState(false);
    const [colors, setColors] = useState([]);

    // Fetch all categories and brands when the component is mounted
    useEffect(() => {
        setLoadingFetchData(true);
        dispatch(getAllCategories());
        dispatch(getAllBrands());
        setLoadingFetchData(false);
    }, [dispatch]);

    // Update the options for subcategories when categoryId or subcategories change
    useEffect(() => {
        if (categoryId?.trim() !== '' && subcategories?.data?.data) {
            setOptions(subcategories.data.data);
        }
    }, [categoryId, subcategories]);

    const onSelect = (selectedList) => setSelectedSubcategoryId(selectedList);
    const onRemove = (selectedList) => setSelectedSubcategoryId(selectedList);

    const handleChangeProductName = (event) => setProductName(event.target.value);
    const handleChangeDescription = (event) => setProductDescription(event.target.value);
    const handleChangePrice = (event) => setPriceBeforeDiscount(event.target.value);
    const handleChangePriceAfterDiscount = (event) => setPriceAfterDiscount(event.target.value);
    const handleChangeQuantity = (event) => setQuantity(event.target.value);
    const handleChangeColor = () => setShowColor(!showColor);

    const handleAddColor = (color) => {
        setColors([...colors, color.hex]);
        setShowColor(!showColor);
    };

    const removeColor = (color) => {
        const newColor = colors.filter((e) => e !== color);
        setColors(newColor);
    };

    const handleChangeCategory = async (e) => {
        if (e.target.value || e.target.value.trim() !== '') {
            setLoadingFetchData(true);
            await dispatch(getSubcategoriesOfCategory(e.target.value, '', ''));
            setLoadingFetchData(false);
        }
        setCategoryId(e.target.value);
    };

    const handleChangeBrand = (e) => SetBrandId(e.target.value);

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

        if (Object.keys(images).length === 0) {
            return toast("Product images are required", {type: 'error'});
        }

        if (!productName || productName.trim() === "") {
            return toast("Product name is required", {type: 'error'});
        }

        if (!productDescription || productDescription.trim() === "") {
            return toast("Product description is required", {type: 'error'});
        }

        if (productDescription.length < 20 || productDescription.length > 2000) {
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

        // Convert data URLs to files
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
        formData.append("title", productName);
        formData.append("description", productDescription);
        formData.append("quantity", quantity);
        formData.append("price", priceBeforeDiscount);
        formData.append("cover", imgCover);
        formData.append("category", categoryId);
        formData.append("brand", brandId);

        if (priceAfterDiscount) formData.append("priceAfterDiscount", priceAfterDiscount);
        if (selectedSubcategoryId?.length > 0) selectedSubcategoryId?.forEach((subcategory) => formData.append("subcategories[]", subcategory._id));
        if (colors?.length > 0) colors.forEach((color) => formData.append("colors[]", color));

        itemImages.forEach((image) => formData.append("images", image));

        setLoading(true);
        setIsSubmitted(true);
        await dispatch(createProduct(formData));
        setLoading(false);
        setIsSubmitted(false);
    };

    const product = useSelector((state) => state.productReducer.createdProduct);

    useEffect(() => {
        if (!loading) {
            if (product && product?.status === 201) {
                toast("Product added successfully", {type: 'success', toastId: 'addProductSuccess'});
                setTimeout(() => {
                    navigate(`/admin/products`);
                }, 1000);
            } else {
                toast(product?.data?.errors ? product?.data?.errors[0]?.msg : "Error while adding product", {
                    type: 'error',
                    toastId: 'addProductError',
                });
            }
        }
    }, [loading, product, navigate]);

    return {
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
        loadingFetchData,
        isSubmitted,
    };
};

export default useAddProduct;
