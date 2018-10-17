import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './Landing.css'

class Landing extends Component {
  render() {
    return (
      <main className="hero is-fullheight is-relative">
        <div className="is-overlay bg-img"></div>
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1 className="title is-1 has-text-light">Welcome to <strong>TopFivRs</strong></h1>
            <h2 className="subtitle has-text-light">Find local eats and drinks by entering your current location!</h2>
            
            {
              this.props.auth
              ? <p className="is-size-3 has-text-light">
                  Start <Link className='link' to='/search'>searching</Link>!
                </p>
              : <p className="is-size-3 has-text-light link">
                  <Link className='link' to='/register'><strong>Register</strong></Link> or <Link className='link' to='/login'><strong>Log In</strong></Link> to get started :)
                </p>
            }
          </div>
        </div>
      </main>
    )
  }
}

export default Landing