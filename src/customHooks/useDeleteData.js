import baseURL from '../Api/axiosConfig'

const useDeleteData = async (url) => {
    const config = {
        headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
    }
    return await baseURL.delete(url, config)
}

export default useDeleteData;