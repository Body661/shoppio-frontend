import baseURL from '../Api/axiosConfig'

const useInsertDataWithImage = async (url, params) => {
    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    }
    return await baseURL.post(url, params, config);
}

const useInsertData = async (url, params) => {
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    }
    return await baseURL.post(url, params, config)
}

export {useInsertData, useInsertDataWithImage};