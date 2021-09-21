console.log('SquareModule is called!!!')

const multiplyModule = require('./multiply')

module.exports = {
  square(a) {
    return multiplyModule.multiply(a)
  }
}