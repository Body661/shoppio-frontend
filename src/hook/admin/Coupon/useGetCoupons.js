import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getAllCoupons} from "../../../redux/actions/couponActions";

export const useGetCoupons = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [page, setPage] = useState(1)

    useEffect(() => {
        const fetchCoupon = async () => {
            setLoading(true)
            await dispatch(getAllCoupons(page, searchTerm));
            setLoading(false)
        }

        fetchCoupon()
    }, [dispatch, searchTerm, page])

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            if (e.target.value.trim() !== '') {
                setSearchTerm(`name=${e.target.value}`);
            } else {
                setSearchTerm("")
            }
        }
    }

    const handleChangePage = (page) => {
        setPage(page);
    }

    const coupons = useSelector(state => state.couponReducer.allCoupons)

    useEffect(() => {
        if (coupons && coupons?.status !== 200 && !loading) {
            setError(true)
        } else {
            setError(false)
        }
    }, [coupons, loading])

    return {
        coupons: coupons?.data?.data,
        loading,
        error,
        pageCount: coupons?.data?.paginationRes?.pages || 0,
        handleChangePage,
        handleSearch
    };
}