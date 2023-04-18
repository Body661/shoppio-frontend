import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {deleteUser} from "../../../redux/actions/userManagementActions";
import {useNavigate} from "react-router-dom";

export const useDeleteUser = (id) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [loadingDeleteUser, setLoadingDeleteUser] = useState(true);
    const navigate = useNavigate()
    const handleCloseDeleteModal = () => setShowDeleteModal(false);
    const handleShowDeleteModal = () => setShowDeleteModal(true);

    const dispatch = useDispatch();

    const handleDelete = async () => {
        setLoadingDeleteUser(true)
        await dispatch(deleteUser(id))
        setShowDeleteModal(false);
        setLoadingDeleteUser(false)
    }

    const deleteResponse = useSelector(state => state.userManagementReducer.deleteUser)

    useEffect(() => {
        if (!loadingDeleteUser) {
            if (deleteResponse && deleteResponse?.status === 200) {
                toast("User deleted successfully", {type: 'success', toastId: 'deleteUserSuccess'});
                setTimeout(() => {
                   navigate('/admin/user-management')
                }, 1000)
            } else {
                toast(deleteResponse?.data?.errors ? deleteResponse?.data?.errors[0]?.msg : "Error while deleting user", {
                    type: 'error',
                    toastId: 'deleteUserError'
                });
            }
        }
    }, [loadingDeleteUser, deleteResponse])

    return {showDeleteModal, handleCloseDeleteModal, handleShowDeleteModal, handleDelete}
}