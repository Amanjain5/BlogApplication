import React, { useEffect } from "react";
import * as yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";
import { ErrorMessage, Field, Form, Formik } from "formik";

import './forgotpassword.css'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { forgotPasswordApi } from "../../features/authSlice";
import { ToastContainer, toast } from "react-toastify";

const ForgotPassword = () => {
const dispatch = useDispatch();
const navigate = useNavigate();

const data = useSelector((state) => state.user)
const {message, error} = data
console.log("Give me data = ", data)

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
    email: ""
  };

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required")
  });

  const handleSubmit = async (Values) => {
    const result = await dispatch(forgotPasswordApi(Values));
   console.log('Result', result)
    console.log(Values);
  };

  return (
  <>
  <ToastContainer autoClose={2000} theme="colored" closeOnClick />
    <div className="forpassform">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <h3 id="h">Forgot Password</h3><br/>
          <Field type="email" placeholder="Email" name="email" />
          <p style={{ color: "red", marginLeft: "28px" }}>
                <ErrorMessage name="email" />
              </p><br/><br/>
          <button type="submit" className="btn btn-primary btn-sm">
            Submit
          </button>
        </Form>
      </Formik>
    </div>
    </>
  );
};

export default ForgotPassword;
