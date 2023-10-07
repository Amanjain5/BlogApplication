import React, { useState } from "react";
import "./blogdetail.css";
import * as yup from "yup";
import Navbar from "../../navbar/Navbar";
import addComent from "../../assets/addComent Pic.png";
// import imgblog from "../assets/camel blog.jpg";
// import imgcmnt from "../assets/comment.jpg.png";
// import imglike from "../assets/like.jpgf.png";
import { useSelector } from "react-redux";
import { blogDetailApi } from "../../features/blogSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { Form, Field, ErrorMessage, Formik } from "formik";
import { addComment } from "../../features/commentSlice";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol,
  MDBBtn,
} from "mdb-react-ui-kit";


const BlogDetails = () => {
  const [display, setdisplay] = useState(false);
  const displayhandleClose = () => setdisplay(false);
  const displayhandleShow = () => setdisplay(true);

  const { id } = useParams();
  // console.log('detail id', id)
  const dispatch = useDispatch();

  const blogdetail = useSelector((state) => state.blog);
  const { blog_data } = blogdetail;
  const { title, user_id, description, blogPic } = blog_data;
  console.log('detail data', blog_data)
  const { userName } = { ...user_id };
  console.log('detail userid', user_id)

  const commentDetails = useSelector((state) => state.commentadd);
  console.log("commentdetails", commentDetails);
  const { commentMessage } = commentDetails;
  const { _id, comment } = commentMessage;

  const defaultvalue = {
    comment: "",
  };

  const defaultvalidationSchema = yup.object().shape({
    comment: yup.string().required("please enter Comment"),
  });

  const defaulthandlesubmit = (values) => {
    const obj = {
      ...values,
      user_id: id,
      blog_id: id,
    };
    console.log("datasss", obj);
    dispatch(addComment(obj));
  };

  useEffect(() => {
    dispatch(blogDetailApi(id));
  }, []);

  return (
    <>
      <Navbar />
      <br />
      <br />
      <div className="blogd-box">
        <div className="blogd-boxs">
          <div id="widthdiv">
            <img id="blogd-img" src={`http://localhost:7000${blogPic}`} alt="" ></img>
          </div>
          <div>
            <h4 id="blogd-name">{title}</h4>
            {/* {console.log('detail title', title)} */}
            <p id="blogd-p1">{description}</p>
            {/* {console.log('detail description', description)} */}
            <p>{userName}</p>
            {/* {console.log('detail username', userName)} */}
            <div className="blogd-like-cmnt">
              {/* <img id="blogd-cmnt" src={`http://localhost:7000${blogPic}`}></img> */}
              {/* <img id="blogd-like" src={`http://localhost:7000${blogPic}`}></img> */}
            </div>
          </div>
        </div>
      </div>

      <Modal
        show={display}
        onHide={displayhandleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body>
          <div className="">
            <Button variant="" onClick={displayhandleClose}>
              <img id="cancel" src={addComent} alt="" ></img>
            </Button>
            <h1 className="text-center" id="heading">
              Add Comment{" "}
            </h1>
            <br />
            <Formik
              initialValues={defaultvalue}
              validationSchema={defaultvalidationSchema}
              onSubmit={defaulthandlesubmit}
            >
              <Form>
                <div className="form-outline mb-4">
                  <Field
                    type="text"
                    maxlength="50"
                    id="formfield"
                    name="comment"
                    className="form-control"
                    placeholder="Enter Your Comment"
                  />
                  <p className="errorMessage">
                    <ErrorMessage name="comment"></ErrorMessage>
                  </p>
                </div>

                <div></div>
                <div className="buttonsubmit">
                  <button
                    type="submit"
                    id="submitButton"
                    className="btn btn-primary btn-block mb-4 "
                  >
                    Submit
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </Modal.Body>
      </Modal>

      {/* <MDBRow>
            {comment.length > 0 ? (
              <h2 style={{ marginBottom: "40px" }}>Comment Section</h2>
            ) : (
              <h2>""</h2>
            )}
            {comment &&
              comment.map(({ comment, user_id, createdAt }) => (
                <MDBCol sm="4" >
                  <MDBCard>
                    <MDBCardBody >
                      <MDBCardTitle>
                        <img
                          id="Userprofile"
                          src={`http://localhost:7000${user_id.profilePic}`}
                          alt=""
                        ></img>{" "}
                        <span style={{ marginLeft: "10px" }}>
                          {user_id.userName}
                        </span>
                      </MDBCardTitle>
                      <MDBCardText>{comment}</MDBCardText>
                      <br />
                      Date:{createdAt.slice(0, 10)}
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              ))}
          </MDBRow> */}



    </>
  );
};

export default BlogDetails;
