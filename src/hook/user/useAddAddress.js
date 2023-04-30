import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addUserAddress} from '../../redux/actions/userAddressActions';
import {useNavigate} from 'react-router-dom';
import validator from 'validator/es';
import {toast} from 'react-toastify';

const useAddAddress = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [address, setAddress] = useState({
        alias: '',
        street: '',
        postalCode: '',
        phone: '',
        city: '',
        country: '',
    });
    const [loading, setLoading] = useState(true);

    const handleChange = (event) => {
        setAddress((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }));
    };

    const handleSubmit = async () => {
        const {alias, street, postalCode, phone, city, country} = address;

        if(alias.trim() === ''){
            return  toast("Please fill in your address alias", {type: 'error'});
        }

        if(street.trim() === ''){
            return toast("Please fill in your street and house number", {type: 'error'});
        }

        if(!validator.isPostalCode(postalCode, 'NL')){
            return  toast("Postal code is wrong", {type: 'error'});
        }

        if(!validator.isMobilePhone(phone)){
            return toast("Mobile phone is wrong", {type: 'error'});
        }

        if(city.trim() === ''){
            return toast("Please enter your city", {type: 'error'});
        }

        if(country.trim() === ''){
            return  toast("Please enter your country", {type: 'error'});
        }

        setLoading(true);
        await dispatch(addUserAddress(address));
        setLoading(false);
    };

    const response = useSelector((state) => state.userAddressesReducer.addUserAddress);

    useEffect(() => {
        if (!loading) {
            if (response.status === 200) {
                toast('Address added successfully', {type: 'success'});

                setTimeout(() => {
                    navigate('/user/profile');
                }, 1000);
            } else {
                toast(response?.data?.errors ? response?.data?.errors[0]?.msg : 'Error while adding new address', {
                    type: 'error',
                    toastId: 'addAddressError'
                });
            }
        }
    }, [loading, response, navigate]);

    return {address, handleChange, handleSubmit};
};

export default useAddAddress;
