const validator = require('validator')
const isEmpty = require('./isEmpty')

const validateLogin = ({ email, password }) => {
  // init error obj
  let errors = {}

  // check if inputs are empty -> true return ''
  email = !isEmpty(email) ? email : ''
  password = !isEmpty(password) ? password : ''

  // check if valid email
  if(!validator.isEmail(email)) {
    errors.email = 'Email is invalid'
  }

  // check if input fields are empty
  if(validator.isEmpty(email)) {
    errors.email = 'Email field is required'
  }

  if(validator.isEmpty(password)) {
    errors.password = 'Password field is required'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}

module.exports = validateLogin