import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { handleLogout } from '../pages/redux/actions/userActioin';

function Navbar() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { loginUser } = useSelector(state => state.user)
    // console.log(loginUser);
    return (
        <>
            <nav className="navbar navbar-expand-md bg-dark navbar-dark">
                <div className="container-fluid">
                    <a className="navbar-brand">Contact Manager</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            {!loginUser && <>
                                <Link className="nav-link" to="/login">login</Link>
                                <Link className="nav-link" to="/register">register</Link>
                            </>
                            }
                        </div>
                        {loginUser && !loginUser.isAdmin && <div div className="dropdown">
                            <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" >
                                {loginUser.name}
                            </button>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to="/home">Home</Link></li>
                                <li><Link className="dropdown-item" to="/user/account">Account</Link></li>
                                <li><Link className="dropdown-item" to="/user/contact">Contact</Link></li>
                                <li><button className="dropdown-item text-danger" onClick={e => {
                                    dispatch(handleLogout())
                                    navigate("/login")
                                }} >logout</button></li>
                            </ul>
                        </div>
                        }
                        {loginUser && loginUser.isAdmin && <div div className="dropdown">
                            <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" >
                                {loginUser.name}
                            </button>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to="/admin/dashboard">dashboard</Link></li>
                                <li><button className="dropdown-item" onClick={e => {
                                    dispatch(handleLogout())
                                    navigate("/login")
                                }} >logout</button></li>
                            </ul>
                        </div>
                        }
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar