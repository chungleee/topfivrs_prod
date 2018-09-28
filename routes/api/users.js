const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const { secret } = require('../../config/keys')

// Load user model
const User = require('../../models/User')

// validation functions
const validateRegister = require('../../validation/register')
const validateLogin = require('../../validation/login')

// @route   GET /api/users/test
// @desc    Test the api users test route
// @access  Public
router.get('/test', (req, res) => {
  res.json({msg: 'success'})
})

// @route   POST /api/users/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {
  // validation
  const { errors, isValid } = validateRegister(req.body)

  if(!isValid) {
    return res.status(400).json(errors)
  }

  // destructure from client form field
  const { username, email, password } = req.body
  // check if user already exists by email
  User
    .findOne({email})
    .then((user) => {
      if(user) {
        return res.status(400).json({error: 'Email already exists'})
      }
      const newUser = new User({
        username, email, password
      })
      // password hashing
      // gen salt
      bcrypt.genSalt(10, (err, salt) => {
        // hash
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if(err) throw err
          newUser.password = hash
          newUser
            .save()
            .then((user) => {
              const { id, username } = user
              const payload = { id, username }
              jwt.sign(payload, secret, {expiresIn: 3600}, (err, token) => {
                res.json({
                  token: 'Bearer ' + token,
                  success: true
                })
              })
            })
            .catch((err) => {
              console.log(err)
            })
        })
      })
    })
})

// @route   POST /api/users/login
// @desc    Login user + return JWT
// @access  Public
router.post('/login', (req, res) => {
  // validation
  const { errors, isValid } = validateLogin(req.body)
  
  if(!isValid) {
    return res.status(400).json(errors)
  }

  // destructuring
  const { email, password } = req.body
  // find user by email
  User
    .findOne({email})
    .then((user) => {
      // if not found
      if(!user) {
        errors.user = 'User not found'
        return res.status(404).json(errors)
      }
      // destructure user
      const { id, username, favourites } = user
      // compare password
      bcrypt
        .compare(password, user.password)
        .then((isMatch) => {
          if(isMatch) {
            // assign jwt payload
            const payload = { id, username, favourites }
            // sign token
            jwt
              .sign(payload, secret, {expiresIn:3600}, (err, token) => {
                res.json({
                  success: true,
                  token: 'Bearer ' + token
                })
              })
          } else {
            return res.status(400).json({error: 'Incorrect password/email'})
          }
        })
        .catch((err) => {
          console.log(err)
        })

    })
    .catch((err) => {
      console.log(err)
    })
})

// @route   GET /api/users/current
// @desc    Check current user
// @access  Private
router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
  const { id, username, email } = req.user
  res.json({id, username, email})
})

// @route   POST /api/users/favourite
// @desc    Add to favourites
// @access  Private
router.post('/favourite', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { business_alias } = req.body

  // Find current user
  User
    .findById(req.user.id)
    .then(user => {
      // if user has more than 5 favourites - return error
      if(user.favourites.length >= 5) {
        res.status(400).json({ error: "You can't have more than 5 favourites"})
      }

      // add business_alias to favourites array
      user.favourites.push(business_alias)
      // save
      user.save()
      // res.json result
      res.json(user)
    })
    .catch(err => {
      console.log(err);
    })
})

// @route   GET /api/users/favourite
// @desc    Retrieve all user favourites
// @access  Private
router.get('/favourite', passport.authenticate('jwt', {session:false}), (req, res) => {
  User.findById(req.user.id)
    .then((user) => {
      const { favourites } = user
      res.json({ favourites })
    })
})

module.exports = router