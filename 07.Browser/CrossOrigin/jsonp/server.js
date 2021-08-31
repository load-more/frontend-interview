const http = require('http')

const data =  {
  name: 'Akina',
  gender: 'female',
  age: 22
}

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, {
      'Content-Type': 'application/json;charset=utf-8'
    })
    res.end(`jsonpCallback(${JSON.stringify(data)})`)
  }
})

server.listen(3000, () => {
  console.log('server is running at port 3000...');
})