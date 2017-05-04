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

const createLetterBox = (id, classAssignment = 'letterBox') => {
  let box = document.createElement('div')
  box.setAttribute('class', classAssignment)
  box.setAttribute('id', id)

  return box
}

const populateLetterBoxWithLEDs = (index) => {
  let line = []
  for (let i = 0; i < 7; i++) {
    let divs = []
    for (let j = 0; j < 5; j++) {
      let led = document.createElement('div')
      led.onclick = function () {switchOnOrOff(this)}
      led.className = 'led off'
      document.getElementById(`letterBox${index}`).appendChild(led)
      divs.push(led)
    }
    line.push(divs)
  }
  matrix.push(line)
}

const H = [0,0,0,4,1,0,1,4,2,0,2,4,3,0,3,1,3,2,3,3,3,4,4,0,4,4,5,0,5,4,6,0,6,4]

const newLetterBoxes = (word) => {
  [...word].forEach((letter, index) => {
     display.appendChild(createLetterBox(`letterBox${index}`))
     populateLetterBoxWithLEDs(index)
  })
}
newLetterBoxes(testWord)
console.log(`
Matrix[x][y][z] is a 3D array
where:
x = letterBox, y = row, z = LED in row
`, matrix)




// const write = (arr) => {
//   var i = 0;
//   while (i < arr.length){
//     matrix[arr[i++]][arr[i++]].className = "led";
//   }
// }
// write(H)
