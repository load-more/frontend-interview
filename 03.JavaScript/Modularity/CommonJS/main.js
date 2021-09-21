const addModule = require('./add')
const addRes = addModule.add(12, 23)
console.log(`12 + 23 = ${addRes}`)

const squareModule = require('./square')
const squareRes = squareModule.square(24)
console.log(`24 * 24 = ${squareRes}`)

// test
const { counter, increase, info, grow } = require('./counter')

console.log(counter) // 1
increase()
console.log(counter) // 1

console.log(info) // { name: 'Tom', age: 18, hobby: [ 'basketball' ] }
grow()
console.log(info) // { name: 'Tom', age: 19, hobby: [ 'basketball' ] }