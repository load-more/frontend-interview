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
      if (this.status === PENDING) {
        this.reason = reason
        this.status = REJECTED
        this.rejectedCallbacks.forEach(callback => {
          callback(reason)
        })
      }
    }

    // 执行同步代码可能出错，所以要进行异常处理
    try {
      executor(resolve, reject)
    } catch (ex) {
      reject(this.reason)
    }
  }
  then(onfulfilled, onrejected) {
    onfulfilled = typeof onfulfilled === 'function' ? onfulfilled : value => value
    onrejected = typeof onrejected === 'function' ? onrejected : err => { throw err }

    // 等待
    if (this.status === PENDING) {
      this.resolvedCallbacks.push(onfulfilled)
      this.rejectedCallbacks.push(onrejected)
    }
    
    // 成功
    if (this.status === RESOLVED) {
      onfulfilled(this.value)
    }
    // 失败
    if (this.status === REJECTED) {
      onrejected(this.reason)
    }
  }
  catch() {
    //
  }
  finally() {
    //
  }
}

// test
const a = 'string'
const p1 = new MyPromise((resolve) => {
  resolve(111)
})
new MyPromise((resolve, reject) => {
  if (a) {
    setTimeout(() => {
      resolve(p1)
    }, 0)
  } else {
    reject('error')
  }
}).then(res => {
  console.log(res)
}, err => {
  console.log(err)
})