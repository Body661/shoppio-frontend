import { useEffect, useState } from 'react';
import { createSubcategory } from '../../../redux/actions/SubcategoryActions';
import { useSelector, useDispatch } from 'react-redux';
import { getAllCategories } from '../../../redux/actions/CategoryActions';
import { toast } from 'react-toastify';
import subcategoryReducer from "../../../redux/reducers/subcategoryReducer";

const useAddSubcategory = () => {
    const dispatch = useDispatch();
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        dispatch(getAllCategories());
    }, [dispatch]);

    const category = useSelector((state) => state.categoryReducer.categories);

    const handleChange = (e) => {
        setId(e.target.value);
    };

    const onChangeName = (e) => {
        setName(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!id || id.trim() === '') {
            toast('Please select the main category', { type: 'error' });
            return;
        }

        if (name.trim() === '' || !name) {
            toast('Please add the Subcategory name', { type: 'error' });
            return;
        }

        setLoading(true);
        await dispatch(createSubcategory({ name, categoryId: id }));
        setLoading(false);
    };

    const subcategory = useSelector((state) => state.subcategoryReducer.subcategory);

    useEffect(() => {
        if (!loading) {
            if (subcategory.status === 201) {
                toast('Subcategory added successfully', { type: 'success', toastId: 'addSubcategorySuccess' });
            } else {
                toast( subcategory?.data?.errors ? subcategory?.data?.errors[0]?.msg : 'Error while adding Subcategory', {
                    type: 'error',
                    toastId: 'addSubcategoryError',
                });
            }

            setName('');
            setId('');
        }
    }, [loading, subcategory]);

    return { id, name, loading, category, subcategory, handleChange, handleSubmit, onChangeName };
};

export default useAddSubcategory;
