import {useState, useEffect} from 'react';
import notify from '../useNotification';
import {useDispatch, useSelector} from 'react-redux';
import {createNewUser} from '../../redux/actions/authActions';
import {useNavigate} from 'react-router-dom';
import validator from 'validator/es';

const useRegister = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const onChangeName = (e) => {
        setName(e.target.value);
    };
    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    };
    const onChangePhone = (e) => {
        setPhone(e.target.value);
    };
    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };
    const onChangeConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    };

    const validationValues = () => {
        if (name.trim() === '') {
            notify('Please enter your name', 'error');
            return false;
        }
        if (!validator.isEmail(email)) {
            notify('Please enter a valid email address', 'error');
            return false;
        }
        if (phone.length <= 10) {
            notify('Please enter a valid phone number', 'error');
            return false;
        }
        if (!validator.isStrongPassword(password)) {
            notify('Password is not strong enough', 'error');
            return false;
        }
        if (password.trim() !== confirmPassword.trim()) {
            notify('Password and confirm password are not the same', 'error');
            return false;
        }

        return true;
    };


    //save data
    const onSubmit = async () => {
        if (validationValues()) {
            await dispatch(
                createNewUser({
                    name,
                    email,
                    password,
                    passwordConfirm: confirmPassword,
                    phone,
                })
            );
            setLoading(false);
        }
    };
    const res = useSelector((state) => state.authReducer.createUser);

    useEffect(() => {
        if (loading === false) {
            if (res && res.status === 201) {
                if (res.data?.data?.token) {
                    localStorage.setItem('token', res.data.data.token);
                    notify('Account registered successfully', 'success');
                    setTimeout(() => {
                        navigate('/login');
                    }, 2000);
                }
            } else if (res?.data?.errors) {
                notify(res.data.errors[0].msg, 'error');
            } else if (res?.status === 400) {
                notify(
                    'Bad request, please check if all information are correct',
                    'error'
                );
            } else if (res?.status === 429) {
                notify('Too many requests, try again after 3 hours', 'error');
            } else {
                notify('Error while creating account', 'warn');
            }
        }

        setLoading(true);
    }, [loading]);

    return {
        name,
        email,
        phone,
        password,
        confirmPassword,
        loading,
        onChangeName,
        onChangeEmail,
        onChangePhone,
        onChangePassword,
        onChangeConfirmPassword,
        onSubmit,
    };
};

export default useRegister;
