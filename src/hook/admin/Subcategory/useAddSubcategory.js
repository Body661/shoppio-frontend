import {useEffect, useState} from 'react';
import {createSubcategory} from '../../../redux/actions/SubcategoryActions';
import {useSelector, useDispatch} from 'react-redux';
import {getAllCategories} from '../../../redux/actions/CategoryActions';
import {toast} from 'react-toastify';
import {useNavigate} from "react-router-dom";

const useAddSubcategory = () => {
    const dispatch = useDispatch();
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(true);
    const [isPress, setIsPress] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getAllCategories());
    }, [dispatch]);

    const categories = useSelector((state) => state.categoryReducer.categories);

    const handleChange = (e) => {
        setId(e.target.value);
    };

    const onChangeName = (e) => {
        setName(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!id || id.trim() === '') {
            toast('Please select the main category', {type: 'error'});
            return;
        }

        if (name.trim() === '' || !name) {
            toast('Please add the Subcategory name', {type: 'error'});
            return;
        }

        setLoading(true);
        setIsPress(true)
        await dispatch(createSubcategory({name, categoryId: id}));
        setLoading(false);
        setIsPress(false)
    };

    const subcategory = useSelector((state) => state.subcategoryReducer.createSubcategory);

    useEffect(() => {
        if (!loading) {
            if (subcategory?.status === 201) {
                toast('Subcategory added successfully', {type: 'success', toastId: 'addSubcategorySuccess'});

                setTimeout(() => {
                    navigate("/admin/subcategories");
                }, 1500)
            } else {
                toast(subcategory?.data?.errors ? subcategory?.data?.errors[0]?.msg : 'Error while adding Subcategory', {
                    type: 'error',
                    toastId: 'addSubcategoryError',
                });
            }
        }
    }, [loading, subcategory]);

    return {id, name, loading, categories, subcategory, handleChange, handleSubmit, onChangeName, isPress};
};

export default useAddSubcategory;
