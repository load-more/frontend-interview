define(['./multiply'], function(multiplyModule) {
  console.log('SquareModule is called!!!')
  return {
    square(a) {
      return multiplyModule.multiply(a)
    }
  }
})