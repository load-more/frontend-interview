var a = 'hello world'
console.log(a);
new Promise(function(resolve, reject) {
  console.log('promise1');
  resolve('hi1')
}).then(function(res) {
  console.log(res);
})

function first() {
  console.log('Inside first function');
  second()
  setTimeout(function() {
    console.log('timer2');
    new Promise(function(resolve, reject) {
      console.log('promise3');
      resolve('hi3')
    }).then(function(res) {
      console.log(res);
    })
  }, 1000)
}

function second() {
  console.log('Inside second function');
  document.body.style = 'background:black';
  document.body.style = 'background:red';
  document.body.style = 'background:blue';
  document.body.style = 'background:pink';
}

first()

setTimeout(function() {
  console.log('timer1');
  new Promise(function(resolve, reject) {
    console.log('promise4');
    resolve('hi4')
  }).then(function(res) {
    console.log(res);
  })
}, 0)

new Promise(function(resolve, reject) {
  console.log('promise2');
  resolve('hi2')
}).then(function(res) {
  console.log(res);
})

// document.body.style.backgroundColor = 'red'

// new Promise((resolve, reject) => {
//   resolve()
// }).then(() => {
//   document.body.style.backgroundColor = 'black'
// })

// // setTimeout(() => {
// //   document.body.style.backgroundColor = 'green'
// // }, 2000)
