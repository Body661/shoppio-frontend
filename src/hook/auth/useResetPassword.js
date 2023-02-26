import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {resetPassword} from '../../redux/actions/authActions';
import {useNavigate} from 'react-router-dom';
import notify from '../useNotification';
import validator from 'validator/es';

const useResetPassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState(localStorage.getItem('user-email'));

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const onChangeConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    };

    const onSubmit = async () => {
        if (!validator.isStrongPassword(password)) {
            notify('Please enter a strong password', 'error');
            return;
        }

        if (password !== confirmPassword) {
            notify('Password and confirm password do not match', 'error');
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
                notify('Password reset successfully', 'success');
                setTimeout(() => {
                    navigate('/login');
                }, 1500);
            } else if (res?.status === 429) {
                notify('Too many requests, try again after 1 hour', 'error');
            } else {
                notify('Something went wrong, please request a new code', 'error');
            }
        }
        setLoading(true);
    }, [loading]);

    return {
        password,
        confirmPassword,
        onChangePassword,
        onChangeConfirmPassword,
        onSubmit,
        loading,
    };
};

export default useResetPassword;