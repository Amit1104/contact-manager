import { DELETE_ACCOUNT_FAIL, DELETE_ACCOUNT_REQUEST, DELETE_ACCOUNT_SUCCESS, EDIT_ACCOUNT_FAIL, EDIT_ACCOUNT_REQUEST, EDIT_ACCOUNT_SUCCESS, GET_ALL_DATA_FAIL, GET_ALL_DATA_REQUEST, GET_ALL_DATA_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from "../constants/userConstants";

const userReducer = (state = { allData: { users: [] }, isRegister: false }, { type, payload }) => {
    switch (type) {
        case USER_REGISTER_REQUEST: return { ...state, loading: true, isRegister: false }
        case USER_REGISTER_SUCCESS: return { ...state, loading: false, isRegister: true }
        case USER_REGISTER_FAIL: return { ...state, loading: false, isRegister: false, error: payload }

        case USER_LOGIN_REQUEST: return { ...state, loading: true }
        case USER_LOGIN_SUCCESS: return { ...state, loading: false, loginUser: payload }
        case USER_LOGIN_FAIL: return { ...state, loading: false, error: payload }

        case GET_ALL_DATA_REQUEST: return { ...state, loading: true }
        case GET_ALL_DATA_SUCCESS: return { ...state, loading: false, allData: payload }
        case GET_ALL_DATA_FAIL: return { ...state, loading: false, error: payload }

        case EDIT_ACCOUNT_REQUEST: return { ...state, loading: true, accountEdit: false }
        case EDIT_ACCOUNT_SUCCESS: return { ...state, loading: false, accountEdit: true }
        case EDIT_ACCOUNT_FAIL: return { ...state, loading: false, accountEdit: false, error: payload }

        case DELETE_ACCOUNT_REQUEST: return { ...state, deleteUser: false, loading: true }
        case DELETE_ACCOUNT_SUCCESS: return { ...state, deleteUser: true, loading: false }
        case DELETE_ACCOUNT_FAIL: return { ...state, deleteUser: false, loading: false, error: payload }

        case USER_LOGOUT: return { ...state, loginUser: null, accountEdit: false, isRegister: false, deleteUser: false }

        default: return state
    }
}
export default userReducer