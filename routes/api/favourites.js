const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

// Load models
const Favourite = require('../../models/Favourite')

// @route   GET /api/favourites/test
// @desc    Test the api favourites test route
// @access  Public
router.get('/test', (req, res) => {
  res.json({ msg: "success"})
})

// @route   POST /api/favourites/
// @desc    Save a favourite business to user
// @access  Private

module.exports = router