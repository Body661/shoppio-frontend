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
        console.log(email)
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
    const error = useSelector(state => state.authReducer.error)

    useEffect(() => {
        if (loading === false) {
            console.log(res)
            console.log(error)

            if (res) {
                if (res.status === 200) {
                    notify("Reset password code sent to your email successfully", "success")
                    setTimeout(() => {
                        navigate("/user/verify-code")
                    }, 1000);
                }
            }

            if (error) {
                if (error.status === 400) {
                    notify("Email not exists", "error")
                    localStorage.removeItem("user-email")
                }
            }
        }
    }, [loading])

    return [OnChangeEmail, email, onSubmit]
}

export default ForgetPasswordHook