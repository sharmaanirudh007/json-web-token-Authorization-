var express = require("express");
var bodyParser = require("body-parser");
var hbs = require("hbs");
var mongoose = require("mongoose");
var expressjwt = require("express-jwt");
var jwt = require("jsonwebtoken");
var user = require("./use.js");
//var flash = require('express-flash')
var app = express();

mongoose.connect('mongodb://test:test@ds023603.mlab.com:23603/jwt');

app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({extended:false}));
//app.use(express.cookieParser('keyboard cat'));
//app.use(express.session({ cookie: { maxAge: 60000 }}));
//app.use(flash());
app.use(expressjwt({secret:"my app"}).unless({path:['/login','/register']}));
app.listen(3000);

user(app);
