import {useState, useEffect} from 'react'
import {getOneProduct} from '../../redux/actions/productActions';
import {useSelector, useDispatch} from 'react-redux'
import {getAllCategories} from '../../redux/actions/CategoryActions'
import {getAllBrands} from '../../redux/actions/BrandActions';
import {updateProduct} from '../../redux/actions/productActions';
import {getSubcategory} from "../../redux/actions/SubcategoryActions";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

const AdminEditProductsHook = (id) => {
    const navigate = useNavigate();
    const [options, setOptions] = useState([]);
    const [images, setImages] = useState([]);
    const [prodName, setProdName] = useState('');
    const [prodDescription, setProdDescription] = useState('');
    const [priceBefore, setPriceBefore] = useState('');
    const [priceAfter, setPriceAfter] = useState('');
    const [qty, setQty] = useState('');
    const [CatID, setCatID] = useState('');
    const [BrandID, setBrandID] = useState('');
    const [selectedSubID, setSelectedSubID] = useState([]);
    const [showColor, setShowColor] = useState(false);
    const [colors, setColors] = useState([]);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const run = async () => {
            await dispatch(getOneProduct(id))
            await dispatch(getAllCategories());
            await dispatch(getAllBrands());
        }
        run();
    }, [])

    const item = useSelector(state => state.allProducts.product);
    const category = useSelector(state => state.allCategories.categories);
    const brand = useSelector(state => state.allBrands.brands);

    useEffect(() => {
        if (item?.data?.data) {
            setImages(item.data.data.images);
            setProdName(item.data.data.title);
            setProdDescription(item.data.data.description);
            setPriceBefore(item.data.data.price);
            setPriceAfter(item.data.data.priceAfterDiscount);
            setQty(item.data.data.quantity);
            setCatID(item.data.data.category?._id);
            setBrandID(item.data.data.brand?._id);
            setColors(item.data.data.colors);
        }
    }, [item]);

    const onSelectCategory = async (e) => {
        if (e.target.value || e.target.value.trim() !== '') {
            setCatID(e.target.value);
            await dispatch(getSubcategory(e.target.value));
        }
    };

    useEffect(() => {
        if (CatID) {
            dispatch(getSubcategory(CatID));
        }
    }, [CatID, dispatch]);

    const subCat = useSelector(state => state.subcategory.subcategory);

    useEffect(() => {
        if (CatID) {
            setOptions(subCat?.data?.data);
        }
    }, [subCat, CatID]);

    const onSelect = (selectedList) => setSelectedSubID(selectedList);
    const onRemove = (selectedList) => setSelectedSubID(selectedList);

    const onChangeProdName = (event) => {
        event.persist();
        setProdName(event.target.value);
    };

    const onChangeDesName = (event) => {
        event.persist();
        setProdDescription(event.target.value);
    };

    const handelChangeComplete = (color) => {
        setColors([...colors, color.hex]);
        setShowColor(!showColor);
    };

    const removeColor = (color) => {
        const newColor = colors.filter((e) => e !== color);
        setColors(newColor);
    };

    const onChangePriceBefore = (event) => {
        event.persist();
        setPriceBefore(event.target.value);
    };

    const onChangePriceAfter = (event) => {
        event.persist();
        setPriceAfter(event.target.value);
    };

    const onChangeQty = (event) => {
        event.persist();
        setQty(event.target.value)
    };

    const onChangeColor = (event) => {
        event.persist();
        setShowColor((prev) => !prev);
    };

    const onSelectBrand = (e) => {
        setBrandID(e.target.value);
    };

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

        const imgCover = dataURLtoFile(images[0], Math.random() + ".png");
        const itemImages = Array.from(Array(Object.keys(images).length).keys()).map(
            (item, index) => {
                return dataURLtoFile(images[index], Math.random() + ".png")
            }
        )

        const formData = new FormData();
        formData.append("title", prodName);
        formData.append("description", prodDescription);
        formData.append("quantity", qty);
        formData.append("price", priceBefore);
        formData.append("category", CatID);
        formData.append("brand", BrandID);
        formData.append("priceAfterDiscount", priceAfter);

        formData.append("cover", imgCover);
        itemImages.forEach((item) => formData.append("images", item));

        colors.forEach((color) => formData.append("colors", color));
        selectedSubID.forEach((item) => formData.append("subcategory", item._id));

        setLoading(true);
        await dispatch(updateProduct(id, formData));
        setLoading(false);
    };

    const updateProductRes = useSelector((state) => state.allProducts.updateProduct);


    useEffect(() => {
        if (!loading) {
            console.log(updateProductRes)
            if (updateProductRes && updateProductRes?.status === 200) {
                toast("Product updated successfully", {type: 'success', toastId: 'updateProductSuccess'});
                setTimeout(() => {
                    navigate(`/products/${updateProductRes?.data?.data?._id}`)
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
        handelChangeComplete,
        removeColor,
        onSelectCategory,
        handleSubmit,
        onSelectBrand,
        colors,
        priceBefore,
        qty,
        prodDescription,
        prodName
    }
}

export default AdminEditProductsHook