import baseURL from '../Api/axiosConfig'

const useInsertDataWithImage = async (url, parmas) => {
    const config = {
        headers: {"Content-Type": "multipart/form-data"}
    }
    const res = await baseURL.post(url, parmas, config);
    return res;
}

const useInsertData = async (url, parmas) => {
    const res = await baseURL.post(url, parmas);
    return res;
}

export {useInsertData, useInsertDataWithImage};