import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { verifyPassword } from '../../redux/actions/authActions';
import { useNavigate } from 'react-router-dom';
import notify from '../useNotification';
import validator from 'validator/es';

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
            notify('Please enter a valid code', 'error');
            return;
        }

        setLoading(true);

        try {
            await dispatch(verifyPassword({ code }));
            setLoading(false);
        } catch (error) {
            setLoading(false);
            notify('Something went wrong, try again later', 'error');
        }
    };

    const res = useSelector((state) => state.authReducer.verifyPassword);

    useEffect(() => {
        if (loading === false) {
            if (res && res.status === 200) {
                notify('Code is correct', 'success');
                setTimeout(() => {
                    navigate('/user/reset-password');
                }, 1500);
            } else if (res?.status === 400) {
                notify('Code is wrong or expired', 'error');
            } else {
                notify('Something went wrong, try again later', 'error');
            }
        }
    }, [loading]);

    return {code, onChangeCode, onSubmit};
};

export default useVerifyPassword;
