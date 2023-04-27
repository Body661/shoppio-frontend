import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import validator from "validator/es";
import {createUser} from "../../../redux/actions/userManagementActions";

export const useAddUser = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const [role, setRole] = useState("user")
    const [phone, setPhone] = useState("")
    const [loading, setLoading] = useState(true)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [validated, setValidated] = useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleChangeName = (e) => {
        setName(e.target.value)
    }
    const handleChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleChangePasswordConfirm = (e) => {
        setPasswordConfirm(e.target.value)
    }
    const handleChangePhone = (e) => {
        setPhone(e.target.value)
    }
    const handleChangeRole = (e) => {
        setRole(e.target.value)
    }

    const validationValues = () => {
        if (name.trim() === '') {
            toast("Please enter user name", {type: 'error'})
            return false;
        }
        if (!validator.isEmail(email)) {
            toast("Please enter a valid email address", {type: 'error'})
            return false;
        }
        if (!validator.isMobilePhone(phone)) {
            toast("Please enter a valid phone number", {type: 'error'})
            return false;
        }
        if (!validator.isStrongPassword(password)) {
            toast("Password is not strong enough", {type: 'error'})
            return false;
        }
        if (password.trim() !== passwordConfirm.trim()) {
            toast("Password and confirm password are not the same", {type: 'error'})
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        if (validationValues()) {
            const form = e.currentTarget;
            if (form.checkValidity() === false) {
                e.preventDefault();
                e.stopPropagation();
            }

            setValidated(true);

            setLoading(true)
            setIsSubmitted(true)
            await dispatch(createUser({
                email,
                password,
                passwordConfirm,
                name,
                role,
                phone
            }))
            setLoading(false)
            setIsSubmitted(false)
        }
    }

    const createRes = useSelector(state => state.userManagementReducer.createUser)

    useEffect(() => {
        if (!loading) {
            if (createRes && createRes?.status === 201) {
                toast("User created successfully", {type: 'success', toastId: 'createUserSuccess'});
                setTimeout(() => {
                    navigate(`/admin/user-management`)
                }, 1500)
            } else {
                toast(createRes?.data?.errors ? createRes?.data?.errors[0]?.msg : "Error while adding user", {
                    type: 'error',
                    toastId: 'createUserError'
                });
            }
        }
    }, [createRes, loading])

    return {
        name,
        email,
        password,
        passwordConfirm,
        phone,
        role,
        handleChangeEmail,
        handleChangePassword,
        handleChangePasswordConfirm,
        handleChangeName,
        handleChangePhone,
        handleChangeRole,
        handleSubmit,
        loading,
        isSubmitted,
        validated
    }
}