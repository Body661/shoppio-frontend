import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUser, updateUser} from "../../../redux/actions/userManagementActions";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import validator from "validator/es";

export const useEditUser = (id) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [role, setRole] = useState("")
    const [phone, setPhone] = useState("")
    const [loadingFetch, setLoadingFetch] = useState(true)
    const [loadingUpdate, setLoadingUpdate] = useState(true)
    const [isPress, setIsPress] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            await dispatch(getUser(id))
            setLoadingFetch(false)
        }

        fetchUserData()
    }, [id])

    const user = useSelector((state) => state.userManagementReducer.user)

    useEffect(() => {
        if (!loadingFetch) {
            if (user && user.status === 200) {
                setName(user?.data?.data?.name)
                setEmail(user?.data?.data?.email)
                setPhone(user?.data?.data?.phone)
                setRole(user?.data?.data?.role)
            } else {
                toast("Something went wrong", {type: "error"})
                setTimeout(() => {
                    navigate("/admin/user-management")
                }, 1500)
            }
        }

    }, [user, loadingFetch])

    const onChangeName = (e) => {
        setName(e.target.value)
    }
    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }
    const onChangePhone = (e) => {
        setPhone(e.target.value)
    }
    const onChangeRole = (e) => {
        setRole(e.target.value)
    }

    const handleSubmit = async (e) => {

        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }

        setValidated(true);

        if (name.trim() === "" || email.trim() === "" || phone.trim() === "" || role.trim() === "") {
            toast("Please fill in all information", {type: "error"})
            return
        }

        if (!validator.isEmail(email)) {
            toast("Email address is not valid", {type: "error"})
            return
        }

        if (!validator.isMobilePhone(phone)) {
            toast("Phone number is not valid", {type: "error"})
            return
        }

        setLoadingUpdate(true)
        setIsPress(true)
        await dispatch(updateUser(id, {
            email,
            name,
            role,
            phone
        }))
        setLoadingUpdate(false)
        setIsPress(false)
    }

    const updateRes = useSelector(state => state.userManagementReducer.updateUser)

    useEffect(() => {
        if (!loadingUpdate) {
            if (updateRes && updateRes?.status === 200) {
                toast("User updated successfully", {type: 'success', toastId: 'updateUserSuccess'});
                setTimeout(() => {
                    window.location.reload()
                }, 1500)
            } else {
                toast(updateRes?.data?.errors ? updateRes?.data?.errors[0]?.msg : "Error while updating user", {
                    type: 'error',
                    toastId: 'updateUserError'
                });
            }
        }
    }, [updateRes, loadingUpdate])

    return {user, name, email, phone, role, onChangeEmail, onChangeName, onChangePhone, onChangeRole, handleSubmit, loadingFetch, loadingUpdate, isPress, validated}
}