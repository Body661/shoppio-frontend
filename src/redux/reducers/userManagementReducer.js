import * as types from "../types"

const initialState = {
    users: null,
    user: null,
    updateUser: null,
    createUser: null,
    deleteUser: null
}

const userManagementReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.CREATE_USER:
            return {
                ...state,
                createUser: action.payload
            }
        case types.GET_USER:
            return {
                ...state,
                user: action.payload
            }
        case types.GET_ALL_USERS:
            return {
                ...state,
                users: action.payload
            }
        case types.UPDATE_USER:
            return {
                ...state,
                updateUser: action.payload
            }
        case types.DELETE_USER:
            return {
                ...state,
                deleteUser: action.payload
            }
        default:
            return state
    }
}

export default userManagementReducer