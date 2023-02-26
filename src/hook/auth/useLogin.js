import {useState, useEffect} from 'react';
import notify from '../useNotification';
import {useDispatch, useSelector} from 'react-redux';
import {loginUser} from '../../redux/actions/authActions';

const useLogin = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(true);
    const [isPress, setIsPress] = useState(false);

    const handleEmailChange = (event) => setEmail(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);

    const handleSubmit = async () => {
        setIsPress(true);
        await dispatch(loginUser({email, password}));
        setLoading(false);
        setIsPress(false);
    };

    const auth = useSelector((state) => state.authReducer.loginUser);
    useEffect(() => {
        if (!loading) {
            if (auth.status === 200) {
                const {token, data} = auth.data;

                if (token) {
                    localStorage.setItem('token', token);
                    localStorage.setItem('user', JSON.stringify(data));
                    notify('Logged in successfully', 'success');
                    setTimeout(() => {
                        window.location.href = '/';
                    }, 1500);
                } else {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                }
            } else if (auth.status === 401) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                notify('Email or password is wrong', 'error');
            } else if (auth.data?.errors) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                notify(auth.data.errors[0].msg, 'error');
            } else if (auth.status === 429) {
                notify('Too many requests, try again after 3 hours', 'error');
            } else {
                notify('Error while logging in!', 'warn');
            }
        }
    }, [loading, auth]);

    return {email, password, loading, handleEmailChange, handlePasswordChange, handleSubmit, isPress};
};

export default useLogin;
