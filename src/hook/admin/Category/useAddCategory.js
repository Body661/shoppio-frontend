import {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {createCategory} from '../../../redux/actions/CategoryActions';
import addImg from '../../../images/Icons/addImg.png';
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

const useAddCategory = () => {
    const dispatch = useDispatch();
    const [img, setImg] = useState(addImg);
    const [name, setName] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const navigate = useNavigate()

    const handleNameChange = event => setName(event.target.value);

    const handleImageChange = event => {
        if (event.target.files && event.target.files[0]) {
            setImg(URL.createObjectURL(event.target.files[0]));
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleSubmit = async event => {
        event.preventDefault();

        if (!name.trim()) {
            toast('Category name', {type: 'error'})
            return;
        }

        if (!selectedFile) {
            toast('Category image is required', {type: 'error'})
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('img', selectedFile);

        setLoading(true);
        setIsSubmitted(true);
        await dispatch(createCategory(formData));
        setLoading(false);
        setIsSubmitted(false);
    };

    const addCategoryRes = useSelector(state => state.categoryReducer.createCategory);

    useEffect(() => {
        if (addCategoryRes && !loading) {
            if (addCategoryRes.status === 201) {
                toast('Category added successfully', {type: 'success', toastId: 'addCategorySuccess'});
                setTimeout(() => {
                    navigate('/admin/categories')
                }, 1500)
            } else {
                toast(addCategoryRes?.data?.errors ? addCategoryRes?.data?.errors[0]?.msg : 'Error while adding the new category', {
                    type: 'error',
                    toastId: 'addCategoryError'
                });
            }
        }
    }, [addCategoryRes, loading, navigate]);

    return {
        img,
        name,
        loading,
        isSubmitted,
        handleNameChange,
        handleImageChange,
        handleSubmit,
    };
};

export default useAddCategory;