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
        if (password.trim() !== confirmPassword.trim()) {
            toast("Password and confirm password are not the same", {type: 'error'})
            return false;
        }

        return true;
    };


    //save data
    const onSubmit = async () => {
        if (validationValues()) {
            setIsPress(true);

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
            setIsPress(false);
        }
    };
    const res = useSelector((state) => state.authReducer.createUser);

    useEffect(() => {
        if (loading === false) {
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

        setLoading(true);
    }, [loading, res]);

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
        isPress
    };
};

export default useRegister;
