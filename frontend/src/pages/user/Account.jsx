import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { handleEditAccount, handleLogout } from '../redux/actions/userActioin'

function Account() {
    const dispatch = useDispatch()
    const nav = useNavigate()
    const { loginUser, accountEdit } = useSelector(state => state.user)
    const [accountDetails, setAccountDetails] = useState({
        id: loginUser.id,
        name: loginUser.name,
        email: loginUser.email,
        password: undefined,
        npassword: undefined,
        cnpassword: undefined,
        isAdmin: loginUser.isAdmin
    })
    const saveAccountChanges = () => {
        dispatch(handleEditAccount(accountDetails))
    }
    useEffect(() => {
        if (accountEdit) {
            dispatch(handleLogout())
            nav("/login")
        }
    }, [accountEdit]);
    return (
        <div>
            <div className="container mt-5">
                <h3 className='my-5'>Account Details</h3>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="row">
                            <div className="col-sm-3">
                                Name
                            </div>
                            <div className="col-sm-9">
                                <input className="form-control" onChange={e => setAccountDetails({ ...accountDetails, name: e.target.value })}
                                    type="text" placeholder={loginUser.name} />
                            </div>
                            <br /><br />

                            <div className="col-sm-3">
                                Email
                            </div>
                            <div className="col-sm-9">
                                <input className="form-control" type="text" placeholder={loginUser.email} disabled />
                            </div>
                            <br /><br />

                            <div className="col-sm-3">
                                Current Password
                            </div>
                            <div className="col-sm-9">
                                <input className="form-control" onChange={e => setAccountDetails({ ...accountDetails, password: e.target.value })} type="password" placeholder="" />
                            </div>
                            <br /><br />

                            <div className="col-sm-3">
                                New Password
                            </div>
                            <div className="col-sm-9">
                                <input className="form-control" onChange={e => setAccountDetails({ ...accountDetails, npassword: e.target.value })} type="password" placeholder="" />
                            </div>
                            <br /><br />

                            <div className="col-sm-3">
                                Confirm Password
                            </div>
                            <div className="col-sm-9">
                                <input className="form-control" onChange={e => setAccountDetails({ ...accountDetails, cnpassword: e.target.value })} type="password" placeholder="" />
                            </div>
                            <br /><br />
                            <button type="button" onClick={saveAccountChanges} className="btn btn-primary">Save Changes</button>
                        </div>
                    </div>
                    <div className="alert alert-warning mt-5" role="alert">
                        Please Login after pressing  <strong> Saving Changes </strong>
                    </div>
                    <br />
                    <div className="alert alert-secondary" role="alert">
                        Note: You will be logged out automatically
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Account