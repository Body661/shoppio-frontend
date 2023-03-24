import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {deleteUserAddress} from '../../redux/actions/userAddressActions';
import {toast} from 'react-toastify';

const useDeleteAddress = (id) => {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(true);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDelete = async () => {
        setLoading(true)
        await dispatch(deleteUserAddress(id));
        setShow(false);
        setLoading(false)
    };

    const response = useSelector((state) => state.userAddressesReducer.deleteAddress)

    useEffect(() => {
        if (!loading) {
            if (response.status === 200) {
                toast('Address deleted successfully', {type: 'success'});
                setTimeout(() => {
                    window.location.reload();
                }, 1000)
            } else {
                toast('Error while deleting address', {type: 'error', toastId: 'deleteAddressError'});
            }
        }

    }, [loading, response])


    return {show, handleClose, handleShow, handleDelete};
};

export default useDeleteAddress;