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
    const error = useSelector(state => state.authReducer.error)

    useEffect(() => {
        if (loading === false) {
            if (res) {
                if (res.status === 200) {
                    notify("Password reset successfully", "success")
                    setTimeout(() => {
                        navigate("/login")
                    }, 1500);
                }
            }

            if (error) {
                if (error.status !== 200) {
                    notify("Something went wrong, please request a new code", "error")
                }
            }
        }
    }, [loading])

    return [password, confirmPassword, OnChangePassword, OnChangeConfirmPassword, onSubmit]
}

export default ResetPasswordHook