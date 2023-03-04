import {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {createCategory} from '../../redux/actions/CategoryActions';
import 'react-toastify/dist/ReactToastify.css';
import notify from '../../hook/useNotification';
import avatar from '../../images/avatar.png';

const useAddCategory = () => {
    const dispatch = useDispatch();
    const [img, setImg] = useState(avatar);
    const [name, setName] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isPress, setIsPress] = useState(false);

    const handleNameChange = event => setName(event.target.value);

    const handleImageChange = event => {
        if (event.target.files && event.target.files[0]) {
            setImg(URL.createObjectURL(event.target.files[0]));
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleSubmit = async event => {
        event.preventDefault();

        if (!name.trim() || !selectedFile) {
            notify('Please fill in all required information', 'warn');
            return;
        }


        const formData = new FormData();
        formData.append('name', name);
        formData.append('img', selectedFile);

        setLoading(true);
        setIsPress(true);
        await dispatch(createCategory(formData));
        setLoading(false);
        setIsPress(false);
    };

    const addCategoryRes = useSelector(state => state.allCategories.createCategory);

    useEffect(() => {
        if (addCategoryRes && !loading) {
            if (addCategoryRes.status === 201) {
                notify('Category added successfully', 'success');
                setImg(avatar);
                setName('');
                setSelectedFile(null);
            } else if (addCategoryRes.status === 401) {
                notify('You are not logged in. Please login', 'error');
            } else if (addCategoryRes?.data?.errors) {
                notify(addCategoryRes?.data?.errors[0]?.msg, 'error');
            } else {
                notify('Error while adding the new category', 'error');
            }
        }
    }, [addCategoryRes, loading]);

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

export default useAddCategory;