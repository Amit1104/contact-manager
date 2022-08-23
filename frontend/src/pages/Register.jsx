import React from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { handleRegisterAction } from "./redux/actions/userActioin";
function Register() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "john",
      email: "john@gmail.com",
      password: "123",
      cpassword: "123",
    },
    validationSchema: yup.object({
      name: yup.string().required(),
      email: yup.string().required(),
      password: yup.string().required(),
      cpassword: yup.string().required(),
    }),
    onSubmit: (values) => {
      values.isAdmin = false
      console.log(values);
      dispatch(handleRegisterAction(values));
      navigate("/login");
    },
  });
  const dispatch = useDispatch();
  const register = () => {
    const obj = {
      name: "john",
      email: "john@gmail.com",
      password: "123",
      cpassword: "123",
      isAdmin: false,
    };
  };
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-sm-6 offset-sm-3">
            <div className="card mt-5">
              <div className="card-header">Signup</div>
              <div className="card-body">
                <form onSubmit={formik.handleSubmit}>
                  <div>
                    <label htmlFor="name" className="form-label">
                      First name
                    </label>
                    <input
                      type="text"
                      className={
                        formik.errors.name && formik.touched.name
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      name="name"
                      placeholder="Enter your name"
                    />
                    <div className="valid-feedback">Looks good!</div>
                    <div className="invalid-feedback">Please choose a username.</div>
                  </div>
                  <div className="mt-2">
                    <label htmlFor="email" className="form-label">
                      First Email
                    </label>
                    <input
                      type="text"
                      className={
                        formik.errors.email && formik.touched.email
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      name="email"
                      placeholder="Enter Your Email"
                    />
                    <div className="valid-feedback">Looks good!</div>
                    <div className="invalid-feedback">Please choose a username.</div>
                  </div>
                  <div className="mt-2">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="text"
                      className={
                        formik.errors.password && formik.touched.password
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      name="password"
                      placeholder="Enter Your Password"
                    />
                    <div className="valid-feedback">Looks good!</div>
                    <div className="invalid-feedback">Please choose a password.</div>
                  </div>
                  <div className="mt-2">
                    <label htmlFor="cpassword" className="form-label">
                      Confirm Password
                    </label>
                    <input
                      type="text"
                      className={
                        formik.errors.cpassword && formik.touched.cpassword
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      name="cpassword"
                      placeholder="Confirm Your Password"
                    />
                    <div className="valid-feedback">Looks good!</div>
                    <div className="invalid-feedback">
                      Please Recheck Your Password.
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary w-100 mt-3">
                    Signup
                  </button>
                  <p className="text-center mt-3">
                    Already Have Account? <Link to="/login">Login</Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
