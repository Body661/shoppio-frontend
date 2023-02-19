import {useState, useEffect} from 'react'
import {getOneProduct} from '../../redux/actions/productActions';
import notify from './../useNotification';
import {useSelector, useDispatch} from 'react-redux'
import {getAllCategories} from '../../redux/actions/CategoryActions'
import {getAllBrands} from '../../redux/actions/BrandActions';
import {updateProduct} from '../../redux/actions/productActions';
import {getSubcategory} from "../../redux/actions/SubcategoryActions";

const AdminEditProductsHook = (id) => {

    const [options, setOptions] = useState([]);

    //values images products
    const [images, setImages] = useState([]);
    //values state
    const [prodName, setProdName] = useState('');
    const [prodDescription, setProdDescription] = useState('');
    const [priceBefore, setPriceBefore] = useState('');
    const [priceAfter, setPriceAfter] = useState('');
    const [qty, setQty] = useState('');
    const [CatID, setCatID] = useState('0');
    const [BrandID, SetBrandID] = useState('0');
    const [selectedSubID, setSelectedSubID] = useState([]);
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();
    useEffect(() => {
        const run = async () => {
            await dispatch(getOneProduct(id))
            await dispatch(getAllCategories());
            await dispatch(getAllBrands());
        }
        run();
    }, [])

    //get one product details
    const item = useSelector((state) => state.allProducts.product)
    //get last category state from redux
    const category = useSelector(state => state.allCategories.categories)
    //get last brand state from redux
    const brand = useSelector(state => state.allBrands.brands)

    //get last sub cat state from redux
    const subCat = useSelector(state => state.subcategory.subcategory)

    const onSelect = (selectedList) => {
        setSelectedSubID(selectedList)
    }
    const onRemove = (selectedList) => {
        setSelectedSubID(selectedList)
    }


    useEffect(() => {
        if (item.data) {
            setImages(item.data?.images)
            setProdName(item.data?.title)
            setProdDescription(item.data?.description)
            setPriceBefore(item.data?.price)
            setPriceAfter(item.data?.priceAfterDiscount)
            setQty(item.data?.quantity)
            setCatID(item.data?.category?._id)
            SetBrandID(item.data?.brand?._id)
            setColors(item.data?.colors)
        }
    }, [item])


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


    //when select category store id
    const onSelectCategory = async (e) => {
        setCatID(e.target.value)
    }
    useEffect(() => {
        if (CatID) {
            const run = async () => {
                await dispatch(getSubcategory(CatID))
            }
            run();
        }
    }, [CatID])

    useEffect(() => {
        if (CatID) {
            setOptions(subCat?.data)
        }
    }, [subCat])


    //when select brand store id
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

    //convert url to file
    const convertURLtoFile = async (url) => {
        const response = await fetch(url, {mode: "cors"});
        const data = await response.blob();
        const ext = url.split(".").pop();
        const metadata = {type: `image/${ext}`};
        return new File([data], Math.random(), metadata);
    };

    //to save data
    const handelSubmit = async (e) => {
        e.preventDefault();
        if (!CatID || !prodName || prodName?.trim() === "" || !prodDescription || prodDescription?.trim() === "" || images.length <= 0 || priceBefore <= 0) {
            return notify("Please fill in all information", "warn")
        }

        let imgCover;
        if (images[0].length <= 1000) {
            convertURLtoFile(images[0]).then(val => imgCover = val)
        } else {
            imgCover = dataURLtoFile(images[0], Math.random() + ".png")
        }

        let itemImages = []
        //convert array of base 64 image to file
        Array.from(Array(Object.keys(images).length).keys()).map(
            (item, index) => {
                if (images[index].length <= 1000) {
                    convertURLtoFile(images[index]).then(val => itemImages.push(val))
                } else {
                    itemImages.push(dataURLtoFile(images[index], Math.random() + ".png"))
                }
            })

        const formData = new FormData();
        formData.append("title", prodName);
        formData.append("description", prodDescription);
        formData.append("quantity", qty);
        formData.append("price", priceBefore);
        formData.append("category", CatID);
        formData.append("brand", BrandID);
        formData.append("priceAfterDiscount", priceAfter)

        setTimeout(() => {
            formData.append("cover", imgCover);
            itemImages.map((item) => formData.append("images", item))
        }, 1000);


        colors.map((color) => formData.append("colors", color))
        selectedSubID.map((item) => formData.append("subcategory", item._id))
        setTimeout(async () => {
            setLoading(true)
            await dispatch(updateProduct(id, formData))
            setLoading(false)
        }, 1000);

    }

    const product = useSelector(state => state.allProducts.updateProduct)
    const error = useSelector(state => state.allProducts.error)

    useEffect(() => {

        if (loading === false) {
            setCatID('')
            setColors([])
            setImages([])
            setProdName('')
            setProdDescription('')
            setPriceBefore('')
            setPriceAfter('')
            setQty('')
            SetBrandID('')
            setSelectedSubID([])
            setTimeout(() => setLoading(true), 1500)

            if (product) {
                if (product.status === 200) {
                    notify('Product updated successfully', "success");
                }
            }

            if (error) {
                if (error?.data.errors) {
                    notify(error?.data.errors[0].msg, "error");
                } else {
                    notify("Error while updating the product", "error");
                }
            }
        }
    }, [loading])


    return [CatID, BrandID, onChangeDesName, onChangeQty, onChangeColor, onChangePriceAfter, onChangePriceBefore, onChangeProdName, showColor, category, brand, priceAfter, images, setImages, onSelect, onRemove, options, handelChangeComplete, removeColor, onSelectCategory, handelSubmit, onSelectBrand, colors, priceBefore, qty, prodDescription, prodName]

}

export default AdminEditProductsHook