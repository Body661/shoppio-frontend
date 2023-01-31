import baseURL from '../Api/axiosConfig'

const useDeleteData = async (url, params) => {
    const res = await baseURL.delete(url, params);
    return res.data;
}

export default useDeleteData;