import {useState, useEffect} from 'react'
import notify from '../useNotification';
import {useDispatch, useSelector} from 'react-redux';
import {loginUser} from '../../redux/actions/authActions';

const LoginHook = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(true)
    const [isPress, setIsPress] = useState(false)
    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const onSubmit = async () => {
        setIsPress(true)
        setLoading(true)
        await dispatch(loginUser({

            email,
            password
        }))

        setLoading(false)
        setIsPress(false)
    }
    const res = useSelector(state => state.authReducer.loginUser)
    const error = useSelector(state => state.authReducer.error)
    useEffect(() => {
        if (loading === false) {
            if (res) {
                if (res.data?.token) {
                    localStorage.setItem("token", res.data.token)
                    localStorage.setItem("user", JSON.stringify(res.data.data))
                    notify("Logged in successfully", "success")
                    setTimeout(() => {
                        window.location.href = "/"
                    }, 1500);
                } else {
                    localStorage.removeItem("token")
                    localStorage.removeItem("user")
                }
                setLoading(true)
            }

            if (error) {
                if (error.status === 401) {
                    localStorage.removeItem("token")
                    localStorage.removeItem("user")
                    notify("Email or password is wrong", "error")
                } else if (error?.data?.errors) {
                    localStorage.removeItem("token")
                    localStorage.removeItem("user")
                    notify(error?.data?.errors[0].msg, "error")
                } else {
                    notify("Error while logging in!", "warn")
                }
            }
        }
    }, [loading])

    return [email, password, loading, onChangeEmail, onChangePassword, onSubmit, isPress]
}

export default LoginHook