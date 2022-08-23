import { useEffect } from 'react'
import { useFormik } from "formik";
import * as yup from "yup"
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { handleLoginAction } from './redux/actions/userActioin';

function Login() {
    const dispatch = useDispatch()
    const { loginUser } = useSelector(state => state.user)
    const navigate = useNavigate()


    const formik = useFormik({
        initialValues: {
            email: "admin@gmail.com",
            password: "123"
        },
        validationSchema: yup.object({
            email: yup.string().required(),
            password: yup.string().required()
        }),
        onSubmit: values => {
            dispatch(handleLoginAction(values))
            // console.log("values :", values);
            // console.log("loginUser :", loginUser);
        }
    })

    useEffect(() => {
        if (loginUser) {
            loginUser.isAdmin ? navigate("/admin/dashboard") : navigate("/user/contact")
        }
    }, [loginUser]);
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-sm-6 offset-sm-3">
                        <div className="card mt-5">
                            <div className="card-header">Login</div>
                            <div className="card-body">
                                <form onSubmit={formik.handleSubmit}>
                                    <div>
                                        <label htmlFor="email" className="form-label">First Email</label>
                                        <input className={formik.errors.email && formik.touched.email ? "form-control is-invalid" : "form-control"}
                                            onBlur={formik.handleBlur} value={formik.values.email} onChange={formik.handleChange} type="text" name="email" placeholder="Enter Your Email"
                                        />
                                        <div className="valid-feedback">Looks good!</div>
                                        <div className="invalid-feedback">Please choose a username.</div>
                                    </div>
                                    <div className="mt-2">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input className={formik.errors.password && formik.touched.password ? "form-control is-invalid" : "form-control"}
                                            onBlur={formik.handleBlur} value={formik.values.password} onChange={formik.handleChange} type="password" name="password" placeholder="Enter Your Password"
                                        />
                                        <div className="valid-feedback">Looks good!</div>
                                        <div className="invalid-feedback">Please choose a username.</div>
                                    </div>
                                    <button type="submit" className="btn btn-primary w-100 mt-3">
                                        Login
                                    </button>
                                    <p className="text-center mt-3">
                                        Dont Have Account? <Link to="/register">Create Account</Link>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login