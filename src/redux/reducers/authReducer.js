import {CREATE_NEW_USER, RESET_PASSWORD, VERIFY_PASSWORD, FORGET_PASSWORD, LOGIN_USER, GET_CURRENT_USER} from '../types'

const initState = {
    createUser: [],
    loginUser: [],
    currentUser: [],
    forgetPassword: [],
    verifyPassword: [],
    resetPassword: [],
    loading: true,
    error: null
}
const authReducer = (state = initState, action) => {
    switch (action.type) {
        case CREATE_NEW_USER:
            return {
                ...state,
                createUser: action.payload.user,
                loading: false,
                error: action.payload.error
            }
        case LOGIN_USER:
            return {
                ...state,
                loginUser: action.payload.user,
                loading: false,
                error: action.payload.error
            }
        case GET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload.user,
                loading: false,
                error: action.payload.error
            }
        case FORGET_PASSWORD:
            return {
                ...state,
                forgetPassword: action.payload.forgetPassword,
                loading: false,
                error: action.payload.error
            }
        case VERIFY_PASSWORD:
            return {
                ...state,
                verifyPassword: action.payload.verifyPassword,
                loading: false,
                error: action.payload.error
            }
        case RESET_PASSWORD:
            return {
                ...state,
                currentUser: [],
                resetPassword: action.payload.resetPassword,
                loading: false,
                error: action.payload.error
            }
        default:
            return state;
    }
}
export default authReducer