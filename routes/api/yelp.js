const express = require('express')
const router = express.Router()
const passport = require('passport')
const { yelpApiKey } = require('../../config/keys')
const yelp = require('yelp-fusion')

// user model
const User = require('../../models/User')

// validation
const validateLocation = require('../../validation/yelp')

// yelp authentication 
const client = yelp.client(yelpApiKey)

// @route   GET /api/yelp/business
// @desc    Fetch business by alias
// @access  Private
// , passport.authenticate('jwt', {session:false})
router.post('/business', (req, res) => {
  const { alias } = req.body
  client
    .business(alias)
    .then((response) => {
      res.json(response.jsonBody)
    })
    .catch((error) => {
      console.log(error);
    })
})

// @route   GET /api/yelp/restaurant
// @desc    Fetch restaurants
// @access  Private
// , passport.authenticate('jwt', {session:false})
router.post('/restaurant', (req, res) => {
  const { errors, isValid } = validateLocation(req.body)

  if(!isValid) {
    res.status(400).json(errors)
  }
  
  // destructure location from body
  const { location } = req.body
  // client search based on location
  client
    .search({
      categories: 'restaurants',
      sort_by: 'distance',
      open_now: true,
      limit: 5,
      location
    })
    .then((response) => {
      res.json(response.jsonBody)
    })
    .catch((error) => {
      console.log(error)
    })
})

// @route   GET /api/yelp/bar
// @desc    Fetch bars
// @access  Private
// , passport.authenticate('jwt', {session:false})
router.post('/bar', (req, res) => {
  const { errors, isValid } = validateLocation(req.body)

  if(!isValid) {
    res.status(400).json(errors)
  }
  
  // destructure location from body
  const { location } = req.body
  // client search based on location
  client
    .search({
      categories: 'bars',
      sort_by: 'distance',
      open_now: true,
      limit: 5,
      location
    })
    .then((response) => {
      res.json(response.jsonBody)
    })
    .catch((error) => {
      console.log(error)
    })
})

// @route   GET /api/yelp/cafe
// @desc    Fetch cafe
// @access  Private
// , passport.authenticate('jwt', {session:false})
router.post('/cafe', (req, res) => {
  const { errors, isValid } = validateLocation(req.body)

  if(!isValid) {
    res.status(400).json(errors)
  }
  
  // destructure location from body
  const { location } = req.body
  // client search based on location
  client
    .search({
      categories: 'cafes, coffee, coffeeroasteries',
      sort_by: 'distance',
      open_now: true,
      limit: 5,
      location
    })
    .then((response) => {
      res.json(response.jsonBody)
    })
    .catch((error) => {
      console.log(error)
    })
})

module.exports = router