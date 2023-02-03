import {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {createCategory} from '../../redux/actions/CategoryAction'
import 'react-toastify/dist/ReactToastify.css';
import notify from '../../hook/useNotification'
import avatar from '../../images/avatar.png'

const AddCategoryHook = () => {

    const dispatch = useDispatch();
    const [img, setImg] = useState(avatar)
    const [name, setName] = useState('')
    const [selectedFile, setSelectedFile] = useState('')
    const [loading, setLoading] = useState(true)
    const [isPress, setIsPress] = useState(false)

    //to change name state
    const onChangeName = (event) => {
        event.persist();
        setName(event.target.value)
    }

    //when image change save it
    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImg(URL.createObjectURL(event.target.files[0]))
            setSelectedFile(event.target.files[0])
        }
    }
    const res = useSelector(state => state.allCategories.categories)
    const error = useSelector(state => state.allCategories.error)

    //save data in database
    const handelSubmit = async (event) => {
        event.preventDefault();
        if (name?.trim() === "" || selectedFile === null) {
            notify('Please fill in all required information', "warn");
            return;
        }
        const formData = new FormData();
        formData.append("name", name)
        formData.append("img", selectedFile)

        setLoading(true)
        setIsPress(true)


        await dispatch(createCategory(formData))
        setLoading(false)
    }

    useEffect(() => {
        if (loading === false) {
            setImg(avatar)
            setName("")
            setSelectedFile(null)
            setLoading(true)
            setTimeout(() => setIsPress(false), 1000)

            if (res) {
                if (res.status === 201) {
                    notify('Category added successfully', "success");
                }
            }

            if (error) {
                if (error.status === 401) {
                    notify('You are not legged please login', "error");
                } else if (error.status === 400) {
                    notify("Category name already exists", "error");
                } else {
                    notify("Error while adding the new category", "error")
                }
            }
        }
    }, [loading])

    return [img, name, loading, isPress, handelSubmit, onImageChange, onChangeName]
};

export default AddCategoryHook