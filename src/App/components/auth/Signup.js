import "./signup.css";
import * as yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { signupApi } from "../../features/authSlice";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Field, Form, Formik, ErrorMessage } from "formik";

const Signup = () => {
  const [profilePic, setProfilePic] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const data = useSelector((state) => state.user);
  const { message, error, loading } = data;
  console.log("res data", data);

  const addUserPic = (e) => {
    setProfilePic(e.target.files[0]);
  };

  useEffect(() => {
    if (error) {
      toast.error(error, { position: toast.POSITION.TOP_CENTER });
    }
    if (message) {
      toast.success(message, { position: toast.POSITION.TOP_CENTER });
      // navigate("/")
    }
  }, [error, message]);

  const initialValues = {
    userName: "",
    userEmail: "",
    password: "",
    city: "",
    state: "",
    // profilePic: "",
  };

  const validationSchema = yup.object().shape({
    userEmail: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    city: yup.string().required("City is required"),
    userName: yup.string().required("Name is required"),
    state: yup.string().required("State is required"),
    // profilePic: yup.mixed().required("Please upload an image file"),
  });

  const handleSubmit = (Values) => {
    console.log("My values", Values);
    let userPic = { ...Values, profilePic: profilePic };
    console.log("***signup data", userPic);
    console.log("handleSubmit data", userPic);
    dispatch(signupApi(userPic));
  };

  return (
    <>
      <ToastContainer autoClose={2000} theme="colored" closeOnClick />

      <section className="vh-100">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black">
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-2 order-lg-1">
                      <img
                        src={require("../../assets/loginpageimage.jpg")}
                        className="img-fluid"
                        alt="Sample img"
                      />
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-5 order-1 order-lg-2">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-">
                        Sign up
                      </p>
                      <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                      >
                        <Form className="mx-1 mx-md-4">
                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                              <Field
                                type="text"
                                id="userName"
                                className="form-control"
                                placeholder="Name"
                                name="userName"
                              />
                              <ErrorMessage
                                name="userName"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>

                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                              <Field
                                type="email"
                                id="userEmail"
                                className="form-control"
                                placeholder="Email"
                                name="userEmail"
                              />
                              <ErrorMessage
                                name="userEmail"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>

                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                              <Field
                                type="password"
                                id="password"
                                className="form-control"
                                placeholder="Password"
                                name="password"
                              />
                              <ErrorMessage
                                name="password"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>

                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                              <Field
                                type="text"
                                id="city"
                                className="form-control"
                                placeholder="City"
                                name="city"
                              />
                              <ErrorMessage
                                name="city"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>

                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                              <Field
                                type="text"
                                id="state"
                                className="form-control"
                                placeholder="State"
                                name="state"
                              />
                              <ErrorMessage
                                name="state"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>

                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-image fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                              <Field
                                type="file"
                                id="profilePic"
                                className="form-control"
                                onChange={addUserPic}
                                placeholder="Profile Pic"
                                name="profilePic"
                              />
                              <ErrorMessage
                                name="profilePic"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>

                          <div className="d-flex justify-content-center mx-100 mb-4 mb-lg-2">
                            <button
                              type="submit"
                              className="btn btn-primary btn-lg"
                              id="bt-lg-big"
                            >
                              Register
                            </button>
                          </div>
                        </Form>
                      </Formik>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
