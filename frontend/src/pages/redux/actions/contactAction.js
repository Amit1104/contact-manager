import axios from "axios"
import { CONTACT_ADD_FAIL, CONTACT_ADD_REQUEST, CONTACT_ADD_SUCCESS, GET_ALL_CONTACT_FAIL, GET_ALL_CONTACT_REQUEST, GET_ALL_CONTACT_SUCCESS } from "../../../components/contactConstants"
import { DELETE_CONTACT_FAIL, DELETE_CONTACT_REQUEST, DELETE_CONTACT_SUCCESS, UPDATE_CONTACT_FAIL, UPDATE_CONTACT_REQUEST, UPDATE_CONTACT_SUCCESS } from "../constants/userConstants"

export const handleAddContact = contactData => async dispatch => {
    try {
        dispatch({ type: CONTACT_ADD_REQUEST })
        await axios.post("/contacts", contactData)
        dispatch({ type: CONTACT_ADD_SUCCESS })
    } catch (error) {
        dispatch({ type: CONTACT_ADD_FAIL, payload: error.message })
    }
}

export const handleGetAllContacts = (id) => async dispatch => {
    try {
        dispatch({ type: GET_ALL_CONTACT_REQUEST })
        const { data } = await axios.get("/contacts")
        const filtreData = data.filter(item => item.userId == id)
        dispatch({ type: GET_ALL_CONTACT_SUCCESS, payload: filtreData })
    } catch (error) {
        dispatch({ type: GET_ALL_CONTACT_FAIL, payload: error.message })
    }
}

export const handleEditContact = (updateData, id) => async dispatch => {
    try {
        dispatch({ type: UPDATE_CONTACT_REQUEST })
        const { data } = await axios.put(`/contacts/${id}`, updateData)
        dispatch({ type: UPDATE_CONTACT_SUCCESS })
    } catch (error) {
        dispatch({ type: UPDATE_CONTACT_FAIL, payload: error.message })
    }
}

export const handleDeleteContact = id => async dispatch => {
    try {
        dispatch({ type: DELETE_CONTACT_REQUEST })
        const { data } = await axios.delete(`/contacts/${id}`)
        dispatch({ type: DELETE_CONTACT_SUCCESS })
    } catch (error) {
        dispatch({ type: DELETE_CONTACT_FAIL, payload: error.message })
    }
}