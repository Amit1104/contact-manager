import { applyMiddleware, combineReducers, createStore } from "redux"
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { contactReducer } from "./reducers/contactReducer";
import userReducer from "./reducers/userReducer";

const localdata = localStorage.getItem("login") ? JSON.parse(localStorage.getItem("login")) : null

const rootReducer = combineReducers({
    user: userReducer,
    contact: contactReducer
})


const store = createStore(rootReducer, {
    user: {
        loginUser: localdata,
        allData: { users: [], contacts: [] }
    }
}, composeWithDevTools(applyMiddleware(thunk)))

export default store