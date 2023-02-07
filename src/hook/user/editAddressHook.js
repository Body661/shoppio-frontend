import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {getOneUserAddress, editUserAddress} from '../../redux/actions/userAddressActions';
import {useNavigate} from 'react-router-dom';
import notify from '../useNotification';

const EditAddressHook = (id) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(true);
    const [loadingEdit, setLoadingEdit] = useState(true);
    const [alias, setAlias] = useState('')
    const [street, setStreet] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [phone, setPhone] = useState('')
    const [city, setCity] = useState('')
    const [country, setCountry] = useState('')


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


    useEffect(() => {
        const get = async () => {
            setLoading(true)
            await dispatch(getOneUserAddress(id))
            setLoading(false)
        }
        get();
    }, [])

    const resAddress = useSelector(state => state.userAddressesReducer.oneAddress)

    useEffect(() => {
        if (loading === false) {
            if (resAddress && resAddress.status === 200) {
                setAlias(resAddress.data?.alias)
                setStreet(resAddress.data?.street)
                setPostalCode(resAddress.data?.postalCode)
                setPhone(resAddress.data?.phone)
                setCity(resAddress.data?.city)
                setCountry(resAddress.data?.country)
            }
        }
    }, [loading])

    const handelEdit = async () => {
        setLoadingEdit(true)
        await dispatch(editUserAddress(id, {
            alias,
            street,
            postalCode,
            phone,
            city,
            country
        }))
        setLoadingEdit(false)
    }
    const resEdit = useSelector(state => state.userAddressesReducer.editAddress)
    const error = useSelector(state => state.userAddressesReducer.error)
    
    useEffect(() => {

        if (loadingEdit === false) {
            if (resEdit && resEdit.status === 200) {
                notify("Address updated successfully", "success")
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
                    notify(error?.data.errors[0].msg, "error");
                } else {
                    notify("Error while updating address", "error")
                }
            }
        }
    }, [loadingEdit])

    return [handelEdit, alias, street, postalCode, phone, city, country, onChangeAlias, onChangeStreet, onChangePostalCode, onChangePhone, onChangeCity, onChangeCounty, onChangePhone]
}


export default EditAddressHook