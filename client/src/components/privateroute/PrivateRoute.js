import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ component: Component, auth, path, ...rest}) => {
  return <Route {...rest} path={path} render={(props) => {
    if(localStorage.jwtToken || auth) {
      return (
        <Component {...props}  />
      )
    } else {
      return (
        <Redirect to='/login' />
      )
    }
  }} />
}

export default PrivateRoute