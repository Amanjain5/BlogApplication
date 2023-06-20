import "./login.css";
import * as yup from "yup";
import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css';
import { loginApi } from "../../features/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Field, Form, Formik, ErrorMessage } from "formik";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const data = useSelector((state)=> state.user)
  const {message, error} = data;
  console.log("All data : ", data)

  useEffect(() => {
    if (error) {
      toast.error(error, { position: toast.POSITION.TOP_CENTER });
    }
    if (message) {
      toast.success(message, { position: toast.POSITION.TOP_CENTER });
      navigate("/bloglist")
    }
    
  }, [error, message]);

  const initialValues = {
    userEmail: "",
    password: "",
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
  });

  const handleSubmit = async (Values) => {
  console.log("My value", Values)
   const result = await dispatch(loginApi(Values));
   console.log('Result', result)
  }

  return (
    <>
    <ToastContainer autoClose={2000} theme="colored" closeOnClick />
      <section className="fullsection">
        <div>
          <img id="imglog" src={require("../../assets/3527178.jpg")} alt="" />
        </div>
        <div className="divback">
          <h1 id="loginheading">Login</h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className="empasform">
              <Field
                type="email"
                id="foremal"
                placeholder="Email"
                name="userEmail"
              />
              <p style={{ color: "red", marginLeft: "28px" }}>
                <ErrorMessage name="userEmail" />
              </p>
              <Field
                type="password"
                id="forpass"
                placeholder="Password"
                name="password"
              />
              <p style={{ color: "red", marginLeft: "28px" }}>
                <ErrorMessage name="password" />
              </p>
              <Link className="forglink" to="/forgotpassword">
                <b>Forgot Password?</b>
              </Link>
              <br /> <br />
              <div className="btndiv">
                <button 
                  id="lobunt"
                  type="submit"
                  className="btn btn-primary btn-lg"
                >
                  LOGIN
                </button>
              </div>
              {/* <hr id="hrline" /> */}
              <h3 id="heading3">I don't have an account on Blogapp</h3>
              <Link className="reglink" to="/signup">
                <b>Register Now</b>
              </Link>
            </Form>
          </Formik>
        </div>
      </section>
    </>
  );
};

export default Login;
