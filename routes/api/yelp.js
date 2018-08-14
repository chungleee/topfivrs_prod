const express = require('express')
const router = express.Router()
const passport = require('passport')
const { yelpApiKey } = require('../../config/keys')
const yelp = require('yelp-fusion')

// user model
const User = require('../../models/User')

// yelp authentication 
const client = yelp.client(yelpApiKey)

// @route   GET /api/yelp/test
// @desc    Test yelp private route
// @access  Private
router.get('/test', passport.authenticate('jwt', {session:false}), (req, res) => {
  res.json(req.user)
})

// @route   GET /api/yelp/restaurant
// @desc    Fetch restaurants
// @access  Private
router.post('/restaurant', passport.authenticate('jwt', {session:false}), (req, res) => {
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
router.post('/bar', passport.authenticate('jwt', {session:false}), (req, res) => {
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
router.post('/cafe', passport.authenticate('jwt', {session:false}), (req, res) => {
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