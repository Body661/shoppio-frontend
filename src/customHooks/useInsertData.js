import baseURL from '../Api/axiosConfig'

const useInsertDataWithImage = async (url, params) => {
    const config = {
        headers: {"Content-Type": "multipart/form-data"}
    }
    return await baseURL.post(url, params, config);
}

const useInsertData = async (url, params) => {
    return await baseURL.post(url, params);
}

export {useInsertData, useInsertDataWithImage};