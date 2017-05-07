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
app.get('/', (req, res) => res.render('index'))

app.post('/', ({ body: { uri }}, res) => {

  fetch(uri)
    .then(response => response.text())
    .then(html => {
      const     $ = load(html)
        ,   aTags = $('a')
        // , offsite = filterOffsite(aTags, uri.toString())
        , offsite = []
         aTags.each((x, y) => {
          if(typeof y.attribs.href === 'string') {
            if(!y.attribs.href.includes(uri)) {
              offsite.push(y.attribs.href)

            } else {
              () => {}

            }
          }
        })
        console.log(offsite)
    })
    .catch(console.error)

  res.redirect('/')
})

function filterOffsite (arr, uri) {
  const newArray = []

  arr.forEach(obj => {
    // console.log(obj.attribs.href)
    if(typeof obj.attribs.href === 'string') {
      if(obj.attribs.href.inlcudes(uri)) {
        () => {}
      } else {
        newArray.push(obj.attribs.href)
      }
    }
  })

  return newArray
}

app.listen(PORT, () => console.log(`Now listening on port ${PORT}`))
