import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {loginUser} from '../../redux/actions/authActions';
import {toast} from "react-toastify";
import isEmail from "validator/es/lib/isEmail";

const useLogin = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(true);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [validated, setValidated] = useState(false);

    const handleEmailChange = (event) => setEmail(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);

    const handleLogin = async (e) => {
        e.preventDefault();

        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
        }

        setValidated(true);

        if (!isEmail(email)) {
            return toast("Please enter a valid email", {type: "error"})
        }

        if (password.trim() === "") {
            return toast("Please enter your password", {type: "error"})
        }

        setIsSubmitted(true);
        await dispatch(loginUser({email, password}));
        setLoading(false);
        setIsSubmitted(false);
    };

    const auth = useSelector((state) => state.authReducer.loginUser);
    useEffect(() => {
        if (!loading) {
            if (auth && auth?.status === 200) {
                const {token, data} = auth.data;

                if (token) {
                    localStorage.setItem('token', token);
                    localStorage.setItem('user', data);
                    toast("Logged in successfully", {type: 'success'})
                    setTimeout(() => {
                        window.location.href = '/';
                    }, 1500);
                } else {
                    toast("Not able to login, please try again later", {type: 'error', toastId: 'loginToken'})
                }

            } else if (auth?.status === 401) {
                toast("Email or password is wrong", {type: 'error', toastId: 'loginWrongData'})
            } else if (auth?.status === 429) {
                toast("Too many requests, try again after 3 hours", {type: 'error', toastId: 'loginTooManyReqs'})
            } else {
                toast(auth?.data?.errors ? auth?.data?.errors[0]?.msg : "Error while logging in", {
                    type: 'error',
                    toastId: 'loginAnother'
                })
            }
        }
    }, [loading, auth]);

    return {email, password, loading, handleEmailChange, handlePasswordChange, handleLogin, isSubmitted, validated};
};

export default useLogin;
