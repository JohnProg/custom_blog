import React from 'react';
import { graphql } from 'react-apollo';
import { GetAllBlogsQuery } from '../graphql/query/blogs';
import Header from './shared/Header';
import HomeBG from '../../img/home-bg.jpg';
import ListBlogs from './shared/ListBlogs';

class MainApp extends React.Component {
  render() {
    const { loading, AllBlog } = this.props.data;
    return (
      <div>
        <Header imgBg={HomeBG}/>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-10 mx-auto">
              { loading ? <p>Loading...</p> :
                AllBlog.map((blog, key) => 
                <div key={key}>
                <ListBlogs blog={blog} />
                <hr />
                </div>
                  )
                }
              <hr/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default graphql(GetAllBlogsQuery)(MainApp);
