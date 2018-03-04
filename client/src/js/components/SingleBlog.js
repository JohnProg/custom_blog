import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { GetOneBlogQuery } from '../graphql/query/blogs';
import '../../css/blog.css';

class SingleBlog extends Component {
  render() {
    const { loading, OneBlog } = this.props.data;
    return (
      <div>
        { loading ? 'Loading' :
          <div>
            <br />
            <br />
            <article>
              <div className="container">
                <p dangerouslySetInnerHTML={{__html: OneBlog.content}}></p>
              </div>
            </article>
        </div>
        }
      </div>
    )
  }
}

export default graphql(GetOneBlogQuery, {
  options: (props) => ({ variables: { blogId: props.match.params.blogId } })
})(SingleBlog);
