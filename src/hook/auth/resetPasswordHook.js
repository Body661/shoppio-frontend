import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {resetPassword} from '../../redux/actions/authActions';
import {useNavigate} from 'react-router-dom'
import notify from '../useNotification';
import validator from "validator/es";

const ResetPasswordHook = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(true)

    const OnChangePassword = (e) => {
        setPassword(e.target.value)
    }
    const OnChangeConfirmPassword = (e) => {
        setConfirmPassword(e.target.value)
    }
    const onSubmit = async () => {
        if (!validator.isStrongPassword(password)) {
            notify("Please enter your password", "error")
            return
        }
        if (password !== confirmPassword) {
            notify("Password and confirm password are not the same", "error")
            return
        }

        setLoading(true)
        await dispatch(resetPassword({
            email: localStorage.getItem("user-email"),
            password: password
        }))
        setLoading(false)
    }

    const res = useSelector(state => state.authReducer.verifyPassword)

    useEffect(() => {
        if (loading === false) {
            if (res && res?.status === 200) {
                notify("Password reset successfully", "success")
                setTimeout(() => {
                    navigate("/login")
                }, 1500);
            } else if (res?.status === 429) {
                notify("Too many requests, try again after 1 hour", "error")
            } else if (res?.status !== 200 && res?.status !== 429) {
                notify("Something went wrong, please request a new code", "error")
            }

        }
    }, [loading])

    return [password, confirmPassword, OnChangePassword, OnChangeConfirmPassword, onSubmit]
}

export default ResetPasswordHook