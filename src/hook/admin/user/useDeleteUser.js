import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {deleteUser} from "../../../redux/actions/userManagementActions";

export const useDeleteUser = (id) => {
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(true);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const dispatch = useDispatch();

    const handelDelete = async () => {
        setLoading(true)
        await dispatch(deleteUser(id))
        setShow(false);
        setLoading(false)
    }

    const deleteResponse = useSelector(state => state.userManagementReducer.deleteUser)

    useEffect(() => {
        if (!loading) {
            if (deleteResponse && deleteResponse?.status === 200) {
                toast("User deleted successfully", {type: 'success', toastId: 'deleteUserSuccess'});
                setTimeout(() => {
                    window.location.reload();
                }, 1000)
            } else {
                toast(deleteResponse?.data?.errors ? deleteResponse?.data?.errors[0]?.msg : "Error while deleting user", {
                    type: 'error',
                    toastId: 'deleteUserError'
                });
            }
        }
    }, [loading, deleteResponse])

    return {show, handleClose, handleShow, handelDelete}
}