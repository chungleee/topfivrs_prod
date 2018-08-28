const validator = require('validator')
const isEmpty = require('./isEmpty')

const validateRegister = ({ username, email, password, password2 }) => {
  // init errors obj
  let errors = {}

  // check if inputs are empty, if empty, return empty string
  username = !isEmpty(username) ? username : ''
  email = !isEmpty(email) ? email : ''
  password = !isEmpty(password) ? password : ''
  password2 = !isEmpty(password2) ? password2 : ''

  // set username min: 8 max: 20
  if(!validator.isLength(username, {min: 8, max: 20})) {
    errors.username = 'Username must be between 8 and 20 chars'
  }
  // set password min: 8 max: 20
  if(!validator.isLength(password, {min: 8, max: 20})) {
    errors.password = 'Password must be between 8 and 20 chars'
  }

  // check if valid email
  if(!validator.isEmail(email)) {
    errors.email = 'Email is invalid'
  }

  // check if input fields are empty
  if(validator.isEmpty(username)) {
    errors.username = 'Username field is required'
  }
  if(validator.isEmpty(email)) {
    errors.email = 'Email field is required'
  }
  if(validator.isEmpty(password)) {
    errors.password = 'Password field is required'
  }
  if(validator.isEmpty(password2)) {
    errors.password2 = 'You must confirm password'
  }

  if(!validator.equals(password2, password)) {
    errors.password2 = 'Passwords must match'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}

module.exports = validateRegister