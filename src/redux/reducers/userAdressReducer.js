import {
    ADD_USER_ADDRESS,
    EDIT_USER_ADDRESS,
    GET_ONE_USER_ADDRESS,
    DELETE_USER_ADDRESS,
    GET_ALL_USER_ADDRESS
} from '../types'

const initState = {
    addUserAddress: [],
    allAddresses: [],
    deleteAddress: [],
    oneAddress: [],
    editAddress: [],
    error: null
}
const userAddressesReducer = (state = initState, action) => {
    switch (action.type) {
        case ADD_USER_ADDRESS:
            return {
                ...state,
                addUserAddress: action.payload.address,
                error: action.payload.error
            }
        case GET_ALL_USER_ADDRESS:
            return {
                ...state,
                allAddresses: action.payload.allAddresses,
                error: action.payload.error
            }
        case DELETE_USER_ADDRESS:
            return {
                ...state,
                deleteAddress: action.payload.address,
                error: action.payload.error
            }
        case GET_ONE_USER_ADDRESS:
            return {
                ...state,
                oneAddress: action.payload.oneAddress,
                error: action.payload.error
            }
        case EDIT_USER_ADDRESS:
            return {
                ...state,
                editAddress: action.payload.editAddress,
                error: action.payload.error
            }
        default:
            return state;
    }
}
export default userAddressesReducer