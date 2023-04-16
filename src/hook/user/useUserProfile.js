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
    const [loadingGetProfile, setLoadingGetProfile] = useState(true);
    const [loadingUpdateProfile, setLoadingUpdateProfile] = useState(true);
    const [isPressUpdateProfile, setIsPressUpdateProfile] = useState(false);
    const [isPressUpdatePass, setIsPressUpdatePass] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const handleCloseUpdateModal = () => setShowUpdateModal(false);
    const handleShowUpdateModal = () => setShowUpdateModal(true);

    useEffect(() => {
        const getUser = async () => {
            setLoadingGetProfile(true)
            await dispatch(getLoggedUser());
            setLoadingGetProfile(false)
        };

        getUser();
    }, []);

    const user = useSelector((state) => state.authReducer.currentUser);

    useEffect(() => {
        setName(user?.data?.data.name);
        setEmail(user?.data?.data.email);
        setPhone(user?.data?.data.phone);
    }, [user]);


    const onChangeName = (event) => setName(event.target.value);
    const onChangeEmail = (event) => setEmail(event.target.value);
    const onChangePhone = (event) => setPhone(event.target.value);

    const handleUpdateProfile = async () => {
        const body = user?.data?.data.email !== email ? {name, email, phone} : {name, phone};
        setLoadingUpdateProfile(true);
        setIsPressUpdateProfile(true)
        await dispatch(updateUserProfileData(body));
        setLoadingUpdateProfile(false);
        setIsPressUpdateProfile(false)
        setShowUpdateModal(false);
    };

    const updateProfileRes = useSelector((state) => state.authReducer.updateProfile);

    useEffect(() => {
        if (!loadingUpdateProfile) {
            if (updateProfileRes && updateProfileRes.status === 200) {
                toast('Profile updated successfully', {type: 'success'});
                localStorage.setItem('user', JSON.stringify(updateProfileRes?.data));
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            } else {
                toast(updateProfileRes?.data?.errors ? updateProfileRes?.data?.errors[0]?.msg : 'Error while updating Profile', {
                    type: 'error',
                    toastId: 'updateUserProfileError'
                });
            }
        }
    }, [loadingUpdateProfile, updateProfileRes]);

    // Change user password
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [loadingUpdatePass, setLoadingUpdatePass] = useState(true);
    const [validated, setValidated] = useState(false);

    const handleChangeOldPass = (event) => setOldPassword(event.target.value);
    const handleChangeNewPass = (event) => setNewPassword(event.target.value);
    const handleChangeConfirmPass = (event) => setConfirmNewPassword(event.target.value);

    const handleUpdatePassword = async (e) => {
        e.preventDefault();

        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
        }

        setValidated(true);

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
        setLoadingUpdatePass(true);
        setIsPressUpdatePass(true)
        await dispatch(
            updateUserPassword({
                currentPassword: oldPassword,
                password: newPassword,
                passwordConfirm: confirmNewPassword,
            })
        );
        setLoadingUpdatePass(false);
        setIsPressUpdatePass(false)
    };

    const changePassRes = useSelector((state) => state.authReducer.userChangePassword);

    useEffect(() => {
        if (!loadingUpdatePass) {
            if (changePassRes.status === 200) {
                toast.success('Password changed successfully');
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            } else {
                toast(changePassRes?.data?.errors ? changePassRes?.data?.errors[0]?.msg : 'Error while changing your password!', {
                    type: 'error',
                    toastId: "changePassError"
                });
            }
        }
    }, [loadingUpdatePass, changePassRes]);

    return {
        userData: user?.data?.data,
        showUpdateModal,
        handleCloseUpdateModal,
        handleShowUpdateModal,
        handleUpdateProfile,
        name,
        email,
        phone,
        onChangeName,
        onChangeEmail,
        onChangePhone,
        handleUpdatePassword,
        oldPassword,
        newPassword,
        confirmNewPassword,
        handleChangeOldPass,
        handleChangeNewPass,
        handleChangeConfirmPass,
        loadingUpdateProfile,
        loadingUpdatePass,
        loadingGetProfile,
        isPressUpdateProfile,
        isPressUpdatePass,
        validated
    };
};

export default useUserProfile;