var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

mongoose.connect('mongodb://alfred:password00@ds249233.mlab.com:49233/msin636')
var db = mongoose.connection;

var UserSchema = mongoose.Schema({
  username:{
    type: String,
    index:true
  },
  password:{
    type: String
  },
  email:{
    type: String
  },
  name:{
    type: String
  },
  profileimage:{
    type: String
  }
});

var User = module.exports = mongoose.model('User', UserSchema)
module.exports.getUserById=function(id,callback){
  User.findById(id,callback);
}
module.exports.getUserByUsername=function(username,callback){
  var query = {username:username};
  User.findOne(query, callback);
}

module.exports.comparePassword = function(canidatePassword, hash, callback){
  bcrypt.compare(canidatePassword, hash, function(err, res) {
      callback(null,res);
  });
};

module.exports.createUser = function(newUser, callback){
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newUser.password, salt, function(err, hash) {
        newUser.password = hash;
        newUser.save(callback);
    });
});
}
