import {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getUsers, getUsersPage} from '../../../redux/actions/userManagementActions';

export const useAllUsers = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [role, setRole] = useState('')
    const [email, setEmail] = useState('')

    const handleChooseRole = (e) => {
        if (e.target.value.trim() !== '') {
            setRole(`role=${e.target.value}`)
        } else {
            setRole("")
        }
    }
    const handleSearchByMail = (e) => {
        if (e.key === 'Enter') {
            setEmail(e.target.value);
        }
    }

    useEffect(() => {

        let emailQuery
        if (email.trim() !== '') emailQuery = `email=${email.trim()}`

        const fetchUsers = async () => {
            setLoading(true)
            await dispatch(getUsers(role, emailQuery));
            setLoading(false)
        }

        fetchUsers()
    }, [dispatch, role, email]);

    const users = useSelector((state) => state.userManagementReducer.users);

    const handleChangePage = async (page) => {
        let emailQuery
        if (email.trim() !== '') emailQuery = `email=${email.trim()}`

        setLoading(true)
        await dispatch(getUsersPage(role, emailQuery, page));
        setLoading(false)
    };

    useEffect(() => {
        if (users && users?.status !== 200 && !loading) {
            setError(true)
        } else {
            setError(false)
        }
    }, [users, loading])

    return {
        users: users?.data?.data,
        loading,
        error,
        pageCount: users?.data?.pagination?.pages,
        handleChangePage,
        handleChooseRole,
        handleSearchByMail
    };
};