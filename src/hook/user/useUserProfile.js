import {useState, useEffect} from 'react';
import {
    getLoggedUser,
    updateUserPassword,
    updateUserProfileData,
} from '../../redux/actions/authActions';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import validator from "validator/es";

const useUserProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUser = async () => {
            await dispatch(getLoggedUser());
        };

        getUser();
    }, []);

    const user = useSelector((state) => state.authReducer.currentUser);

    useEffect(() => {
        setName(user?.data?.data.name);
        setEmail(user?.data?.data.email);
        setPhone(user?.data?.data.phone);
    }, [user]);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onChangeName = (event) => setName(event.target.value);
    const onChangeEmail = (event) => setEmail(event.target.value);
    const onChangePhone = (event) => setPhone(event.target.value);

    const handleSubmit = async () => {
        const body = user?.data?.data.email !== email ? {name, email, phone} : {name, phone};
        setLoading(true);
        await dispatch(updateUserProfileData(body));
        setLoading(false);
        setShow(false);
    };

    const res = useSelector((state) => state.authReducer.userProfile);

    useEffect(() => {
        if (!loading) {
            if (res && res.status === 200) {
                toast('Profile updated successfully', {type: 'success'});
                localStorage.setItem('user', JSON.stringify(res?.data));
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            } else {
                toast(res?.data?.errors ? res?.data?.errors[0]?.msg : 'Error while updating profile', {
                    type: 'error',
                    toastId: 'updateUserProfileError'
                });
            }
        }
    }, [loading, res]);

    // Change user password
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [loadingPass, setLoadingPass] = useState(true);

    const onChangeOldPass = (event) => setOldPassword(event.target.value);
    const onChangeNewPass = (event) => setNewPassword(event.target.value);
    const onChangeConfirmPass = (event) => setConfirmNewPassword(event.target.value);

    const changePassword = async () => {
        if (oldPassword.trim() === '') {
            toast("Please enter your old password", {type: 'error'})
            return false;
        }

        if (!validator.isStrongPassword(newPassword)) {
            toast("New password is not strong enough", {type: 'error'})
            return false;
        }

        if (confirmNewPassword !== newPassword) {
            toast.error("New password and new password confirmation aren't the same!");
            return;
        }
        setLoadingPass(true);
        await dispatch(
            updateUserPassword({
                currentPassword: oldPassword,
                password: newPassword,
                passwordConfirm: confirmNewPassword,
            })
        );
        setLoadingPass(false);
    };

    const resPass = useSelector((state) => state.authReducer.userChangePassword);

    useEffect(() => {
        if (!loadingPass) {
            if (resPass.status === 200) {
                toast.success('Password changed successfully');
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            } else {
                toast(resPass?.data?.errors ? resPass?.data?.errors[0]?.msg : 'Error while changing your password!', {
                    type: 'error',
                    toastId: "changePassError"
                });
            }
        }
    }, [loadingPass, resPass]);

    return {
        userData: user?.data?.data,
        show,
        handleClose,
        handleShow,
        handleSubmit,
        name,
        email,
        phone,
        onChangeName,
        onChangeEmail,
        onChangePhone,
        changePassword,
        oldPassword,
        newPassword,
        confirmNewPassword,
        onChangeOldPass,
        onChangeNewPass,
        onChangeConfirmPass,
    };
};

export default useUserProfile;