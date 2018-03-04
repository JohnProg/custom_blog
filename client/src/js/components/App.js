import React, { Component } from 'react';
import NavBar from './shared/NavBar';
import Footer from './shared/Footer';
import AuthModal from './shared/AuthModal';

class App extends Component {
  render() {
    return (
    <div>
      <NavBar />
      <AuthModal />
      {this.props.children}
      <Footer />
    </div>
  )}
};

export default App;
