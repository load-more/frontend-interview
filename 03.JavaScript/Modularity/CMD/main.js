define(function(require, exports, module) {
  const addModule = require('./add')
  const addRes = addModule.add(12, 23)
  console.log(`12 + 23 = ${addRes}`)

  const squareModule = require('./square')
  const squareRes = squareModule.square(24)
  console.log(`24 * 24 = ${squareRes}`)
})