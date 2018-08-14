import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
  renderForms = () => {
    if(!this.props.auth) {
      return (
        <div className="navbar-menu is-active">               
          <div className="navbar-end">
            <Link to='/search' className='navbar-item'>Search</Link>
            <Link to='/register' className="navbar-item">Register</Link>
            <Link to='/login' className="navbar-item">Login</Link>
          </div>
        </div>
      )
    } else {
      return (
        <div className="navbar-menu is-active">
            <div className="navbar-end">
              <Link to='/search' className='navbar-item'>Search</Link>
              <Link onClick={this.props.logoutUser} to='/' className="navbar-item">Sign Out</Link>
            </div>
          </div>
      )
    }
  }
  render() {
    return (
      <nav className="navbar is-white">
        <div className="container">
          <div className="navbar-brand">
            <Link to='/' className="navbar-item">TopFivRs</Link>
          </div>
          {this.renderForms()}
        </div>
      </nav>
    )
  }
}

export default Navbar