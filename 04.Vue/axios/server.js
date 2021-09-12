const express = require('express')
const app = express()

//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  // res.header('Access-Control-Allow-Headers', 'Content-Type')
  // res.header('Access-Control-Allow-Methods', '*')
  // res.header('Content-Type', 'application/jsoncharset=utf-8')
  next()
})

app.get('/getTest', function(request, response){
  const data = {
    name: 'Tom',
    gender: 'male',
    age: 18
  }
  response.json(data)
})

const server = app.listen(8000, function(){
    console.log("服务器启动，端口：8000")
})