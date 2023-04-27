import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {deleteUserAddress} from '../../redux/actions/userAddressActions';
import {toast} from 'react-toastify';

const useDeleteAddress = (id) => {
    const dispatch = useDispatch();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [loadingDeleteAddress, setLoadingDeleteAddress] = useState(true);
    const [isSubmittedDeleteAddress, setIsSubmittedDeleteAddress] = useState(false);

    const handleCloseDeleteModal = () => setShowDeleteModal(false);
    const handleShowDeleteModal = () => setShowDeleteModal(true);

    const handleDeleteAddress = async () => {
        setLoadingDeleteAddress(true)
        setIsSubmittedDeleteAddress(true)
        await dispatch(deleteUserAddress(id));
        setShowDeleteModal(false);
        setIsSubmittedDeleteAddress(false)
        setLoadingDeleteAddress(false)
    };

    const deleteAddressRes = useSelector((state) => state.userAddressesReducer.deleteAddress)

    useEffect(() => {
        if (!loadingDeleteAddress) {
            if (deleteAddressRes.status === 200) {
                toast('Address deleted successfully', {type: 'success'});
                setTimeout(() => {
                    window.location.reload();
                }, 1000)
            } else {
                toast('Error while deleting address', {type: 'error', toastId: 'deleteAddressError'});
            }
        }

    }, [loadingDeleteAddress, deleteAddressRes])


    return {showDeleteModal, handleCloseDeleteModal, handleShowDeleteModal, handleDeleteAddress, loadingDeleteAddress, isSubmittedDeleteAddress};
};

export default useDeleteAddress;