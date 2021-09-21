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

export {
  counter,
  increase,
  info,
  grow
}