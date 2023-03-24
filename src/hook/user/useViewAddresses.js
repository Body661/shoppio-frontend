import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUserAddresses } from '../../redux/actions/userAddressActions';

const useViewAddresses = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAddresses = async () => {
            setLoading(true);
            await dispatch(getAllUserAddresses());
            setLoading(false);
        };
        fetchAddresses();
    }, [dispatch]);

    const addresses = useSelector((state) => state.userAddressesReducer.allAddresses);

    return { addresses, loading };
};

export default useViewAddresses;