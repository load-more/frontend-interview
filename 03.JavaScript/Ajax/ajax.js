// --------------------------普通写法---------------------------
// 1.创建XHR
var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP')
// 2.配置Ajax请求地址
xhr.open('get', 'index.html', true) // 异步：true
// 3.发送请求
xhr.send(null)
// 4.监听请求，接收响应
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4 && xhr.status === 200 || xhr.status === 304) {
    console.log('SUCESSFUL!!!');
  }
}


// --------------------------Promise---------------------------
function getJSON(url) {
  return new Promise((resolve, reject) => {
    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP')
    xhr.open('GET', url, true)
    xhr.onreadystatechange = function() {
      if (this.readyState !== 4) return
      if (this.status === 200) {
        resolve(this.response)
      } else {
        reject(new Error(this.statusText))
      }
    }
    xhr.onerror = function() {
      reject(new Error(this.statusText))
    }
    xhr.responseType = 'json'
    xhr.setRequestHeader('Accept', 'application/json')
    xhr.send(null)
  })
}