import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {resetPassword} from '../../redux/actions/authActions';
import {useNavigate} from 'react-router-dom';
import validator from 'validator/es';
import {toast} from "react-toastify";

const useResetPassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState(localStorage.getItem('user-email'));
    const [validated, setValidated] = useState(false);

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleChangePasswordConfirm = (e) => {
        setPasswordConfirm(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
        }

        setValidated(true);

        if (!validator.isStrongPassword(password)) {
            toast("Please enter a strong password", {type: 'error'})
            return;
        }

        if (password !== passwordConfirm) {
            toast("Password and confirm password do not match", {type: 'error'})
            return;
        }

        setLoading(true);
        await dispatch(resetPassword({email, password}));
        setLoading(false);
    };
    const res = useSelector((state) => state.authReducer.resetPassword);

    useEffect(() => {
        if (!loading) {
            if (res?.status === 200) {
                toast("Password reset successfully", {type: 'success'})
                setTimeout(() => {
                    navigate('/login');
                }, 1500);
            } else if (res?.status === 429) {
                toast("Too many requests, try again after 1 hour", {type: 'error', toastId: 'resetPassManyReqs'})
            } else {
                toast(res?.data?.errors ? res?.data?.errors[0]?.msg : "Something went wrong, please request a new code", {
                    type: 'error',
                    toastId: 'resetPassAnother'
                })
            }
        }
        setLoading(true);
    }, [loading]);

    return {
        password,
        passwordConfirm,
        handleChangePassword,
        handleChangePasswordConfirm,
        handleSubmit,
        loading,
        validated
    };
};

export default useResetPassword;