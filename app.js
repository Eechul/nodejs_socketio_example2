var express = require('express')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http);
var path = require('path')
var logger = require('morgan')
var bodyParser = require('body-parser')

var routes = require('./routes/index')



app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', routes.index)

io.on('connection', function(socket) {
  console.log('a user connected')
  socket.on('chat message', function(msg) {
      console.log('message: ' + msg)
  })
  socket.on('disconnect', function(){
      console.log('user disconnected')
  })
})


http.listen(4000, function(){
  console.log('listening on *:4000')
});