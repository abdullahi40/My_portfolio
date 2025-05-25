import React from "react";
import "./Blog.css";

function Blog() {
  return (
    <div className="blog-section">
      <div className="blog-container">
        <h1 className="blog-title">blog</h1>
        <p>
          there are many variations of passages of lorem Ipsum avaliable,
          <br />
          but the majority habe suffered alteration.
        </p>
        <div className="blog-cards">
          <div className="blog-card-1">
            <div className="blog-card-image">
              <img
                src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60"
                alt="Blog"
              />
            </div>
            <div className="blog-card-content">
              <h2>Blog Title</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                at quam vel nisi facilisis aliquet.
              </p>
            </div>
          </div>
          <div className="blog-card-2">
            <div className="blog-card-image">
              <img
                src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60"
                alt="Blog"
              />
            </div>
            <div className="blog-card-content">
              <h2>Blog Title</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                at quam vel nisi facilisis aliquet.
              </p>
            </div>
          </div>
          <div className="blog-card-3">
            <div className="blog-card-image">
              <img
                src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60"
                alt="Blog"
              />
            </div>
            <div className="blog-card-content">
              <h2>Blog Title</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                at quam vel nisi facilisis aliquet.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="blog-dots">
        <span className="dots"></span>
        <span className="dots"></span>
        <span className="dot"></span>
        <span className="dot"></span>
      </div>
    </div>
  );
}

export default Blog;
