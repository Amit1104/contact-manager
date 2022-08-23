import { CONTACT_ADD_FAIL, CONTACT_ADD_REQUEST, CONTACT_ADD_SUCCESS, GET_ALL_CONTACT_FAIL, GET_ALL_CONTACT_REQUEST, GET_ALL_CONTACT_SUCCESS } from "../../../components/contactConstants";
import { DELETE_CONTACT_FAIL, DELETE_CONTACT_REQUEST, DELETE_CONTACT_SUCCESS, UPDATE_CONTACT_FAIL, UPDATE_CONTACT_REQUEST, UPDATE_CONTACT_SUCCESS } from "../constants/userConstants";

export const contactReducer = (state = { allContacts: [], allData: { users: [] } }, { type, payload }) => {
    switch (type) {
        case CONTACT_ADD_REQUEST: return { ...state, loading: true, success: false }
        case CONTACT_ADD_SUCCESS: return { ...state, loading: false, success: true }
        case CONTACT_ADD_FAIL: return { ...state, loading: false, error: payload }

        case GET_ALL_CONTACT_REQUEST: return { ...state, loading: true }
        case GET_ALL_CONTACT_SUCCESS: return { ...state, loading: false, allContacts: payload }
        case GET_ALL_CONTACT_FAIL: return { ...state, loading: false, error: payload }

        case UPDATE_CONTACT_REQUEST: return { ...state, loading: true, update: false }
        case UPDATE_CONTACT_SUCCESS: return { ...state, loading: false, update: true }
        case UPDATE_CONTACT_FAIL: return { ...state, loading: false, error: payload }

        case DELETE_CONTACT_REQUEST: return { ...state, loading: true, deleteContact: false }
        case DELETE_CONTACT_SUCCESS: return { ...state, loading: false, deleteContact: true }
        case DELETE_CONTACT_FAIL: return { ...state, loading: false, error: payload }

        default: return state
    }
}