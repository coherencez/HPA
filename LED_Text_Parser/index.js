// grab all necessary DOM elements for manipulation
const container = document.getElementById('container')
  ,     display = document.getElementById('display')
  ,   textInput = document.getElementById('input')
  ,  textOutput = document.getElementById('output')
  ,      matrix = []
  ,        word = 'hello'

const switchOnOrOff = (led) => {
  if(led.className === 'led off') {
    led.className = 'led'
  }
  else {
    led.className = 'led off'
  }
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

const newLetterBox = () => {
  [...word].forEach((letter, index) => {
     let letterBox = document.createElement('div')
     letterBox.setAttribute('class', 'letterBox')
     letterBox.setAttribute('id', `letterBox${index}`)
     display.appendChild(letterBox)

     for (let i = 0; i < 35; i++) {
       let led = document.createElement('div')
       led.onclick = function () {switchOnOrOff(this)}
       led.className = 'led off'
       document.getElementById(`letterBox${index}`).appendChild(led)
     }
  })
}
newLetterBox()
