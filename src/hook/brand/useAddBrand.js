import {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {createBrand} from '../../redux/actions/BrandActions';
import 'react-toastify/dist/ReactToastify.css';
import notify from '../../hook/useNotification';
import avatar from '../../images/avatar.png';

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

    const handleSubmit = async () => {
        console.log(432434)
        if (!name.trim() || !selectedFile) {
            notify('Please fill in all required information', 'warn');
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

    const brands = useSelector((state) => state.allBrands.createBrand);

    useEffect(() => {
        if (loading === false && isPress) {
            setImg(avatar);
            setName('');
            setSelectedFile(null);
            setIsPress(false);

            if (brands && brands.status === 201) {
                notify('Brand added successfully', 'success');
            } else if (brands?.data?.errors) {
                notify(brands?.data?.errors[0].msg, 'error');
            } else {
                notify('Error while adding the brand', 'error');
            }
        }
    }, [loading]);

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
