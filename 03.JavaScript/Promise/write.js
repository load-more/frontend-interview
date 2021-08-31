const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'

class MyPromise {
  constructor(executor) {
    this.status = PENDING
    this.value = undefined
    this.reason = undefined
    this.resolvedCallbacks = []
    this.rejectedCallbacks = []

    const resolve = value => {
      if (value instanceof MyPromise) {
        return value.then(resolve, reject)
      }
      if (this.status === PENDING) {
        this.value = value
        this.status = RESOLVED
        this.resolvedCallbacks.forEach(callback => {
          callback(value)
        })
      }
    }

    const reject = reason => {
      if (this.status === REJECTED) {
        this.reason = reason
        this.status = REJECTED
        this.rejectedCallbacks.forEach(callback => {
          callback(reason)
        })
      }
    }

    try {
      executor(resolve, reject)
    } catch (ex) {
      reject(this.reason)
    }
  }
  then(onfulfilled, onrejected) {
    onfulfilled = typeof onfulfilled === 'function' ? onfulfilled : value => value
    onrejected = typeof onrejected === 'function' ? onrejected : err => { throw err }

    if (this.status === PENDING) {
      this.resolvedCallbacks.push(onfulfilled)
      this.rejectedCallbacks.push(onrejected)
    }
    if (this.status === RESOLVED) {
      onfulfilled(this.value)
    }
    if (this.status === REJECTED) {
      onrejected(this.reason)
    }
  }
}

// test
const str = 'hello'
const p1 = new MyPromise((resolve, reject) => {
  if (str) {
    setTimeout(() => {
      resolve(str)
    }, 1000)
  } else {
    reject(str)
  }
})

p1.then(res => {
  console.log(res, 'world')
})