import {useEffect, useState} from 'react';
import {updateSubcategory, getSubcategory} from '../../../redux/actions/SubcategoryActions';
import {useSelector, useDispatch} from 'react-redux';
import {getAllCategories} from '../../../redux/actions/CategoryActions';
import {toast} from 'react-toastify';
import {useNavigate} from "react-router-dom";

const useUpdateSubcategory = (id) => {
    const dispatch = useDispatch();
    const [categoryId, setCategoryId] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(true);
    const [loadingUpdate, setLoadingUpdate] = useState(true);
    const [isPress, setIsPress] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        setLoading(true)
        dispatch(getAllCategories());
        dispatch(getSubcategory(id));
        setLoading(false)
    }, [dispatch, id]);

    const categories = useSelector((state) => state.categoryReducer.categories);
    const subcategory = useSelector((state) => state.subcategoryReducer.subcategory);

    useEffect(() => {
        if (!loading) {
            if (subcategory?.status === 200) {
                setName(subcategory?.data?.data?.name)
                setCategoryId(subcategory?.data?.data?.category?._id)
            }
        }
    }, [loading, subcategory]);

    const handleChange = (e) => {
        setCategoryId(e.target.value);
    };

    const onChangeName = (e) => {
        setName(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!categoryId || categoryId.trim() === '') {
            toast('Please select the main category', {type: 'error'});
            return;
        }

        if (name.trim() === '' || !name) {
            toast('Please add the Subcategory name', {type: 'error'});
            return;
        }

        setLoadingUpdate(true);
        setIsPress(true)
        await dispatch(updateSubcategory(id, {name, category: categoryId}));
        setLoadingUpdate(false);
        setIsPress(false)
    };

    const subcategoryUpdateRes = useSelector((state) => state.subcategoryReducer.updateSubcategory);

    useEffect(() => {
        if (!loadingUpdate) {
            if (subcategoryUpdateRes?.status === 200) {
                toast('Subcategory updated successfully', {type: 'success', toastId: 'updateSubcategorySuccess'});

                setTimeout(() => {
                    navigate("/admin/subcategories");
                }, 1500)
            } else {
                toast(subcategoryUpdateRes?.data?.errors ? subcategoryUpdateRes?.data?.errors[0]?.msg : 'Error while updating Subcategory', {
                    type: 'error',
                    toastId: 'updateSubcategoryError',
                });
            }
        }
    }, [loadingUpdate, subcategoryUpdateRes]);

    return {categoryId, name, loading, categories, handleChange, handleSubmit, onChangeName, isPress, loadingUpdate};
};

export default useUpdateSubcategory;
