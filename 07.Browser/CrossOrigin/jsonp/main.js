// jsonp 实现跨域

// 动态添加 <script>
function addScript(src) {
  const script = document.createElement('script')
  script.src = src
  script.type = 'text/javascript'
  document.body.appendChild(script)
}

// 添加 src，获取到返回结果，如 `jsonpCallback({name: 'xxx', gender: 'yyy'})`
addScript('http://localhost:3000')

// 回调，供返回数据调用
function jsonpCallback(res) {
  console.log(res);
}
