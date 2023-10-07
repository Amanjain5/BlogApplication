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
  const { error, message, blog_data } = blogdata ;
  console.log("blogdata =", blogdata);
  const { blogs } = blog_data;
  console.log("blogs = ", blogs);

  useEffect(() => {
    if (error) {
      toast.error(error, { position: toast.POSITION.TOP_CENTER });
    }
    if (message) {
      toast.success(message, { position: toast.POSITION.TOP_CENTER });
      // navigate("/")
    }
  }, [error, message]);

  useEffect(() => {
    dispatchh(blogListApi());
  }, [dispatchh]);

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

      <div className="container-Bloglist container">
        <div className="cardbodyBloglist container ">
          {blogs &&
            blogs.map((data) => (
              <div className="" key={data._id}>
                {console.log("image", data.blogPic)}
                <Link
                  className="text-decoBloglist"
                  to={`/blogdetail/${data._id}`}
                >
                  <div class="card cardBloglist tor-flip">
                    <img
                      class="card-img-top card-img-topBloglist"
                      src={`http://localhost:7000${data.blogPic}`}
                      alt="Card image"
                    ></img>
                    <div class="card-body">
                      <div className="titleBloglist">
                        <h4 class="card-titleBloglist">{data.title}</h4>
                        <h4 class="card-dateBloglist">
                          {data.createdAt.slice(0, 10)}
                        </h4>
                      </div>
                      <p class="card-text">{data.description.slice(0, 100)}</p>
                      <div className="bottom-cardbloglist">
                        <h4 class="card-dateBloglist">
                          {data.user_id.userName}
                        </h4>
                        <div className="img-likeBloglist">
                          {/* <img className='message-imgBloglist' src={message_icon}></img>
                    <img className='like-imgBloglist' src={like_icon} ></img> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>

      <hr className="hr-bloglist"></hr>

      <div className="footer-bloglist ">
        <div className="footer-hdrbloglist row">
          <div className="footer1-bloglist col-4 row">
            {/* <img src={blog_logo} className='logo-bloglist'></img> */}
            <h6 className="footer1-list-h1bloglist1">Contact information</h6>
            <h6 className="footer1-list-h1bloglist1">Social media icons</h6>
            <h6 className="footer1-list-h1bloglist1">Email sign-up form</h6>
            <h6 className="footer1-list-h1bloglist1">Links to resources</h6>
            <h6 className="footer1-list-h1bloglist1">
              Popular or recent posts
            </h6>
          </div>
          <div className="footer1-bloglist2 col-2">
            <div>
              <h5 className="mb-3">Company Info</h5>
              <h6 className="footer1-list-h1bloglist">About Us</h6>
              <h6 className="footer1-list-h1bloglist">Careers</h6>
              <h6 className="footer1-list-h1bloglist">FAQ</h6>
            </div>
          </div>
          <div className="footer1-bloglist3 col-2">
            <div>
              <h5 className="mb-3">Information</h5>
              <h6 className="footer1-list-h1bloglist">Customer Service</h6>
              <h6 className="footer1-list-h1bloglist">Woot's Return Policy</h6>
              <h6 className="footer1-list-h1bloglist">Product Warranty</h6>
            </div>
          </div>
          <div className="footer1-bloglist4 col-2">
            <div>
              <h5 className="mb-3">Customer Care</h5>
              <h6 className="footer1-list-h1bloglist">Facebook</h6>
              <h6 className="footer1-list-h1bloglist">Twitter</h6>
              <h6 className="footer1-list-h1bloglist">Forums</h6>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Bloglist;
