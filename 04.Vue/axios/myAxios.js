class Axios {
  constructor() {
    this.interceptors = {
      request: new InterceptorsManager(),
      response: new InterceptorsManager()
    }
  }

  // 支持 axios({url:'xxx',method:'xxx'}) 的形式调用
  request(config) {
    // 拦截器和请求组装队列
    let chain = [this.sendAjax.bind(this), undefined] // 成对出现的，失败回调暂时不处理

    // 请求拦截
    this.interceptors.request.handlers.forEach(interceptor => {
      chain.unshift(interceptor.fullfilled, interceptor.rejected)
    })

    // 响应拦截
    this.interceptors.response.handlers.forEach(interceptor => {
      chain.push(interceptor.fullfilled, interceptor.rejected)
    })

    // 执行队列，每次执行一对，并给 promise 赋最新的值
    // 将 config 对象封装成一个 promise 实例，它作为成功回调的参数传入
    let promise = Promise.resolve(config)
    // 通过循环，不断更新 promise 实例，config 对象也随之更新
    while(chain.length > 0) {
      // .then() 左边的为成功回调，参数是上面的 config，右边的为失败回调，无参数
      promise = promise.then(chain.shift(), chain.shift())
    }
    return promise
  }
  // 发送异步请求
  sendAjax(config) {
    return new Promise((resolve, reject) => {
      const { url = '', method = 'get', data = {} } = config
      const xhr = new XMLHttpRequest()
      xhr.open(method, url, true)
      xhr.onreadystatechange = function() {
        if (this.readyState === 4) {
          if (this.status === 200 || this.status === 304) {
            resolve(this.response)
          } else {
            reject(new Error(this.statusText))
          }
        }
      }
      xhr.onerror = function() {
        reject(new Error(this.statusText))
      }
      xhr.responseType = 'json'
      xhr.setRequestHeader('Accept', 'application/json')
      xhr.send(data)
    })
  }
}

// 拦截器实例
class InterceptorsManager {
  constructor() {
    this.handlers = []
  }

  use(fullfilled, rejected) {
    this.handlers.push({
      fullfilled,
      rejected
    })
  }
}


// 定义方法
const methodsArr = ['get', 'delete', 'head', 'options', 'put', 'patch', 'post']

methodsArr.forEach(met => {
  // 将方法挂载到 Axios 的原型上，支持 axios.get('xxx', 'xxx') 的形式调用
  Axios.prototype[met] = function () {
    console.log(`执行 ${met} 方法`)
    // 处理单个方法
    if (['get', 'delete', 'head', 'options'].includes(met)) { // 2个参数(url, config)
      return this.request({
        method: met,
        url: arguments[0],
        ...arguments[1] || {}
      })
    } else { // 3个参数(url, data, config)
      return this.request({
        method: met,
        url: arguments[0],
        data: arguments[1] || {},
        ...arguments[2] || {}
      })
    }
  }
})

const utils = {
  // 向 req 中添加原型上的方法，如 get、post 等
  // a: 实例对象，b: 原型对象
  extend(a, b, context) {
    for (let key in b) {
      if (b.hasOwnProperty(key)) {
        if (typeof b[key] === 'function') {
          a[key] = b[key].bind(context) // 将方法的 this 指向 axios 实例
        } else {
          a[key] = b[key]
        }
      }
    }
  }
}

// 最终导出 axios 的方法，即实例的 request 方法
function CreateAxiosFn() {
  const axios = new Axios() // 创建 axios 实例
  const req = axios.request.bind(axios) // 将 this 指向 axios 实例，并且函数不会立马执行，而是返回一个函数
  // 向 req 中混入方法，如 get、post 等
  utils.extend(req, Axios.prototype, axios)
  // 向 req 中混入 interceptors 对象
  utils.extend(req, axios)
  return req
}

// 导出 axios 实例
const axios = CreateAxiosFn()
/* 
  调用方式：
    1. axios({ url: 'xxx', method: 'xxx' })
    2. axios.get('xxx', 'xxx')
*/