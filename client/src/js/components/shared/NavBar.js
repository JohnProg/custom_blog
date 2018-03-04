import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { graphql, withApollo } from 'react-apollo';
import '../../../css/blog.css';
import { getCurrentUser } from '../../graphql/query/users';
import { removeToken } from '../../utils/setAuth';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
    this.signOut = this.signOut.bind(this);
  }

  signOut() {
    removeToken();
    this.props.client.resetStore();
  }

  render() {
    const { error, CurrentUser } = this.props.data;
    if (error) {
      console.log(error.graphQLErrors[0]);
    }
    const authUserNavItems = (
      <div className="collapse navbar-collapse" id="navbarResponsive">
        { !error && CurrentUser ?
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/blog/create/post">Create Post</Link>
            </li>
            <li className="nav-item">
              <a className="nav-link btn" onClick={this.signOut}>Sign Out</a>
            </li>
            <li className="nav-item">
              <a className="nav-link btn">{ CurrentUser.userName }</a>
            </li>
          </ul>
          : null
        }
      </div>
    );
    const guestUserNavItems = (
      <div className="collapse navbar-collapse" id="navbarResponsive">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a className="nav-link btn" data-toggle="modal" data-target="#authModal">Register/Login</a>
          </li>
        </ul>
      </div>
    )
    return (
      <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
        <div className="container">
          <Link className="navbar-brand" to="/">Blogs House</Link>
          <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            Menu
            <i className="fa fa-bars"></i>
          </button>
          { !error && CurrentUser ? authUserNavItems : guestUserNavItems }
        </div>
      </nav>
    )
  }
}

export default withApollo(graphql(getCurrentUser)(NavBar));
