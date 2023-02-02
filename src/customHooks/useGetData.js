import baseURL from "../Api/axiosConfig";

export const useGetData = async (url, params) => {
    const res = await baseURL.get(url, params)
    return res.data
}

export const useGetDataToken = async (url) => {
    const config = {
        headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
    }
    const res = await baseURL.get(url, config);
    return res.data;
}