import * as yup from "yup";
import "./resetpassword.css";
import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { resetPasswordApi } from "../../features/authSlice";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id, token } = useParams();

  const data = useSelector((state) => state.user);
  const { message, error } = data;

  const initialValues = {
    password: "",
    confirm_password: "",
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

  const validationSchema = yup.object().shape({
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirm_password: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleSubmit = (values) => {
    console.log("Value data = ", values);
    const Values = {
      ...values,
      id: id,
      token: token,
    };
    dispatch(resetPasswordApi(Values));
  };

  return (
    <>
        <ToastContainer autoClose={2000} theme="colored" closeOnClick />
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <Field type="password" placeholder="Password" name="password" />
            <ErrorMessage name="password" component="div" />

            <Field
              type="password"
              placeholder="Confirm Password"
              name="confirm_password"
            />
            <ErrorMessage name="confirm_password" component="div" />

            <button type="submit">Reset Password</button>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default ResetPassword;
