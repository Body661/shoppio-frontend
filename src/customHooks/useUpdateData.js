import baseUrl from '../Api/axiosConfig'


const useUpdateDataWithImage = async (url, params) => {
    const config = {
        headers: {"Content-Type": "multipart/form-data", Authorization: `Bearer ${localStorage.getItem("token")}`}
    }
    return await baseUrl.put(url, params, config);
}

const useUpdateData = async (url, params) => {
    const config = {
        headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
    }
    return await baseUrl.put(url, params, config);
}

export {useUpdateDataWithImage, useUpdateData};