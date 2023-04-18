import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {createNewUser} from '../../redux/actions/authActions';
import {useNavigate} from 'react-router-dom';
import validator from 'validator/es';
import {toast} from "react-toastify";

const useRegister = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [isPress, setIsPress] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [validated, setValidated] = useState(false);

    const handleChangeName = (e) => {
        setName(e.target.value);
    };
    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    };
    const handleChangePhone = (e) => {
        setPhone(e.target.value);
    };
    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    };
    const handleChangePasswordConfirm = (e) => {
        setPasswordConfirm(e.target.value);
    };

    const validationValues = () => {
        if (name.trim() === '') {
            toast("Please enter your name", {type: 'error'})
            return false;
        }
        if (!validator.isEmail(email)) {
            toast("Please enter a valid email address", {type: 'error'})
            return false;
        }
        if (!validator.isMobilePhone(phone)) {
            toast("Please enter a valid phone number", {type: 'error'})
            return false;
        }
        if (!validator.isStrongPassword(password)) {
            toast("Password is not strong enough", {type: 'error'})
            return false;
        }
        if (password.trim() !== passwordConfirm.trim()) {
            toast("Password and confirm password are not the same", {type: 'error'})
            return false;
        }

        return true;
    };


    const handleRegister = async (e) => {
        e.preventDefault();

        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
        }

        setValidated(true);

        if (validationValues()) {
            setIsPress(true);

            await dispatch(
                createNewUser({
                    name,
                    email,
                    password,
                    passwordConfirm,
                    phone,
                })
            );
            setLoading(false);
            setIsPress(false);
        }
    };
    const res = useSelector((state) => state.authReducer.createUser);

    useEffect(() => {
        if (!loading) {
            if (res && res?.status === 201) {
                toast("Account created successfully", {type: 'success'})
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } else if (res?.status === 429) {
                toast('Too many requests, try again after 3 hours', {type: 'error', toastId: 'registerTooManyReqs'})
            } else {
                toast(res?.data?.errors ? res?.data?.errors[0]?.msg : 'Error while creating account', {
                    type: 'error',
                    toastId: 'registerAnother'
                })
            }
        }
    }, [loading, res]);

    return {
        name,
        email,
        phone,
        password,
        passwordConfirm,
        loading,
        handleChangeName,
        handleChangeEmail,
        handleChangePhone,
        handleChangePassword,
        handleChangePasswordConfirm,
        handleRegister,
        isPress,
        validated
    };
};

export default useRegister;
