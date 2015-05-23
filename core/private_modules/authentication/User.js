// public modules
var bcrypt	= require('bcrypt-nodejs');

// local modules
var database	= requireLocal('database');

// create schema
var User = database.Schema({
	username:	{type: String, trim: true, lowercase: true},
	password:	{type: String}
});

// check user password
User.methods.validPassword = function validPassword(password){
	return bcrypt.compareSync(password, this.password);
};

// generate hash
User.statics.getHash = function getHash(text){
	return bcrypt.hashSync(text);
};

// exports
module.exports = database.model('User', User);
