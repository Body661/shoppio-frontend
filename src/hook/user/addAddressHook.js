import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {addUserAddress} from '../../redux/actions/userAddressActions';
import notify from '../useNotification';
import {useNavigate} from 'react-router-dom';
import validator from "validator/es";

const AddAddressHook = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [alias, setAlias] = useState('')
    const [street, setStreet] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [phone, setPhone] = useState('')
    const [city, setCity] = useState('')
    const [country, setCountry] = useState('')
    const [loading, setLoading] = useState(true)


    const onChangeAlias = (event) => {
        event.persist();
        setAlias(event.target.value)
    }

    const onChangeStreet = (event) => {
        event.persist();
        setStreet(event.target.value)
    }

    const onChangePostalCode = (event) => {
        event.persist();
        setPostalCode(event.target.value)
    }

    const onChangePhone = (event) => {
        event.persist();
        setPhone(event.target.value)
    }

    const onChangeCity = (event) => {
        event.persist();
        setCity(event.target.value)
    }

    const onChangeCounty = (event) => {
        event.persist();
        setCountry(event.target.value)
    }

    const onSubmit = async () => {
        if (alias.trim() === "" || street.trim() === "" || !validator.isPostalCode(postalCode, "NL") || !validator.isMobilePhone(phone || city.trim() === "" || country.trim() === "")) {
            notify("Please fill in all information", "warn")
            return
        }
        setLoading(true)
        await dispatch(addUserAddress({
            alias,
            street,
            postalCode,
            phone,
            city,
            country
        }))
        setLoading(false)
    }
    const res = useSelector(state => state.userAddressesReducer.addUserAddress)
    const error = useSelector(state => state.userAddressesReducer.error)

    useEffect(() => {

        if (loading === false) {
            if (res && res.status === 200) {
                notify("Address added successfully", "success")
                setTimeout(() => {
                    navigate('/user/addresses')
                }, 1000);
            }

            if (error) {
                if (error.status === 401) {
                    notify("you are not logged in!", "error")
                } else if (error.status === 403) {
                    notify("You are not allowed to do this operation", "error");
                } else if (error?.data?.errors) {
                    notify(error?.data?.errors[0].msg, "error");
                } else {
                    notify("Error while adding new address", "error")
                }
            }
        }

    }, [loading])


    return [alias, street, postalCode, phone, city, country, onChangeAlias, onChangeStreet, onChangePostalCode, onChangePhone, onChangeCity, onChangeCounty, onSubmit]
}

export default AddAddressHook