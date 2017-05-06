'use strict'
// THIRD PARTY MODULES
const express = require('express')
  ,       app = express()
  ,bodyParser = require('body-parser')
  ,     fetch = require('node-fetch')

// APP CONSTANTS
const PORT = 3000

// SETTINGS
app.set('port', PORT)
app.set('view engine', 'pug')

// MIDDLEWARE
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}))

// ROUTES
app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', ({ body: { uri }}, res) => {
  console.log(`this is the form request`, uri)
  res.redirect('/')
})

app.listen(PORT, () => console.log(`Now listening on port ${PORT}`))
