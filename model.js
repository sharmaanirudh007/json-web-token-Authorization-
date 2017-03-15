var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var validator = require('validator');
var jwt = require("jsonwebtoken");

var UserSchema = new mongoose.Schema({
  username:{type:String,
            required:true,
            unique:true
            },
  password:{type:String,
           required:true},
  email:{type:String,
         required:true,
         unique:true,
         validate:{
           validator:validator.isEmail,
            message: '{VALUE} is not a valid email id'
         }
            },
  name:{type:String,
        required:true},

  tokens:{
    access:{
      type:String,
      required:true
    },
    token:{
      type:String,
      required:true
    }
  }
});

UserSchema.methods.generateAuthToken = function(){
var access = "auth";
var token = jwt.sign({_id: this._id.toHexString(),access},"my app").toString();
//this.tokens.push({access,token});
this.tokens.access = access;
this.tokens.token = token;
//console.log(this);
this.save(function(err){
  var err_username = `E11000 duplicate key error index: jwt.users.$username_1 dup key: { : "${this.username}" }`;
  var err_email = `E11000 duplicate key error index: jwt.users.$email_1 dup key: { : "${this.email}" }`;

  if(err){
    console.log(err);
    console.log(err_email);
    /*if(err.errors.password.ValidatorError) {//== "Path `password` is required"){
      console.log("password required");
    }*/
   if(err.errmsg == err_username){
    console.log("username already exist");}
    else if(err.errmsg == err_email) {
      console.log("email already exist");}
      //req.flash("some error");
    }
  else{
      console.log("data submitted successfully");
    }

});

}
var user = mongoose.model('user',UserSchema);
module.exports = user;
