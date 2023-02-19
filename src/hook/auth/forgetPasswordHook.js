import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {forgetPassword} from '../../redux/actions/authActions';
import {useNavigate} from 'react-router-dom'
import notify from '../useNotification';
import validator from "validator/es";

const ForgetPasswordHook = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(true)

    const OnChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const onSubmit = async () => {
        if (!validator.isEmail(email)) {
            notify("Please enter a valid email", "error")
            return
        }
        localStorage.setItem("user-email", email)
        setLoading(true)
        await dispatch(forgetPassword({
            email,
        }))
        setLoading(false)
    }

    const res = useSelector(state => state.authReducer.forgetPassword)

    useEffect(() => {
        if (loading === false) {

            if (res?.status === 200) {
                notify("Reset password code sent to your email successfully", "success")
                setTimeout(() => {
                    navigate("/user/verify-code")
                }, 1000);
            } else if (res?.data?.errors) {
                notify(res?.data?.errors[0]?.msg, "error")
            } else if (res?.status === 400) {
                notify("Email not exists", "error")
                localStorage.removeItem("user-email")
            } else if (res?.status === 429 ) {
                notify("Too many requests, try again after 1 hour", "error")
            } else {
                notify("Something went wrong, try again later", "error")
            }

        }
    }, [loading])

    return [OnChangeEmail, email, onSubmit]
}

export default ForgetPasswordHook