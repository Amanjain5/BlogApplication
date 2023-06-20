import React from "react";
// import "./BlogDetails.css";
import Navbar from "../../navbar/Navbar";
// import imgblog from "../assets/camel blog.jpg";
// import imgcmnt from "../assets/comment.jpg.png";
// import imglike from "../assets/like.jpgf.png";
import { useSelector } from "react-redux";
import { blogDetailApi } from "../../features/blogSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const BlogDetails = () => {
  const { id } = useParams();
  console.log('detail id', id)
  const dispatch = useDispatch();

  const blogdetail = useSelector((state) => state.blog);
  console.log("stateblog =", blogdetail);
  const { blog_data } = blogdetail;
  console.log('detail blogdata', blogdetail)
  const { title, user_id, description, blogPic } = blog_data;
  console.log('detail data', blog_data)
  const { userName } = { ...user_id };
  console.log('detail userid', user_id)

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
          <div>
            <img id="blogd-img" src={`http://localhost:7000${blogPic}`}></img>
          </div>
          <div>
            <h4 id="blogd-name">{title}</h4>
            {console.log('detail title', title)}
            <p id="blogd-p1">{description}</p>
            {console.log('detail description', description)}
            <p>{userName}</p>
            {console.log('detail username', userName)}
            <div className="blogd-like-cmnt">
              {/* <img id="blogd-cmnt" src={`http://localhost:7000${blogPic}`}></img> */}
              {/* <img id="blogd-like" src={`http://localhost:7000${blogPic}`}></img> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogDetails;
