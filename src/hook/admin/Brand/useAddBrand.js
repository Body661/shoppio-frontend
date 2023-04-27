import {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {createBrand} from '../../../redux/actions/BrandActions';
import addImg from '../../../images/Icons/addImg.png';
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

const useAddBrand = () => {
    const dispatch = useDispatch();
    const [img, setImg] = useState(addImg);
    const [name, setName] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const navigate = useNavigate()

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImg(URL.createObjectURL(file));
            setSelectedFile(file);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (name.trim() === "" || !selectedFile) {
            toast('Please fill in all required information', {type: 'error'})
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('img', selectedFile);

        setLoading(true);
        setIsSubmitted(true);
        await dispatch(createBrand(formData));
        setLoading(false);
    };

    const addBranRes = useSelector((state) => state.brandReducer.createBrand);

    useEffect(() => {
        if (loading === false && isSubmitted) {
            if (addBranRes?.status === 201) {
                toast('Brand added successfully', {type: 'success', toastId: 'brandAdded'})
                setTimeout(() => {
                    navigate('/admin/brands')
                }, 1500)
            } else {
                toast(addBranRes?.data?.errors ? addBranRes?.data?.errors[0]?.msg : 'Error while adding the brand', {
                    type: 'error',
                    toastId: 'addBrandAnother'
                })
            }
        }
    }, [loading, addBranRes, isSubmitted]);

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

export default useAddBrand;
