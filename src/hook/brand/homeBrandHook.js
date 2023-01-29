import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getAllBrands} from "../../redux/actions/BrandActions";

const HomeBrandHook = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllBrands(6))
    }, [dispatch])

    const brands = useSelector(state => state.allBrands.brands)
    const loading = useSelector(state => state.allBrands.loading)
    const error = useSelector(state => state.allBrands.error)

    return [brands, loading, error]
}

export default HomeBrandHook