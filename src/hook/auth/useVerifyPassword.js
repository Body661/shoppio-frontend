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

    const onChangeCode = (e) => {
        setCode(e.target.value);
    };

    const onSubmit = async () => {
        if (!validator.isNumeric(code)) {
            toast("Please enter a valid code", {type: 'error'})
            return;
        }

        setLoading(true);
        await dispatch(verifyPassword({code}));
        setLoading(false);
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

    return {code, onChangeCode, onSubmit};
};

export default useVerifyPassword;
