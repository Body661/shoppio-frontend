import {useState, useEffect} from 'react'
import {createProduct} from '../../redux/actions/ProductActions';
import notify from '../useNotification';
import {useSelector, useDispatch} from 'react-redux'
import {getAllCategories} from '../../redux/actions/CategoryAction'
import {getAllBrands} from '../../redux/actions/BrandActions';
import {getSubcategory} from "../../redux/actions/SubcategoryActions";

const AdminAddProductsHook = () => {

    const [options, setOptions] = useState([]);

    //values images products
    const [images, setImages] = useState({});
    //values state
    const [prodName, setProdName] = useState('');
    const [prodDescription, setProdDescription] = useState('');
    const [priceBefore, setPriceBefore] = useState('');
    const [priceAfter, setPriceAfter] = useState(0);
    const [qty, setQty] = useState(0);
    const [CatID, setCatID] = useState('');
    const [BrandID, SetBrandID] = useState('');
    const [selectedSubID, setSelectedSubID] = useState([]);
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllCategories());
        dispatch(getAllBrands());
    }, [])

    //get last catgegory state from redux
    const category = useSelector(state => state.allCategories.categories)
    //get last brand state from redux
    const brand = useSelector(state => state.allBrands.brands)

    //get last sub cat state from redux
    const subcategory = useSelector(state => state.subcategory.subcategory)

    const onSelect = (selectedList) => {
        setSelectedSubID(selectedList)
    }
    const onRemove = (selectedList) => {
        setSelectedSubID(selectedList)
    }


    //to change name state
    const onChangeProdName = (event) => {
        event.persist();
        setProdName(event.target.value)
    }
    //to change name state
    const onChangeDesName = (event) => {
        event.persist();
        setProdDescription(event.target.value)
    }
    //to change name state
    const onChangePriceBefore = (event) => {
        event.persist();
        setPriceBefore(event.target.value)
    }
    //to change name state
    const onChangePriceAfter = (event) => {
        event.persist();
        setPriceAfter(event.target.value)
    }  //to change name state
    const onChangeQty = (event) => {
        event.persist();
        setQty(event.target.value)
    }
    const onChangeColor = (event) => {
        event.persist();
        setShowColor(!showColor)
    }

    //to show hide color picker
    const [showColor, setShowColor] = useState(false);
    //to store all pick color
    const [colors, setColors] = useState([]);
    //when choose new color
    const handelChangeComplete = (color) => {
        setColors([...colors, color.hex])
        setShowColor(!showColor)
    }
    const removeColor = (color) => {
        const newColor = colors.filter((e) => e !== color)
        setColors(newColor)
    }


    //when selet category store id
    const onSelectCategory = async (e) => {
        if (e.target.value || e.target.value.trim() !== "") {
            await dispatch(getSubcategory(e.target.value))
        }
        setCatID(e.target.value)
    }

    useEffect(() => {
        if (CatID || CatID.trim() !== "") {
            if (subcategory.data) {
                setOptions(subcategory.data)
            }
        }
    }, [CatID])

    //when selet brand store id
    const onSelectBrand = (e) => {
        SetBrandID(e.target.value)
    }

    //to convert base 64 to file
    function dataURLtoFile(dataURL, filename) {

        let arr = dataURL.split(','), mime = arr[0].match(/:(.*?);/)[1], bstr = atob(arr[1]), n = bstr.length,
            u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new File([u8arr], filename, {type: mime});
    }

    //to save data
    const handelSubmit = async (e) => {
        e.preventDefault();
        if (!CatID || CatID.trim() === "" || !prodName || prodName.trim() === "" || !prodDescription || prodDescription.trim() === "" || images.length <= 0 || priceBefore <= 0) {
            return notify("Please fill in all information", "warn")
        }

        //convert base 64 image to file
        const imgCover = dataURLtoFile(images[0], Math.random() + ".png")
        //convert array of base 64 image to file
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
        formData.append("cover", imgCover);
        formData.append("category", CatID);
        formData.append("brand", BrandID);
        itemImages.map((item) => formData.append("images", item))


        colors.map((color) => formData.append("colors", color))
        selectedSubID.map((item) => formData.append("subcategory", item._id))


        setLoading(true)
        await dispatch(createProduct(formData))
        setLoading(false)
    }

    const product = useSelector(state => state.allProducts.allProducts)
    const error = useSelector(state => state.allProducts.error)

    useEffect(() => {

        if (loading === false) {
            // setCatID(0)
            setColors([])
            setImages([])
            setProdName('')
            setProdDescription('')
            setPriceBefore(0)
            setPriceAfter(0)
            setQty(0)
            SetBrandID('')
            setSelectedSubID([])
            setTimeout(() => setLoading(true), 1500)

            if (product) {
                if (product.status === 201) {
                    notify('Product added successfully', "success");
                }
            }

            if (error) {
                console.log(error)
                if (error.status === 401) {
                    notify('You are not legged please login', "error");
                } else {
                    notify("Error while adding product", "error");
                }
            }
        }
    }, [loading])


    return [onChangeDesName, onChangeQty, onChangeColor, onChangePriceAfter, onChangePriceBefore, onChangeProdName, showColor, category, brand, priceAfter, images, setImages, onSelect, onRemove, options, handelChangeComplete, removeColor, onSelectCategory, handelSubmit, onSelectBrand, colors, priceBefore, qty, prodDescription, prodName]

}

export default AdminAddProductsHook