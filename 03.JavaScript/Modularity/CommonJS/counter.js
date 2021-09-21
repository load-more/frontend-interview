let counter = 1
let info = {
  name: 'Tom',
  age: 18,
  hobby: ['basketball']
}

const increase = function() {
  counter++
}
const grow = function() {
  info.age++
}

module.exports = {
  counter,
  increase,
  info,
  grow
}