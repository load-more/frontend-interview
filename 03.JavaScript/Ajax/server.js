const http = require('http')

const server = http.createServer((req, res) => {
  const method = req.method
  const url = req.url

  res.setHeader('content-type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', '*')
  
  const resData = {
    errno: 0,
    data: '请求成功！'
  }

  if (method === 'GET') {
    res.end(JSON.stringify(resData))
  }
})

server.listen(3000)
console.log('listening on 3000...');