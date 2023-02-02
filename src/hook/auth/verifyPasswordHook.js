import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {verifyPassword} from '../../redux/actions/authActions';
import {useNavigate} from 'react-router-dom'
import notify from '../useNotification';


const VerifyPasswordHook = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [code, setCode] = useState('')
    const [loading, setLoading] = useState(true)


    const OnChangeCode = (e) => {
        setCode(e.target.value)
    }

    const onSubmit = async () => {
        if (code.trim() === "") {
            notify("Please enter reset code", "error")
            return
        }
        setLoading(true)
        await dispatch(verifyPassword({
            code: code
        }))
        setLoading(false)
    }

    const res = useSelector(state => state.authReducer.verifyPassword)
    const error = useSelector(state => state.authReducer.error)

    useEffect(() => {
        if (loading === false) {
            console.log(res)
            console.log(error)

            if (res) {
                console.log(res)
                if (res.status === 200) {
                    notify("Code is correct", "success")
                    setTimeout(() => {
                        navigate("/user/reset-password")
                    }, 1500);
                }
            }

            if (error) {
                if (error.status === 400) {
                    notify("Code is wrong or expired", "error")
                }
            }
        }
    }, [loading])

    return [code, OnChangeCode, onSubmit]
}

export default VerifyPasswordHook