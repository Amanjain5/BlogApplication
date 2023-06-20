// import React from "react";
// import "./addblog.css";
// import * as yup from "yup";
// import { Modal, Button } from "react-bootstrap";
// import { useState } from "react";
// import { Form, Field, ErrorMessage, Formik } from "formik";


// const Addblog = () => {
//   const [show, setShow] = useState(false);
//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   const defaultValue = {
//     title: "",
//     description: "",
//   };

//   const validationSchema = yup.object().shape({
//     title: yup.string().required("Please Enter Title"),
//     description: yup.string().required("Please Enter description"),
//   });

//   const handleSubmit = (values) => {
//     console.log("Values:", values);
//   };

//   return (
//     <>
//     <h1>aman</h1>
//       <Modal
//         show={show}
//         onHide={handleClose}
//         backdrop="static"
//         keyboard={false}
//       >
//         <Modal.Body>
//           <div className="bodyAddBlog">
//             <div className="container-Fluid container-FluidAddBlog">
//               <div className="upAddBlog">
//                 <h2 className="add-descAddblog">Add Blog</h2>
//                 <Button variant="primary" onClick={handleClose}>
//                   <img
//                     className="img-cancelAddblog"
//                     id="cancel"
//                     src="/sf"
//                     alt="img"
//                     name="blogPic"
//                   ></img>
//                 </Button>
//               </div>

//               <Formik
//                 initialValues={defaultValue}
//                 validationSchema={validationSchema}
//                 onSubmit={handleSubmit}
//               >
//                 <Form>
//                   <form className="formAddblog">
//                     <Field
//                       type="text"
//                       className="form-control mt-5 form-controlAddBlog"
//                       placeholder="Title"
//                       name="title"
//                     ></Field>
//                     <Field
//                       as="textarea"
//                       className="form-control mt-4 form-controlAddBlog"
//                       placeholder="description"
//                       name="description"
//                     ></Field>
//                     <button id="blobnt" className="btn btn-primary btnAddBlog">
//                       Add Blog
//                     </button>
//                   </form>
//                 </Form>
//               </Formik>
//             </div>
//           </div>
//         </Modal.Body>
//       </Modal>
//     </>
//   );
// };

// export default Addblog;
