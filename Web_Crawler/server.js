'use strict'
// THIRD PARTY MODULES
const express = require('express')
  ,       app = express()
  ,bodyParser = require('body-parser')
  ,     fetch = require('node-fetch')
  ,  { load } = require('cheerio')

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

  fetch(uri)
    .then(response => response.text())
    .then(html => {
      const $ = load(html)
      const aTags = Array.from($('a'))
      // const offsite = aTags.filter(el => {
      //   if(typeof el.attribs.href === 'string') {
      //     console.log('hey', el.attribs.href)
      //     return !el.attribs.href.includes(uri)
      //   }
      // })
    })
    .catch(console.error)

  res.redirect('/')
})

app.listen(PORT, () => console.log(`Now listening on port ${PORT}`))
