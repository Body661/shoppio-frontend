import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {editUserAddress} from '../../redux/actions/userAddressActions';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import validator from "validator/es";

const useEditAddress = (address) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loadingUpdateAddress, setLoadingUpdateAddress] = useState(true);
    const [isSubmittedUpdateAddress, setIsSubmittedUpdateAddress] = useState(false);
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
        if (
            addressInfo.alias.trim() === '' ||
            addressInfo.street.trim() === '' ||
            !validator.isPostalCode(addressInfo.postalCode, 'NL') ||
            !validator.isMobilePhone(addressInfo.phone) ||
            addressInfo.city.trim() === '' ||
            addressInfo.country.trim() === ''
        ) {
            toast("Please fill in all information and make sure that's it correct", {type: 'error'});
            return;
        }

        if(addressInfo.alias.trim() === ''){
            return  toast("Please fill in your address alias", {type: 'error'});
        }

        if(addressInfo.street.trim() === ''){
            return toast("Please fill in your street and house number", {type: 'error'});
        }

        if(!validator.isPostalCode(addressInfo.postalCode, 'NL')){
            return  toast("Postal code is wrong", {type: 'error'});
        }

        if(!validator.isMobilePhone(addressInfo.phone)){
            return toast("Mobile phone is wrong", {type: 'error'});
        }

        if(addressInfo.city.trim() === ''){
            return toast("Please enter your city", {type: 'error'});
        }

        if(addressInfo.country.trim() === ''){
            return  toast("Please enter your country", {type: 'error'});
        }

        setLoadingUpdateAddress(true);
        setIsSubmittedUpdateAddress(true);
        await dispatch(editUserAddress(address?._id, addressInfo));
        setLoadingUpdateAddress(false);
        setIsSubmittedUpdateAddress(false);
        setShowUpdateModal(false)
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
        isSubmittedUpdateAddress,
        loadingUpdateAddress,
        showUpdateModal,
        handleCloseUpdateModal,
        handleShowUpdateModal
    };
};

export default useEditAddress;
