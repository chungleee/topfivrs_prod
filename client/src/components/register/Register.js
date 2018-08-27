import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import { setAuth } from '../../utils/setAuth';

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      password: '',
      password2: '',
      errors: {}
    }
  }

  handleOnChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleOnReset = () => {
    this.setState({
      username: '',
      email: '',
      password: '',
      password2: '',
      errors: {}
    })
  }

  handleOnSubmit = (e) => {
    // prevent refresh
    e.preventDefault()
    // destructure
    const { username, email, password, password2 } = this.state
    // assign to userData
    const userData = { username, email, password, password2 }
    // axios.post
    axios
      .post('/api/users/register', userData)
      .then((response) => {
        const { status } = response
        const { token } = response.data

        // store token to localStorage
        localStorage.setItem('jwtToken', token)
        // setAuth to set headers
        setAuth(token)

        // decode and set state
        const decoded = jwt_decode(token)
        const username = decoded.username

        const user = { username }
        if(response && status === 200) {
          this.props.logInUser(user)
          this.props.history.push('/search')
        }
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
          <form>
            <div className="field">
              <label className="label">Username</label>
              <div className="control">
                <input 
                  type="text" 
                  placeholder="username" 
                  name="username" 
                  className="input" 
                  onChange={this.handleOnChange}
                />
                </div>  
                { errors ? <p className='help is-danger'>{errors.username}</p> : null}
            </div>
            <div className="field">
              <label className="label">Email</label>
              <div className="control">
                <input
                  name='email'
                  type="email" 
                  placeholder="email"   
                  className="input"
                  onChange={this.handleOnChange} 
                />
              </div>
              { errors ? <p className='help is-danger'>{errors.email}</p> : null}
            </div>
            <div className="field">
              <label className="label">Password</label>
              <div className="control">
                <input 
                  name='password'
                  type="password" 
                  placeholder="password" 
                  className="input"
                  onChange={this.handleOnChange} 
                />
              </div>
              { errors ? <p className='help is-danger'>{errors.password}</p> : null}
            </div>
            <div className="field">
              <label className="label">Confirm Password</label>
              <div className="control">
                <input 
                  name='password2'
                  type="password" 
                  className="input"
                  onChange={this.handleOnChange} 
                />
              </div>
              { errors ? <p className='help is-danger'>{errors.password2}</p> : null}
            </div>
            <div className="field is-grouped">
              <div className="control">
                <button 
                  onClick={this.handleOnSubmit}
                  type="submit" 
                  className="button is-primary"
                >Register</button>
              </div>
              <div className="control">
                <button
                  type="reset" 
                  className="button"
                  onClick={this.handleOnReset}
                >Reset</button>
              </div>
            </div>
          </form>
        </div>
      </section>
    )
  }
}

export default Register