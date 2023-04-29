import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {verifyPassword} from '../../redux/actions/authActions';
import {useNavigate} from 'react-router-dom';
import validator from 'validator/es';
import {toast} from "react-toastify";

const useVerifyPassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(true);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [validated, setValidated] = useState(false);

    const handleChangeCode = (e) => {
        setCode(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
        }

        setValidated(true);

        if (!validator.isNumeric(code) || code?.length > 6) {
            toast("Please enter a valid code", {type: 'error'})
            return;
        }

        setLoading(true);
        setIsSubmitted(true)
        await dispatch(verifyPassword({code}));
        setLoading(false);
        setIsSubmitted(false)
    };

    const res = useSelector((state) => state.authReducer.verifyPassword);

    useEffect(() => {
        if (loading === false) {
            if (res && res.status === 200) {
                toast('Code is correct', {type: 'success'})
                setTimeout(() => {
                    navigate('/user/reset-password');
                }, 1500);
            } else if (res?.status === 400) {
                toast('Code is wrong or expired', {type: 'error', toastId: 'verifyWrongCode'})
            } else {
                toast(res?.data?.errors ? res?.data?.errors[0].msg : 'Something went wrong, please try again later.', {
                    type: 'error',
                    toastId: 'verifyAnother'
                })
            }
        }
    }, [loading, res]);

    return {code, handleChangeCode, handleSubmit, validated, loading, isSubmitted};
};

export default useVerifyPassword;
