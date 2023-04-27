import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getBrand, updatedBrand} from "../../../redux/actions/BrandActions";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

const useUpdateBrand = (brandId) => {

    const [loadingFetch, setLoadingFetch] = useState(true)
    const [loadingUpdate, setLoadingUpdate] = useState(true)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const navigate = useNavigate();
    const [img, setImg] = useState(null)
    const [name, setName] = useState('')
    const [selectedFile, setSelectedFile] = useState(null);
    const dispatch = useDispatch()

    const handleNameChange = event => setName(event.target.value);

    const handleImageChange = event => {
        if (event.target.files && event.target.files[0]) {
            setImg(URL.createObjectURL(event.target.files[0]));
            setSelectedFile(event.target.files[0]);
        }
    };

    const convertURLtoFile = async (url) => {
        const response = await fetch(url, {mode: "cors"});
        const data = await response.blob();
        const ext = url.split(".").pop();
        const metadata = {type: `image/${ext}`};
        return new File([data], Math.random() + ".png", metadata);
    };

    useEffect(() => {
        const fetchBrandData = async () => {
            setLoadingFetch(true)
            await dispatch(getBrand(brandId));
            setLoadingFetch(false)
        }

        fetchBrandData()
    }, [brandId, dispatch])

    const brand = useSelector(state => state.brandReducer.brand)

    useEffect(() => {
        if (!loadingFetch) {
            if (brand && brand?.status === 200) {
                setName(brand?.data?.data?.name)
                setImg(brand?.data?.data?.img)

                const solveImgPromise = async () => {
                    let imgPromise;
                    imgPromise = Promise.resolve(convertURLtoFile(brand?.data?.data?.img, Math.random() + ".png"));
                    const brandImg = await imgPromise;
                    setSelectedFile(brandImg);
                }

                solveImgPromise()

            } else {
                toast("Something went wrong, please try again later", {type: "error"})
                setTimeout(() => {
                    navigate('/admin/brands')
                }, 1500)
            }
        }
    }, [loadingFetch, brand])

    const handleSubmit = async event => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('name', name);

        if (selectedFile) {
            formData.append('img', selectedFile);
        }

        setLoadingUpdate(true);
        setIsSubmitted(true);
        await dispatch(updatedBrand(brandId, formData));
        setLoadingUpdate(false);
        setIsSubmitted(false);
    };

    const updateBrandRes = useSelector(state => state.brandReducer.updateBrand);

    useEffect(() => {
        if (updateBrandRes && !loadingUpdate) {
            if (updateBrandRes?.status === 200) {
                toast('Brand updated successfully', {type: 'success', toastId: 'updateBrandSuccess'});
                setTimeout(() => {
                    navigate('/admin/brands')
                }, 1000)
            } else {
                toast(updateBrandRes?.data?.errors ? updateBrandRes?.data?.errors[0]?.msg : 'Error while updating the brand', {
                    type: 'error',
                    toastId: 'updateBrandError'
                });
            }
        }
    }, [updateBrandRes, loadingUpdate]);

    return {name, img, handleNameChange, handleSubmit, handleImageChange, loadingUpdate, isSubmitted, loadingFetch}
}

export default useUpdateBrand