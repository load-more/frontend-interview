require(['./add', './square'], function(addModule, squareModule) {
  const addRes = addModule.add(11, 22)
  console.log(`11 + 22 = ${addRes}`)
  const squareRes = squareModule.square(15)
  console.log(`15 * 15 = ${squareRes}`)
})