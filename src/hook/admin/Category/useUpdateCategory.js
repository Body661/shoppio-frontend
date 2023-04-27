import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getCategory, updateCategory} from "../../../redux/actions/CategoryActions";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

const useUpdateCategory = (categoryId) => {

    const [loading, setLoading] = useState(true)
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
        const fetchCategoryData = async () => {

            await dispatch(getCategory(categoryId));
            setLoading(false)
        }

        fetchCategoryData()
    }, [])

    const category = useSelector(state => state.categoryReducer.category)

    useEffect(() => {
        if (!loading) {
            if (category && category?.status === 200) {
                setName(category?.data?.data?.name)
                setImg(category?.data?.data?.img)

                const solveImgPromise = async () => {
                    let imgPromise;
                    imgPromise = Promise.resolve(convertURLtoFile(category?.data?.data?.img, Math.random() + ".png"));
                    const categoryImg = await imgPromise;
                    setSelectedFile(categoryImg);
                }

                solveImgPromise()

            } else {
                toast("Something went wrong, please try again later", {type: "error"})
                setTimeout(() => {
                    navigate('/admin/categories')
                }, 1500)
            }
        }
    }, [loading, category])

    const handleSubmit = async event => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('name', name);

        if (selectedFile) {
            formData.append('img', selectedFile);
        }

        setLoadingUpdate(true);
        setIsSubmitted(true);
        await dispatch(updateCategory(categoryId, formData));
        setLoadingUpdate(false);
        setIsSubmitted(false);
    };

    const updateCategoryRes = useSelector(state => state.categoryReducer.updateCategory);

    useEffect(() => {
        if (updateCategoryRes && !loadingUpdate) {
            if (updateCategoryRes?.status === 200) {
                toast('Category updated successfully', {type: 'success', toastId: 'updateCategorySuccess'});
                setTimeout(() => {
                    navigate('/admin/categories')
                }, 1000)
            } else {
                toast(updateCategoryRes?.data?.errors ? updateCategoryRes?.data?.errors[0]?.msg : 'Error while updating the category', {
                    type: 'error',
                    toastId: 'updateCategoryError'
                });
            }
        }
    }, [updateCategoryRes, loadingUpdate]);

    return {name, img, handleNameChange, handleSubmit, handleImageChange, loadingUpdate, isSubmitted, loading}
}

export default useUpdateCategory