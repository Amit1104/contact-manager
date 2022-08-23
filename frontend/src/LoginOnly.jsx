import React from "react";
import { useSelector } from "react-redux";
function LoginOnly({ element }) {
  const { loginUser } = useSelector(state => state.user)
  if (!loginUser) {
    return <>
      <h2>UnAuthorized Access</h2>
    </>
  }
  return element
}

export default LoginOnly;
