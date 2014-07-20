var express = require('express')
  , app = express()

var pointlessFormTemplate = '<html><body><form method="POST" action="/admin/users"><label>foo</label><input type="text" name="foo" value="bar"><button type="submit">Submit</button></body></html>'

function genericRoute(req,res) {
  var strToSend = '[' + req.method + '] You hit: ' + req.path + '. We just wanted to let you know, in case you didn\'t believe your URL bar'

  if (req.body) {
    strToSend += '<p>You also had this request body: ' + require('util').inspect(req.body)
  }

  res.send(strToSend)
}

function formRoute(req,res) {
  res.send(pointlessFormTemplate)
}

function ensureAdmin(req,res,next) {
  console.log('Gee, I sure hope that was an admin!')
  next()
}

function ensureUser(req,res,next) {
  console.log('Well, the user *claims* to have logged in...')
  next()
}

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:false}))

app.get('/admin*', ensureAdmin)
app.get('/admin/users', formRoute)
app.post('/admin/users', genericRoute)
app.get('/admin/accounts`', genericRoute)
app.get('/admin/transactions', genericRoute)

app.get('/auth/sign_in', genericRoute)
app.get('/auth/sign_out', genericRoute)
app.get('/auth/register', genericRoute)

app.get('/app/widgets', genericRoute)
app.get('/app/tasks', genericRoute)

app.listen(3000)

console.log("I'm listening on port 3000!")

