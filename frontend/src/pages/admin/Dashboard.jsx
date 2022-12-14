import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { handleDeleteUser, handleGetAllData } from '../redux/actions/userActioin'

function Dashboard() {
    const dispatch = useDispatch()
    const { allData: { users: allusersdata }, loading, deleteUser } = useSelector(state => state.user)
    const users = allusersdata.filter(item => item.delete === false)
    useEffect(() => {
        dispatch(handleGetAllData())
    }, [deleteUser])

    const delete_User = (id) => {
        dispatch(handleDeleteUser(id))
        dispatch(handleGetAllData())
    }
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 mt-5">
                        <h3>All Users</h3>
                        {
                            loading ? <div className="spinner-border text-primary"></div> : <h5>Total Users : {users && (users.length - users.filter(item => item.isAdmin == true).length)}</h5>
                        }
                        <div className="accordion" id="accordionExample">
                            {
                                users && users.map((item, i) =>
                                    !item.isAdmin && <div key={item.name + i}>
                                        <div className="accordion-item">
                                            <h2 className="accordion-header" id="flush-headingTwo">
                                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#${item.name + i}`} aria-expanded="false" aria-controls={`${item.name + i}`}>
                                                    {item.name}
                                                </button>
                                            </h2>
                                            <div id={`${item.name + i}`} className="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                                                <div className="accordion-body">
                                                    <ul className="list-group">
                                                        <li className="list-group-item">Email : {item.email}</li>
                                                        <li className="list-group-item">Admin : {JSON.stringify(item.isAdmin)}</li>
                                                        <button type="button" onClick={e => delete_User(item.id)} className="btn btn-danger">Delete</button>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard