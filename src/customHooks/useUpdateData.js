import baseUrl from '../Api/axiosConfig'


const useUpdateDataWithImage = async (url, params) => {
    const config = {
        headers: {"Content-Type": 'multipart/form-data'}
    }
    return await baseUrl.put(url, params, config);
}

const useInsUpdateData = async (url, params) => {
    return await baseUrl.put(url, params);
}

export {useUpdateDataWithImage, useInsUpdateData};