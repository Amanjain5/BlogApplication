import React from "react";
import Navbar from "../../navbar/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

const Post = () => {
  return (
    <>
      <Navbar />
      <div className="allblogheading">
        <h2 id="allblogid">All Blog</h2>
        <button type="button" id="libnt" className="btn btn-primary">
          ADD BLOG
        </button>
      </div>

      <div className="card-deck">
        <div className="card">
          <img className="card-img-top" src={require("../../assets/blogimg1.jpg")} alt="Card cap" />
          <div className="card-body">
            <h5 className="card-title">Title</h5>
            <p className="card-text">
              vvvfdfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            </p>
            <p className="card-text">
              <small className="text-muted">Last updated 3 mins ago</small>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
