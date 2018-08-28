const validator = require('validator')
const isEmpty = require('./isEmpty')

const validateLocation = ({ location }) => {
  let errors = {}

  // check if field is empty -> true then turn into empty str
  location = !isEmpty(location) ? location : ''

  // check if field is empty
  if(validator.isEmpty(location)) {
    errors.location = 'Your location is required to search'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}

module.exports = validateLocation