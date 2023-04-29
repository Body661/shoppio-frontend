import baseURL from "../Api/axiosConfig";

export const useGetData = async (url, params) => {
    return await baseURL.get(url, params)
}

export const useGetDataToken = async (url) => {
    const config = {
        headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
    }
    return await baseURL.get(url, config);
}