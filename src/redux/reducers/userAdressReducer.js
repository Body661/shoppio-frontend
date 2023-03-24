import * as types from '../types';

const initState = {
    addUserAddress: null,
    allAddresses: null,
    deleteAddress: null,
    oneAddress: null,
    editAddress: null,
}
const userAddressesReducer = (state = initState, action) => {
    switch (action.type) {
        case types.ADD_USER_ADDRESS:
            return {
                ...state,
                addUserAddress: action.payload,
            }
        case types.GET_ALL_USER_ADDRESSES:
            return {
                ...state,
                allAddresses: action.payload,
            }
        case types.DELETE_USER_ADDRESS:
            return {
                ...state,
                deleteAddress: action.payload,
            }
        case types.GET_ONE_USER_ADDRESS:
            return {
                ...state,
                oneAddress: action.payload,
            }
        case types.EDIT_USER_ADDRESS:
            return {
                ...state,
                editAddress: action.payload,
            }
        default:
            return state;
    }
}
export default userAddressesReducer