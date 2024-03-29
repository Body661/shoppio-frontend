import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {forgotPassword} from '../../redux/actions/authActions';
import {useNavigate} from 'react-router-dom';
import validator from 'validator/es';
import {toast} from "react-toastify";

const useForgotPassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(true);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [validated, setValidated] = useState(false);

    const handleChangeEmail = (e) => setEmail(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
        }

        setValidated(true);

        if (!validator.isEmail(email)) {
            toast("Please enter a valid email", {type: 'error'})
            return;
        }

        localStorage.setItem('user-email', email);
        setIsSubmitted(true)
        await dispatch(forgotPassword({email}));
        setLoading(false);
        setIsSubmitted(false)
    };

    const res = useSelector((state) => state.authReducer.forgotPassword);

    useEffect(() => {
        if (!loading) {
            if (res && res?.status === 200) {
                toast("Reset password code sent to your email successfully", {type: 'success'})
                setTimeout(() => {
                    navigate('/user/verify-code');
                }, 1000);
            } else if (res?.status === 400) {
                toast("Email doesn't exist", {type: 'error', toastId: 'forgotEmailNotExist'})
                localStorage.removeItem('user-email');
            } else if (res?.status === 429) {
                toast("Too many requests, try again after 1 hour", {type: 'error', toastId: 'forgotManyReqs'})
            } else {
                toast(res?.data?.errors ? res?.data?.errors?.[0]?.msg : 'Something went wrong, try again later', {
                    type: 'error',
                    toastId: 'forgotAnother'
                })
            }
        }
    }, [loading, res]);

    return {email, handleChangeEmail, handleSubmit, loading, isSubmitted, validated};
};

export default useForgotPassword;