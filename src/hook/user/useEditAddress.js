import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {editUserAddress} from '../../redux/actions/userAddressActions';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';

const useEditAddress = (address) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loadingUpdateAddress, setLoadingUpdateAddress] = useState(true);
    const [isPressUpdateAddress, setIsPressUpdateAddress] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);


    const handleCloseUpdateModal = () => setShowUpdateModal(false);
    const handleShowUpdateModal = () => setShowUpdateModal(true);

    const [addressInfo, setAddress] = useState({
        alias: address?.alias,
        street: address?.street,
        postalCode: address?.postalCode,
        phone: address?.phone,
        city: address?.city,
        country: address?.country,
    });

    const handleChangeAddress = (event) => {
        setAddress({...addressInfo, [event.target.name]: event.target.value});
    };

    const handleUpdateAddress = async () => {
        setLoadingUpdateAddress(true);
        setIsPressUpdateAddress(true);
        await dispatch(editUserAddress(address?._id, addressInfo));
        setLoadingUpdateAddress(false);
        setIsPressUpdateAddress(false);
        showUpdateModal(false)
    };

    const updateAddressRes = useSelector((state) => state.userAddressesReducer.editAddress);

    useEffect(() => {
        if (!loadingUpdateAddress) {
            if (updateAddressRes?.status === 200) {
                toast('Address updated successfully', {type: 'success'});

                setTimeout(() => {
                    window.location.reload()
                }, 1000);

            } else {
                toast(updateAddressRes?.data?.errors ? updateAddressRes?.data?.errors[0]?.msg : 'Error while updating address', {
                    type: 'error',
                    toastId: 'editAddressError',
                });
            }
        }
    }, [loadingUpdateAddress, updateAddressRes, navigate]);

    return {
        addressInfo,
        handleChangeAddress,
        handleUpdateAddress,
        isPressUpdateAddress,
        loadingUpdateAddress,
        showUpdateModal,
        handleCloseUpdateModal,
        handleShowUpdateModal
    };
};

export default useEditAddress;
