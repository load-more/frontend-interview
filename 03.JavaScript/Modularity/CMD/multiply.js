define(function(require, exports, module) {
  console.log('MultiplyModule is called!!!')
  module.exports = {
    multiply(a) {
      return a * a
    }
  }
})