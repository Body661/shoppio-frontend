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
            return notify("Please enter your name", "error")
            ;
        }
        if (!validator.isEmail(email)) {
            return notify("Please enter a valid email address", "error")
        }
        if (phone.length <= 10) {
            return notify("Please enter a valid phone number", "error")
        }
        if (!validator.isStrongPassword(password)) {
            return notify("Password is not strong enough", "error")
        }
        if (password.trim() !== confirmPassword.trim()) {
            return notify("Password and confirm password are not the same", "error")
        }

        setValidate(true)
    }

    const res = useSelector(state => state.authReducer.createUser)

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
            if (res && res?.status === 201) {
                if (res.data?.token) {
                    localStorage.setItem("token", res.data.token)
                    notify("Account registered successfully", "success")
                    setTimeout(() => {
                        navigate('/login')
                    }, 2000);
                }
            } else if (res?.data?.errors) {
                notify(res?.data?.errors[0]?.msg, "error")
            } else if (res.status === 400) {
                notify("Bad request, please check if all information are correct", "error")
            } else if (res?.status === 429 ) {
                notify("Too many requests, try again after 3 hours", "error")
            } else {
                notify("Error while creating account", "warn")
            }
        }

        setLoading(true)
    }, [loading])

    return [name, email, phone, password, confirmPassword, loading, onChangeName, onChangeEmail, onChangePhone, onChangePassword, onChangeConfirmPassword, OnSubmit]
}

export default RegisterHook