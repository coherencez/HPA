'use strict'
// grab all necessary DOM elements for manipulation
const container = document.getElementById('container')
  ,     display = document.getElementById('display')
  ,   textInput = document.getElementById('input')
  ,  textOutput = document.getElementById('output')
  ,    messages = document.getElementById('messages')
  ,       count = document.getElementById('count')
  ,      button = document.getElementById('button')

// placeholder variables to be defined/used later
let letterCoordinates
  ,      matrix = []
  ,    testWord = 'hello'

/******************** FETCH DATA FOR LED ************************/
fetch('./az09.json')
  .then(response => response.json())
  .then(data => {
    letterCoordinates = data
    console.log(`DATA is loaded`)
  })
  .catch(console.error)
/*****************************************************************/

/******************** HELPER FUNCTIONS ***************************/
const switchOnOrOff = (led) => {
  if(led.className === 'led off') {
    led.className = 'led'
  }
  else {
    led.className = 'led off'
  }
}

const createLetterBox = (id, classAssignment = 'letterBox') => {
  let box = document.createElement('div')
  box.className = classAssignment
  box.setAttribute('id', id)

  return box
}

// add 35 LED divs to each letterbox, attach an onclick
// function to each for turning them on/off - append to DOM
// - add everything to matrix array which holds the entire
// LED board state
const populateLetterBoxWithLEDs = (index) => {
  let lines = []
  for (let i = 0; i < 7; i++) {
    let ledDivs = []
    for (let j = 0; j < 5; j++) {
      let led = document.createElement('div')
      // pre es6 function used for contextual `this`
      led.onclick = function () { switchOnOrOff(this) }
      led.className = 'led off'
      document.getElementById(`letterBox${index}`).appendChild(led)
      ledDivs.push(led)
    }
    lines.push(ledDivs)
  }
  matrix.push(lines)
}

// WIP -- working for first box only right now
const writeLetterToLED = (coordinates) => {
  coordinates.forEach(obj => {
    matrix[obj.i][obj.j][obj.n].className = 'led'
  })
}

const parseUserTextInput = () => {
  if (textInput.value.length > 100) {
    alert('Input too long! Please shorten your input to less than 100 characters')
  }
  else {
    return textInput.value.trim().toUpperCase()
  }
}

const validateTextInput = (e) => {
  const { value } = textInput
    ,       regex = /^[a-z A-Z0-9]+$/ig

  if (regex.test(value)) {
    messages.innerText = ``
  } else if (!regex.test(value) && value.length !== 0) {
    messages.innerText = `Please use only valid alphanumeric characters`
  }
  count.innerText = `${textInput.value.length}/100 chars`
}
/*****************************************************************/

// creates new 7x5 LED box for each letter in given word
const newLetterBoxes = (word) => {
  [...word].forEach((letter, index) => {
    // console.log(letterCoordinates[letter])
    // writeLetterToLED(letterCoordinates[letter])
     display.appendChild(createLetterBox(`letterBox${index}`))
     populateLetterBoxWithLEDs(index)
  })
}
// newLetterBoxes(testWord)

textInput.addEventListener('keyup', validateTextInput)

console.log(`
Matrix[x][y][z] is a 3D array
where:
x = letterBox, y = row, z = LED in row
`, matrix)















/*
  the following was used to build the alphanumeric JSON file
  containg all the coordinates necessary for this test. It is
  currently not needed for the program but is left in to show
  how it was done

const getCoords = () =>  {
  // using destructuring to clone the array for
  // safe manipulation and more declarative syntax
  const [...letterBoxes] = matrix
    ,             coords = []

    letterBoxes.forEach((row, i) => {
      row.forEach((divs, j) => {
        divs.forEach((led, n) => {
          // push a `coordinates` object into our coords array
          // containg the 3 index values for each LED needed to
          // write the alphanumeric characters
          if(led.className === 'led') {
            coords.push( { i, j, n} )
          }
        })
      })
    })
  console.log(JSON.stringify(coords))
}
button.addEventListener('click', getCoords)
*/
