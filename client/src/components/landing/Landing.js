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
            <p className="is-size-5 has-text-light">
              <Link to='/register'>Register</Link> or <Link to='/login'>Log In</Link> to get started :)
            </p>
          </div>
        </div>
      </main>
    )
  }
}

export default Landing