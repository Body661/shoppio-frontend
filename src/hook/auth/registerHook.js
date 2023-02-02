import {useState, useEffect} from 'react'
import notify from '../useNotification';
import {useDispatch, useSelector} from 'react-redux';
import {createNewUser} from '../../redux/actions/authActions';
import {useNavigate} from 'react-router-dom'
import validator from "validator/es";

const RegisterHook = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [validate, setValidate] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState('')

    const onChangeName = (e) => {
        setName(e.target.value)
    }
    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }
    const onChangePhone = (e) => {
        setPhone(e.target.value)
    }
    const onChangePassword = (e) => {
        setPassword(e.target.value)
    }
    const onChangeConfirmPassword = (e) => {
        setConfirmPassword(e.target.value)
    }

    const validationValues = () => {
        if (name.trim() === "") {
            notify("Please enter your name", "error")
            return;
        }
        if (!validator.isEmail(email)) {
            notify("Please enter a valid email address", "error")
            return;
        }
        if (phone.length <= 10) {
            notify("Please enter a valid phone number", "error")
            return;
        }
        if (!validator.isStrongPassword(password)) {
            notify("Password is not strong enough", "error")
        }
        if (password.trim() !== confirmPassword.trim()) {
            notify("Password and confirm password are not the same", "error")
        }

        setValidate(true)
    }

    const res = useSelector(state => state.authReducer.createUser)
    const error = useSelector(state => state.authReducer.error)
    //save data
    const OnSubmit = async () => {
        validationValues();

        if (validate) {
            await dispatch(createNewUser({
                name,
                email,
                password,
                passwordConfirm: confirmPassword,
                phone
            }))
            setLoading(false)
        }
    }

    useEffect(() => {
        if (loading === false) {
            if (res) {
                if (res.data?.token) {
                    localStorage.setItem("token", res.data.token)
                    notify("Account registered successfully", "success")
                    setTimeout(() => {
                        navigate('/login')
                    }, 2000);
                }
            }

            if (error) {
                if (error.data.errors) {
                    if (error.data.errors[0]?.msg === "Email address is already in use") notify("Email already exists", "error")
                }
                if (error.data.errors) {
                    if (error.data.errors[0]?.msg === "Phone number is not valid") notify("Phone number is not valid", "error")
                }

                if (error.data.errors) {
                    if (error.data.errors[0]?.msg === "Password is not strong enough") notify("Password must be at least 7 characters and contains letters, numbers and special characters", "error")
                }

                if (error.status === 400) {
                    notify("Bad request, please check if all information are correct", "error")
                }
            }
        }

        setLoading(true)
    }, [loading])

    return [name, email, phone, password, confirmPassword, loading, onChangeName, onChangeEmail, onChangePhone, onChangePassword, onChangeConfirmPassword, OnSubmit]
}

export default RegisterHook