var express = require('express'),
    app = express(),
    bodyParser = require('body-parser')
    jwt = require("jsonwebtoken")
    fs = require('fs');
const secret = fs.readFileSync(__dirname +'/private.key');
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('public'));

app.use((req, res, next) =>{

  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] == 'JWT'
  ) {

    jwt.verify(
      req.headers.authorization.split(' ')[1],
      secret,
      { algorithm: 'HS256' },
      (err, decode)=>{
      if (err) {
        console.log(err)
        req.user = undefined;
      }else{
        req.user = decode
      }
      next()
    })
  } else {
    req.user = undefined;
    next()
  }
})

// database connection
var db_url = 'mongodb://localhost/shop_js';
var mongoose = require('mongoose');
var User = require('./api/models/user')
var Ware = require('./api/models/ware.model')
mongoose.connect(db_url, {
                            useUnifiedTopology: true,
                            useNewUrlParser: true,
                            useFindAndModify: false
                        });
mongoose.set('useCreateIndex', true);
// end of database connection


var userRoutes = require('./api/routes/users');
userRoutes(app);
var wareRoutes = require('./api/routes/ware.router');
wareRoutes(app);

app.listen(3000);
console.log('listen on port: 3000')
