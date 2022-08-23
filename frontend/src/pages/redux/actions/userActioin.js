import { EDIT_ACCOUNT_FAIL, EDIT_ACCOUNT_REQUEST, EDIT_ACCOUNT_SUCCESS, GET_ALL_DATA_FAIL, GET_ALL_DATA_REQUEST, GET_ALL_DATA_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from "../constants/userConstants"
import axios from "axios";

export const handleRegisterAction = userData => async (dispatch) => {
    try {
        dispatch({ type: USER_REGISTER_REQUEST })
        const { data } = await axios.post("/users", userData)
        dispatch({ type: USER_REGISTER_SUCCESS })
    } catch (error) {
        dispatch({ type: USER_REGISTER_FAIL, payload: error })
    }
}

export const handleLoginAction = ({ email, password }) => async dispatch => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST })
        const { data } = await axios.get("/users")
        const result = data.find((item) => item.password === password && item.email === email)
        // console.log("Result:", result);
        if (!result) {
            dispatch({ type: USER_LOGIN_FAIL, payload: "Wrong email and password" })
        }
        else {
            dispatch({ type: USER_LOGIN_SUCCESS, payload: result })
            localStorage.setItem("login", JSON.stringify(result))
        }
    } catch (error) {
        dispatch({ type: USER_LOGIN_FAIL, payload: error.message })
    }
}

export const handleLogout = () => dispatch => {
    localStorage.removeItem("login")
    dispatch({ type: USER_LOGOUT })
}

export const handleGetAllData = () => async (dispatch) => {
    try {
        dispatch({ type: GET_ALL_DATA_REQUEST })

        const { data: contacts } = await axios.get("/contacts")
        const { data: users } = await axios.get("/users")
        const data = { users, contacts }

        dispatch({ type: GET_ALL_DATA_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: GET_ALL_DATA_FAIL, payload: error.message })
    }
}

export const handleEditAccount = (ac_details) => async (dispatch) => {
    try {
        dispatch({ type: EDIT_ACCOUNT_REQUEST })
        console.log(ac_details)
        const { data: user } = await axios.get(`/users/${ac_details.id}`)
        if (user.password === ac_details.password) {
            if (ac_details.npassword && ac_details.npassword === ac_details.cnpassword) {

                ac_details.password = ac_details.npassword
                delete ac_details.cnpassword
                delete ac_details.npassword
                console.log(ac_details);
                const { data } = await axios.put(`/users/${ac_details.id}`, ac_details)
                dispatch({ type: EDIT_ACCOUNT_SUCCESS })
            }
            else {
                throw Error("Password mismatch or Not Provided");
            }
        }
        else {
            throw Error("Wrong Old Password");
        }
    } catch (error) {
        dispatch({ type: EDIT_ACCOUNT_FAIL, payload: error.message })
    }
}