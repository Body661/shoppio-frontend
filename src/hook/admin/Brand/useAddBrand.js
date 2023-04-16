import {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {createBrand} from '../../../redux/actions/BrandActions';
import avatar from '../../../images/avatar.png';
import {toast} from "react-toastify";

const useAddBrand = () => {
    const dispatch = useDispatch();
    const [img, setImg] = useState(avatar);
    const [name, setName] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isPress, setIsPress] = useState(false);

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
        setIsPress(true);
        await dispatch(createBrand(formData));
        setLoading(false);
    };

    const addBranRes = useSelector((state) => state.brandReducer.createBrand);

    useEffect(() => {
        if (loading === false && isPress) {
            setImg(avatar);
            setName('');
            setSelectedFile(null);
            setIsPress(false);

            if (addBranRes?.status === 201) {
                toast('Brand added successfully', {type: 'success', toastId: 'brandAdded'})
                setTimeout(() => {
                    window.location.reload();
                }, 1000)
            } else {
                toast(addBranRes?.data?.errors ? addBranRes?.data?.errors[0]?.msg : 'Error while adding the brand', {
                    type: 'error',
                    toastId: 'addBrandAnother'
                })
            }
        }
    }, [loading, addBranRes, isPress]);

    return {
        img,
        name,
        loading,
        isPress,
        handleNameChange,
        handleImageChange,
        handleSubmit,
    };
};

export default useAddBrand;
