//var data = [{name:"anirudh"},{name:"anirudh"}];
var jwt = require("jsonwebtoken");
var data1 = 'home';
var user = require('./model.js');
module.exports = function(app) {
app.get('/home', function(req,res){
  console.log(req.headers);
  console.log("mai aa gaya");
  res.render('view',{
    data1
  });
});
app.get('/register',function(req,res){

res.render('register');

});
app.get('/login',function(req,res){
  res.render('login');
});

app.post('/login',function(req,res){
var email = req.body.email;
var password = req.body.password;
user.find({ email: `${email}`, password: `${password}` }).then(function(docs){
if(docs == []){
console.log("fields don't match");

} else{
  console.log(docs);
  console.log(docs[0].tokens);
  var x = docs[0].tokens;
  //console.log(x.token);
  //var header = docs.tokens[0].token
  //res.send('x-auth',x.token);
  //var mytoken = jwt.sign({username:docs[0].username},"my app");
var y = x.token;
  res.render('welcome',{pass:y});

      }
  }).catch(function(e){
    console.log(e);
  });
//  res.json(req.headers);
console.log(req.headers);
});

app.post('/register',function(req,res){
  var newUser = new user({name:req.body.name,
                          email:req.body.email,
                          username:req.body.username,
                          password:req.body.password
  });
  newUser.generateAuthToken();
  //console.log(req.body);
  //res.redirect('/login');
});

}
