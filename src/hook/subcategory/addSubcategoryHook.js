import {useEffect, useState} from 'react';
import {createSubcategory} from '../../redux/actions/SubcategoryActions'
import {useSelector, useDispatch} from 'react-redux'
import notify from '../../hook/useNotification'
import {getAllCategories} from '../../redux/actions/CategoryAction'

const AddSubcategoryHook = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        if (!navigator.onLine) {
            notify("Internet connection error", "warn")
            return;
        }
        dispatch(getAllCategories());
    }, [])

    const [id, setID] = useState(0)
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(true)

    const category = useSelector(state => state.allCategories.categories)

    const subcategory = useSelector(state => state.subcategory.subcategory)

    //on change dropdown menu
    const handelChange = (e) => {
        setID(e.target.value)
    }

    //to save name
    const onChangeName = (e) => {
        e.persist();
        setName(e.target.value)
    }
    //on save data
    const handelSubmit = async (e) => {
        e.preventDefault();
        if (!navigator.onLine) {
            notify("Internet connection error", "error")
            return;
        }
        if (!id || id.trim() === "") {
            notify("Please add the main category", "warn")
            return;
        }
        if (name.trim() === "" || !name) {
            notify("Please add the subcategory name", "warn")
            return;
        }

        setLoading(true)
        await dispatch(createSubcategory({
            name,
            category: id
        }))
        setLoading(false)

    }
    useEffect(() => {

        if (loading === false) {
            setName("")
            setID(0)

            if (subcategory.status === 201) {
                notify("Subcategory added successfully", "success")
            } else if (subcategory === "Error Error: Request failed with status code 400") {
                notify("Subcategory name already exists", "error")
            } else {
                notify("Error while adding the new category", "error")
            }

            setLoading(true)
        }
    }, [loading, subcategory])


    return [id, name, loading, category, subcategory, handelChange, handelSubmit, onChangeName]
};

export default AddSubcategoryHook;