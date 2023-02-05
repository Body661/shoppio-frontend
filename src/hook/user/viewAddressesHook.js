import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {getAllUserAddresses} from '../../redux/actions/userAddressActions';

const ViewAddressesHook = () => {
    const disptach = useDispatch()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const get = async () => {
            setLoading(true)
            await disptach(getAllUserAddresses());
            setLoading(false)
        }
        get();
    }, [])

    const res = useSelector(state => state.userAddressesReducer.allAddresses)

    return [res]
}

export default ViewAddressesHook