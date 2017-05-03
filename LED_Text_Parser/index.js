// grab all necessary DOM elements for manipulation
const container = document.getElementById('container')
  ,     display = document.getElementById('display')
  ,   textInput = document.getElementById('input')
  ,  textOutput = document.getElementById('output')
  ,      matrix = []
  ,    testWord = 'hello'

const switchOnOrOff = (led) => {
  if(led.className === 'led off') {
    led.className = 'led'
  }
  else {
    led.className = 'led off'
  }
}

const createLetterBox = (id, assignedClass = 'letterBox') => {
  let box = document.createElement('div')
  box.setAttribute('class', assignedClass)
  box.setAttribute('id', id)

  return box
}
// const newLine = () => {
//   let line = []
//   for (let i = 0; i < 25; i++) {
//     let led = document.createElement('div')
//     led.onclick = function () {switchOnOrOff(this)}
//     led.className = 'led off'
//     display.appendChild(led)
//     line[i] = led
//   }
//   return line
// }

// for (let i = 0; i < 7; i++)
//   matrix[i] = newLine()

const newLetterBox = (word) => {
  [...word].forEach((letter, index) => {
     display.appendChild(createLetterBox(`letterBox${index}`))

     for (let i = 0; i < 35; i++) {
       let led = document.createElement('div')
       led.onclick = function () {switchOnOrOff(this)}
       led.className = 'led off'
       document.getElementById(`letterBox${index}`).appendChild(led)
     }
  })
}
newLetterBox(testWord)
