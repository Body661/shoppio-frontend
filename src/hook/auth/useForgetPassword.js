import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {forgetPassword} from '../../redux/actions/authActions';
import {useNavigate} from 'react-router-dom';
import validator from 'validator/es';
import {toast} from "react-toastify";

const useForgetPassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(true);
    const [isPress, setIsPress] = useState(false);

    const onChangeEmail = (e) => setEmail(e.target.value);

    const onSubmit = async () => {
        if (!validator.isEmail(email)) {
            toast("Please enter a valid email", {type: 'error'})
            return;
        }

        localStorage.setItem('user-email', email);
        setIsPress(true)
        await dispatch(forgetPassword({email}));
        setLoading(false);
        setIsPress(false)
    };

    const res = useSelector((state) => state.authReducer.forgetPassword);

    useEffect(() => {
        if (!loading) {
            if (res && res?.status === 200) {
                toast("Reset password code sent to your email successfully", {type: 'success'})
                setTimeout(() => {
                    navigate('/user/verify-code');
                }, 1000);
            } else if (res?.status === 400) {
                toast("Email doesn't exist", {type: 'error', toastId: 'forgetEmailNotExist'})
                localStorage.removeItem('user-email');
            } else if (res?.status === 429) {
                toast("Too many requests, try again after 1 hour", {type: 'error', toastId: 'forgetManyReqs'})
            } else {
                toast(res?.data?.errors ? res?.data?.errors?.[0]?.msg : 'Something went wrong, try again later', {
                    type: 'error',
                    toastId: 'forgetAnother'
                })
            }
        }
    }, [loading, res]);

    return {email, onChangeEmail, onSubmit, loading, isPress};
};

export default useForgetPassword;