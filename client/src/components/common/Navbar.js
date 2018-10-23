import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
  state = {
    isHovered: false
  }

  handleHover = () => {
    this.setState({
      isHovered: !this.state.isHovered
    })
  }

  renderForms = () => {
    if(!this.props.auth) {
      return (
        <div onMouseLeave={this.handleHover} className={this.state.isHovered ? "navbar-menu is-active" : "navbar-menu"}>               
          <div className="navbar-end">
            <Link to='/search' className='navbar-item'>Search</Link>
            <Link to='/register' className="navbar-item">Register</Link>
            <Link to='/login' className="navbar-item">Login</Link>
          </div>
        </div>
      )
    } else {
      return (
        <div onMouseLeave={this.handleHover} className={this.state.isHovered ? "navbar-menu is-active" : "navbar-menu"}>
            <div className="navbar-end">
              <Link to='/search' className='navbar-item'>Search</Link>
              <Link to='/favourite' className='navbar-item'>Favourites</Link>
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

            <a 
              onClick={this.handleHover} 
              role="button" 
              className="navbar-burger"
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>
          {this.renderForms()}
        </div>
      </nav>
    )
  }
}

export default Navbar