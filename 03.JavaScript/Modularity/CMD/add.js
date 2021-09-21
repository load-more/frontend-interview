define(function(require, exports, module) {
  console.log('AddModule is called!!!')
  module.exports = {
    add(a, b) {
      return a + b
    }
  }
})