import "./addblog.css";
import "./bloglist.css";
import * as yup from "yup";
import { useState } from "react";
import Navbar from "../../navbar/Navbar";
import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import { Modal, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createBlogApi } from "../../features/blogSlice";
import { Form, Field, ErrorMessage, Formik } from "formik";
import { blogListApi } from "../../features/blogSlice";

const Bloglist = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dispatchh = useDispatch();

  const user = JSON.parse(localStorage.getItem("user"));
  const { _id } = user || {};

  const [pic, setPic] = useState();

  const blogdata = useSelector((state) => state.blog);
  const { error, message, blog_data = {} } = blogdata;
  console.log("blogdata =", blogdata)
  const { blogs } = blog_data;
  console.log("blogs = ", blogs)

  useEffect(() => {
    if (error) {
      toast.error(error, { position: toast.POSITION.TOP_CENTER });
    }
    if (message) {
      toast.success(message, { position: toast.POSITION.TOP_CENTER });
      // navigate("/")
    }
  }, [error, message]);

  useEffect(()  => {
    dispatchh(blogListApi())
  },[dispatchh])

  const defaultValue = {
    title: "",
    description: "",
  };

  const validationSchema = yup.object().shape({
    title: yup.string().required("Please Enter Title"),
    description: yup.string().required("Please Enter description"),
  });

  const handleSubmit = (values) => {
    console.log("Values:", values);
    const obj = {
      ...values,
      user_id: _id,
      blogPic: pic,
    };
    console.log("obj =", obj);
    dispatch(createBlogApi(obj));
  };

  const picChange = (e) => {
    setPic(e.target.files[0]);
  };

  return (
    <>
    <ToastContainer autoClose={2000} theme="colored" closeOnClick />
      <Navbar />
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body>
          <div className="bodyAddBlog">
            <div className="container-Fluid container-FluidAddBlog">
              <div className="upAddBlog">
                <h2 className="add-descAddblog">Add Blog</h2>
                <Button id="buttwer" variant="primary" onClick={handleClose}>
                  <button
                    id="modbutt"
                    className="btn-close img-cancelAddblog"
                  ></button>
                </Button>
              </div>

              <Formik
                initialValues={defaultValue}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                <Form className="formAddblog">
                  <Field
                    type="text"
                    className="form-control mt-5 form-controlAddBlog"
                    placeholder="Title"
                    name="title"
                  ></Field>
                  <p style={{ color: "red", marginLeft: "28px" }}>
                    <ErrorMessage name="title" />
                  </p>

                  <Field
                    as="textarea"
                    className="form-control mt-4 form-controlAddBlog"
                    placeholder="description"
                    name="description"
                  ></Field>
                  <p style={{ color: "red", marginLeft: "28px" }}>
                    <ErrorMessage name="description" />
                  </p>

                  <input
                    type="file"
                    className="form-control mt-4 form-controlAddBlog"
                    placeholder="BlogPic"
                    name="blogPic"
                    onChange={picChange}
                  ></input>

                  <button
                    type="submit"
                    id="blobnt"
                    className="btn btn-primary btnAddBlog"
                  >
                    Add Blog
                  </button>
                </Form>
              </Formik>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <div className="allblogheading">
        <h2 id="allblogid">All Blog</h2>
        <button
          onClick={handleShow}
          type="button"
          id="libnt"
          className="btn btn-primary"
        >
          ADD BLOG
        </button>
      </div>

      <div className="row justify-content-spacearound container_card">
              {blogs &&
                blogs.map((data) => (
                  <div className="col-4 mb-4 mt-4 " key={data._id}>
                  {console.log("image",data.blogPic)}
                    <Link className="blogLink" to={`/blogdetail/${data._id}`}>
                      <Card id="blogcard" >
                        <Card.Img
                          variant="top"
                          id="cardImage"
                          src={require('../../assets/blogimg1.jpg')}
                        />
                     
                        <Card.Body>
                          <div className="cardTitle">
                            <Card.Title>{data.title}</Card.Title>
                            <p className="date">
                              {data.createdAt.slice(0, 10)}
                            </p>
                          </div>
                          <Card.Text className="mt-3" style={{ color: "grey",height:"80px" }}>
                            {data.description.slice(0,60)}...
                          </Card.Text>
                        </Card.Body>

                        <div className="cardFooter">
                          <div className="" style={{ marginLeft: "10px" }}>
                            {/* {data.user_id} */}
                          </div>
                          <div className="likeComment">
                            {/* <img src={require('../../assets/blogimg1.jpg')}></img>&nbsp;
                            &nbsp;&nbsp;&nbsp;
                            <img src={require('../../assets/blogimg1.jpg')}></img> */}
                          </div>
                        </div>
                      </Card>
                    </Link>
                  </div>
                ))}
                  </div>
      
       
    </>
  );
};

export default Bloglist;
