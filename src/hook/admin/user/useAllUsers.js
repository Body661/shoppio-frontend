import {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getUsers, getUsersPage} from '../../../redux/actions/userManagementActions';

export const useAllUsers = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    const users = useSelector((state) => state.userManagementReducer.users);
    const pageCount = users?.data?.paginationRes?.pages || 0;

    useEffect(() => {
        if (users && users?.status !== 200 && !loading) {
            setError(true)
        } else {
            setError(false)
        }
        setLoading(false);
    }, [users, loading])

    const getPage = (page) => {
        dispatch(getUsersPage(page));
    };

    return {users: users?.data?.data, loading, error, pageCount, getPage};
};