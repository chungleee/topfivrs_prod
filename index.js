const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const path = require('path')
const { mongoURI } = require('./config/keys')

// load routes
const users = require('./routes/api/users')
const yelp = require('./routes/api/yelp')

const app = express()

// middleware
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(passport.initialize())

// router
app.use('/api/users', users)
app.use('/api/yelp', yelp)

// serve static assets if in prod
if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')))

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'))
  })
}

// passport config
require('./config/passport')(passport)

// mongoose connection
mongoose
  .connect(mongoURI, {useNewUrlParser:true})
  .then(console.log('*****Mongoose connected*****'))
  .catch(err => console.log(err))

// local server
const port = process.env.PORT || 8000
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`)
})