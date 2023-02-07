import {useState, useEffect} from 'react'
import {getLoggedUser, updateUserPassword, updateUserProfileData} from '../../redux/actions/authActions';
import {useDispatch, useSelector} from 'react-redux';
import notify from '../useNotification';
import {useNavigate} from 'react-router-dom';

const UserProfileHook = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getUser = async () => {
            await dispatch(getLoggedUser())
        }

        getUser()
    }, [])

    const user = useSelector(state => state.authReducer.currentUser)

    useEffect(() => {
        setName(user?.data?.name)
        setEmail(user?.data?.email)
        setPhone(user?.data?.phone)
    }, [user])

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onChangeName = (event) => {
        event.persist();
        setName(event.target.value)
    }

    const onChangeEmail = (event) => {
        event.persist();
        setEmail(event.target.value)
    }
    const onChangePhone = (event) => {
        event.persist();
        setPhone(event.target.value)
    }

    const handelSubmit = async () => {

        let body = {}
        if (user?.data?.email !== email) {
            body = {name, email, phone}
        } else {
            body = {name, phone}
        }
        setLoading(true)
        await dispatch(updateUserProfileData(body))
        setLoading(false)
        setShow(false);
    }

    const res = useSelector(state => state.authReducer.userProfile)
    const error = useSelector(state => state.authReducer.error)

    useEffect(() => {
        if (loading === false) {
            if (res && res.status === 200) {
                notify("Profile updated successfully", "success")

                localStorage.setItem("user", JSON.stringify(res?.data))
                setTimeout(() => {
                    window.location.reload();
                }, 1500);

            }

            if (error) {
                notify("Error while updating profile", "warn")
            }
        }
    }, [loading])


    // change user password
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')
    const [loadingPass, setLoadingPass] = useState(true)


    const onChangeOldPass = (event) => {
        event.persist();
        setOldPassword(event.target.value)
    }

    const onChangeNewPass = (event) => {
        event.persist();
        setNewPassword(event.target.value)
    }
    const onChangeConfirmPass = (event) => {
        event.persist();
        setConfirmNewPassword(event.target.value)
    }

    const changePassword = async () => {

        if (confirmNewPassword !== newPassword) {
            notify("New password and new password confirmation aren't the same!", "warn")
            return
        }
        setLoadingPass(true)
        await dispatch(updateUserPassword({
            currentPassword: oldPassword,
            password: newPassword,
            passwordConfirm: confirmNewPassword
        }))
        setLoadingPass(false)
    }

    const resPass = useSelector(state => state.authReducer.userChangePassword)
    const errorPass = useSelector(state => state.authReducer.error)

    useEffect(() => {
        if (loadingPass === false) {
            if (resPass && resPass.status === 200) {
                notify("Password changed successfully", "success")
                setTimeout(() => {
                    localStorage.removeItem("user")
                    localStorage.removeItem("token")
                    navigate('/login')
                }, 1500);

            }

            if (errorPass) {
                if (errorPass?.data?.errors[0]) {
                    notify(errorPass?.data?.errors[0].msg, "warn")
                } else {
                    notify("Error while changing your password!", "warn")
                }
            }
        }
    }, [loadingPass])

    return [user?.data, show, handleClose, handleShow, handelSubmit, name, email, phone, onChangeName, onChangeEmail, onChangePhone, changePassword, oldPassword, newPassword, confirmNewPassword, onChangeOldPass, onChangeNewPass, onChangeConfirmPass]
}

export default UserProfileHook