import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getOneUserAddress, editUserAddress} from '../../redux/actions/userAddressActions';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';

const useEditAddress = (id) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true);
    const [loadingEdit, setLoadingEdit] = useState(true);
    const [address, setAddress] = useState({
        alias: '',
        street: '',
        postalCode: '',
        phone: '',
        city: '',
        country: '',
    });

    const handleChange = (event) => {
        setAddress({...address, [event.target.name]: event.target.value});
    };

    useEffect(() => {
        const fetchAddress = async () => {
            setLoading(true);
            await dispatch(getOneUserAddress(id));
            setLoading(false);
        };
        fetchAddress();
    }, [dispatch, id]);

    const resAddress = useSelector((state) => state.userAddressesReducer.oneAddress);

    useEffect(() => {
        if (!loading && resAddress?.status === 200) {
            setAddress(resAddress.data?.data);
        }
    }, [loading, resAddress]);

    const handleSubmit = async () => {
        setLoadingEdit(true);
        await dispatch(editUserAddress(id, address));
        setLoadingEdit(false);
    };

    const resEdit = useSelector((state) => state.userAddressesReducer.editAddress);

    useEffect(() => {
        if (!loadingEdit) {
            if (resEdit?.status === 200) {
                toast('Address updated successfully', {type: 'success'});

                setTimeout(() => {
                    navigate('/user/addresses');
                }, 1000);
            } else {
                toast(resEdit?.data?.errors ? resEdit?.data?.errors[0]?.msg : 'Error while updating address', {
                    type: 'error',
                    toastId: 'editAddressError',
                });
            }
        }
    }, [loadingEdit, resEdit, navigate]);

    return {address, handleChange, handleSubmit};
};

export default useEditAddress;
