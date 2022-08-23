import React from 'react'
import { useSelector } from "react-redux";
function AdminOnly({ element }) {
    const { loginUser } = useSelector(state => state.user)
    // console.log(loginUser);
    if (!loginUser && !loginUser.isAdmin) {
        return <>
            <h2>UnAuthorized Access</h2>
        </>
    }
    return element
}

export default AdminOnly