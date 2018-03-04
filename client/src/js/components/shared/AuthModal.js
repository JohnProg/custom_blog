import React, { Component } from 'react';
import { graphql, compose, withApollo } from 'react-apollo';
import { RegisterUser, SignInUser } from '../../graphql/mutation/auth';
import { setToken } from '../../utils/setAuth';

class AuthModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showRegister: false,
      showSignIn: true,
      email: '',
      password: '',
      confirmPassword: '',
      userName: '',
      lastName: '',
      firstName: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmitAuth = this.onSubmitAuth.bind(this);
  }

  onChange(e) {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  async onSubmitAuth(action, e) {
    e.preventDefault();
    if (action === 'register') {
      const registerResult = await this.props.RegisterUserMutation({
        variables: {
          UserInput: {
            email: this.state.email,
            password: this.state.password,
            userName: this.state.userName,
            firstName: this.state.firstName,
            lastName: this.state.lastName
          }
        }
      });
      if (registerResult) {
        const { token } = registerResult.data.AddUser;
        setToken(token);
        this.props.client.resetStore();
      }
    } else {
      const signResult = await this.props.SignInUserMutation({
        variables: {
          UserInput: {
            email: this.state.email,
            password: this.state.password
          }
        }
      });
      if (signResult) {
        const { token } = signResult.data.LogInUser;
        setToken(token);
        this.props.client.resetStore();
      }
    }
  }

  render() {
    const RenderRegisterForm = (
      <form onSubmit={(e) => this.onSubmitAuth('register', e)}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            name="userName"
            value={this.state.userName}
            placeholder="Enter username"
            onChange={this.onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Firstname</label>
          <input
            type="text"
            className="form-control"
            name="firstName"
            value={this.state.firstName}
            placeholder="Enter Firstname"
            onChange={this.onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Lastname</label>
          <input
            type="text"
            className="form-control"
            name="lastName"
            value={this.state.lastName}
            placeholder="Enter Lastname"
            onChange={this.onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input type="email"
            className="form-control"
            name="email"
            value={this.state.email}
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={this.onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={this.state.password}
            placeholder="Password"
            onChange={this.onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            name="confirmPassword"
            value={this.state.confirmPassword}
            placeholder="Confirm Password"
            onChange={this.onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    );

    const RenderSignInForm = (
      <form onSubmit={(e) => this.onSubmitAuth('signin', e)}>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input type="email"
            className="form-control"
            name="email"
            value={this.state.email}
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={this.onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={this.state.password}
            placeholder="Password"
            onChange={this.onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Sign In</button>
      </form>
    );

    const { showRegister, showSignIn } = this.state;

    return (
      <div className="modal fade" id="authModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                <button className="btn" onClick={() => this.setState({ showRegister: true, showSignIn: false })} disabled={showRegister ? true : false}>Register</button>
                / 
                <button className="btn" onClick={() => this.setState({ showRegister: false, showSignIn: true })} disabled={showSignIn ? true : false} >Sign In</button>
              </h5>
              <button type="button" className="close" data-dismiss='modal' aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              { showSignIn ? RenderSignInForm : RenderRegisterForm }
            </div>
          </div>
        </div>
      </div>
    )
  }
};


export default withApollo(compose(
  graphql(RegisterUser, { name: 'RegisterUserMutation' }),
  graphql(SignInUser, { name: 'SignInUserMutation' })
)(AuthModal));

