import React, { Component } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { setAuth } from '../../utils/setAuth';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      errors: {}
    }
  }

  handleOnChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleOnSubmit = (e) => {
    // prevent page refresh
    e.preventDefault()
    // destructure state
    const { email, password } = this.state
    // assign to userData
    const userData = { email, password }
    // axios post /api/users/login
    axios
      .post('/api/users/login', userData)
      .then((response) => {
        // destructure
        const { token } = response.data
        localStorage.setItem('jwtToken', token)
        // set token to localStorage
        setAuth(token)
        // decode token
        const decoded = jwt_decode(token)
        // set App state
        this.props.logInUser(decoded)
        // push to /search
        this.props.history.push('/search')
      })
      .catch((error) => {
        this.setState({
          errors: error.response.data
        })
      })
  }

  render() {
    const { errors } = this.state
    return (
      <section className="section">
        <div className="container">
        {errors.user ? <div className='notification is-danger'>{errors.user}</div> : null}
          <form>
            <div className="field">
              <label className="label">Email</label>
                <div className="control">
                  <input 
                      type="email" 
                      placeholder="email"   
                      className="input" 
                      name='email'
                      onChange={this.handleOnChange}
                  />
                </div>
                {errors ? <p className='help is-danger'>{errors.email}</p> : null}
            </div>
            <div className="field">
              <label className="label">Password</label>
              <div className="control">
                <input 
                  type="password" 
                  placeholder="password" 
                  className="input" 
                  name='password'
                  onChange={this.handleOnChange}
                />
              </div>
              {errors ? <p className='help is-danger'>{errors.password}</p> : null}
              {errors ? <p className='help is-danger'>{errors.error}</p> : null}
            </div>
            <div className="field">
              <div className="control">
                <button 
                  onClick={this.handleOnSubmit}
                  type="submit" 
                  className="button is-primary"
                >Log In</button>
              </div>
            </div>
          </form>
        </div>
      </section>
    )
  }
}

export default Login