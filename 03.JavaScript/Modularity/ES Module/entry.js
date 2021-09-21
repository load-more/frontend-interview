import { add } from './add.js'
import { square } from './square.js'
import { counter, increase, info, grow } from './counter.js'

const addRes = add(11, 22)
console.log(`11 + 22 = ${addRes}`)

const squareRes = square(15)
console.log(`15 * 15 = ${squareRes}`)

// test
console.log(counter) // 1
increase()
console.log(counter) // 2

console.log(info) // { name: 'Tom', age: 18, hobby: [ 'basketball' ] }
grow()
console.log(info) // { name: 'Tom', age: 19, hobby: [ 'basketball' ] }