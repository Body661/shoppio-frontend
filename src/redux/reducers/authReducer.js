import {
    CREATE_NEW_USER,
    RESET_PASSWORD,
    VERIFY_PASSWORD,
    FORGET_PASSWORD,
    LOGIN_USER,
    GET_CURRENT_USER,
    UPDATE_USER_PROFILE, UPDATE_USER_PASSWORD
} from '../types'

const initState = {
    createUser: [],
    loginUser: [],
    currentUser: [],
    forgetPassword: [],
    verifyPassword: [],
    resetPassword: [],
    userProfile: [],
    userChangePassword: [],
}
const authReducer = (state = initState, action) => {
    switch (action.type) {
        case CREATE_NEW_USER:
            return {
                ...state,
                createUser: action.payload,
            }
        case LOGIN_USER:
            return {
                ...state,
                loginUser: action.payload,
            }
        case GET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload,
            }
        case FORGET_PASSWORD:
            return {
                ...state,
                forgetPassword: action.payload,
            }
        case VERIFY_PASSWORD:
            return {
                ...state,
                verifyPassword: action.payload,
            }
        case RESET_PASSWORD:
            return {
                ...state,
                currentUser: [],
                resetPassword: action.payload,
            }
        case UPDATE_USER_PROFILE:
            return {
                ...state,
                userProfile: action.payload,
            }
        case UPDATE_USER_PASSWORD:
            return {
                ...state,
                userChangePassword: action.payload,
            }
        default:
            return state;
    }
}
export default authReducer