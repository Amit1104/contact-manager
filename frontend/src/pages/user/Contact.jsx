import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { handleAddContact, handleDeleteContact, handleEditContact, handleGetAllContacts } from '../redux/actions/contactAction';

function Contact() {
    const dispatch = useDispatch()
    const { loginUser } = useSelector(state => state.user)
    const { allContacts, update, deleteContact, success, loading } = useSelector(state => state.contact)
    const [deleteId, setDeleteId] = useState();
    const [editContact, setEditContact] = useState({
        e_name: "",
        e_mobile: "",
        e_image: "",
        editId: ""
    });

    const [ContactData, setContactData] = useState({
        name: "Ross",
        mobile: 8888888888,
        image: "https://images.unsplash.com/photo-1652961989677-a236d38f63f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
    })
    //contact sorting


    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(handleAddContact({ ...ContactData, userId: loginUser.id }))
    }

    useEffect(() => {
        dispatch(handleGetAllContacts(loginUser.id))
    }, [update, deleteContact, success]);


    const handleDelete = () => {
        dispatch(handleDeleteContact(deleteId))
    }
    return (
        <>
            <div className="container mt-4">
                <div className="row">
                    <div className="col-sm-12">
                        <form>
                            <div className="card">
                                <div className="card-header">
                                    <label htmlFor="">Name</label>
                                    <input type="text" onChange={e => setContactData({ ...ContactData, name: e.target.value })} className='form-control' value={ContactData.name} placeholder='Enter Name' />
                                </div>
                                <div className="card-body">
                                    <label htmlFor="">Number</label>
                                    <input type="text" onChange={e => setContactData({ ...ContactData, mobile: e.target.value })} className='form-control' value={ContactData.mobile} placeholder='Enter Number' />
                                </div>
                                <div className="card-footer">
                                    <label htmlFor="">URL</label>
                                    <input type="text" onChange={e => setContactData({ ...ContactData, image: e.target.value })} className='form-control' value={ContactData.image} placeholder='Enter URL' />
                                    <br />
                                    <button type="button" onClick={handleSubmit} className="btn btn-primary w-100">Add Contact</button>
                                </div>
                            </div>



                        </form>
                    </div>
                    <div className="col-sm-12">
                        <div>
                            {
                                loading ? <div className="spinner-border text-primary"></div> : ""
                            }
                            {
                                allContacts.map((item, i) => <div key={item + i}>
                                    <div className="card mt-3">
                                        <div className="row g-0">
                                            <div className="col-md-4">
                                                <img src={item.image} alt="img" className='img-fluid rounded-start' width="70%" />
                                            </div>
                                            <div className="col-md-8">
                                                <div className="card-body">
                                                    <h5 className="card-title">{item.name}</h5>
                                                    <p className="card-text">{item.mobile}</p>
                                                </div>
                                                <div className='btn-group card-body w-100'>
                                                    <button type="button" onClick={e => setEditContact({
                                                        e_name: item.name,
                                                        e_mobile: item.mobile,
                                                        e_image: item.image,
                                                        e_userId: item.userId,
                                                        editId: item.id,
                                                        deleteId: item.id
                                                    })} className="btn btn-primary"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#editModal">edit</button>
                                                    <button type="button" className="btn btn-danger" onClick={e => setDeleteId(item.id)} data-bs-toggle="modal" data-bs-target="#deleteModal">
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>)
                            }</div>
                    </div>
                </div>
            </div>

            {/*All modal windows */}

            {/* <!-- Modal --> */}
            <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <input className='form-control' type="text" value={editContact.e_name}
                                onChange={e => setEditContact({ ...editContact, e_name: e.target.value })} />
                            <br /><input className='form-control' type="text" value={editContact.e_mobile}
                                onChange={e => setEditContact({ ...editContact, e_mobile: e.target.value })} />
                            <br /><input className='form-control' type="text" value={editContact.e_image}
                                onChange={e => setEditContact({ ...editContact, e_image: e.target.value })} />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" data-bs-dismiss="modal" className="btn btn-primary"
                                onClick={e => {
                                    dispatch(handleEditContact({
                                        name: editContact.e_name,
                                        mobile: editContact.e_mobile,
                                        image: editContact.e_image,
                                        userId: loginUser.id
                                    }, editContact.editId))
                                }}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* <!-- Delete Modal --> */}
            <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            Are You Sure ?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleDelete} data-bs-dismiss="modal">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Contact