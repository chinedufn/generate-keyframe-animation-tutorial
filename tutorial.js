// We use this to turn our keyframe into a string
// that we can display inside of a div in order
// to better visualize what's going on
var stringifyObject = require('stringify-object')
// We use this to dynamically generate a CSS
// @keyframe string that we can insert into the
// page and use to animation our span
var createKeyframe = require('create-keyframe')
// We use this to insert our dynamically generated
// CSS into our page so that we can use it
var insertCSS = require('insert-styles')

// Create the div that holds a visualization of our
// keyframe's JSON
var jsonDisplay = document.createElement('div')
jsonDisplay.style.whiteSpace = 'pre'
jsonDisplay.style.border = 'solid black 1px'
jsonDisplay.style.backgroundColor = '#00007d'
jsonDisplay.style.color = '#ffff00'
jsonDisplay.style.maxWidth = '500px'
jsonDisplay.style.fontSize = '24px'
jsonDisplay.style.marginBottom = '5px'
jsonDisplay.style.fontFamily = 'Helvetica Neue'
jsonDisplay.style.padding = '5px'
jsonDisplay.style.boxSizing = 'border-box'

// Create the message that we will animate
var userMessage = document.createElement('span')
userMessage.style.fontSize = '36px'
userMessage.style.display = 'block'
userMessage.innerHTML = 'Great Job!'

// Create a button that will change our span's animation
var createAnimationButton = document.createElement('button')
createAnimationButton.style.fontSize = '24px'
createAnimationButton.style.cursor = 'pointer'
createAnimationButton.onclick = generateKeyframe
createAnimationButton.innerHTML = 'Generate keyframe'

// Add our DOM elements to the page
var appContainer = document.querySelector('#generate-keyframe-animation-tutorial') || document.body
appContainer.appendChild(userMessage)
appContainer.appendChild(jsonDisplay)
appContainer.appendChild(createAnimationButton)

// A little function that gives three random colors
function createRandomColors () {
  return [
    (Math.random() * 255).toFixed(0),
    (Math.random() * 255).toFixed(0),
    (Math.random() * 255).toFixed(0),
    1
  ]
}

// Create a new CSS animation, insert it into the page, and then update
// our DOM node to use this animation
function generateKeyframe () {
  var randomColors = createRandomColors()

  // Create a new keyframe CSS keyframe
  // and insert it into the page
  var cssKeyframe
  cssKeyframe = {
    0: {
      color: 'black'
    },
    75: {
      color: `rgba(${randomColors[0]}, ${randomColors[1]}, ${randomColors[2]}, ${randomColors[3]})`,
      fontSize: '48px'
    },
    100: {
      color: 'black'
    }
  }
  var keyframeObj = createKeyframe(cssKeyframe)
  insertCSS(keyframeObj.css, {id: 'animaton-tutorial-keyframe'})

  // Update our JSON display with our new keyframe string
  jsonDisplay.innerHTML = `@keyframe ${keyframeObj.name} ${stringifyObject(cssKeyframe, {indent: '  '})}`
  // Update our animated span with our new CSS animation
  userMessage.style.animation = keyframeObj.name + ' ease 3s infinite'
}

// Start the demo off by generating an animation
generateKeyframe()
