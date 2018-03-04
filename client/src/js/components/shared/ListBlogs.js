import React from 'react';
import { Link } from 'react-router-dom';

const ListBlogs = ({blog}) => {
  return (
    <div className="row">
      <div className="col-md-7">
        <Link to={`/blog/${blog.blogId}`}>
          <img className="img-fluid rounded mb-3 mb-md-0" src={blog.imgUrl} alt="" />
        </Link>
      </div>
      <div className="col-md-5">
        <h3>{blog.title}</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo, quidem, consectetur, officia rem officiis illum aliquam perspiciatis aspernatur quod modi hic nemo qui soluta aut eius fugit quam in suscipit?</p>
        <Link className="btn-sm btn-primary" to={`/blog/${blog.blogId}`}>Read more</Link>
      </div>
    </div>
  )
};

export default ListBlogs;
