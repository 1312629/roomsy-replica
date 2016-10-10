var mongoose = require('mongoose'),
    bcrypt = require('bcrypt');

// User Schema
var userSchema = mongoose.Schema({

    firstname	: String,
    lastname	: String,
    email		: String,
    country		: String,
    size		: Number,
    phone		: String
}, 
//Schema optioms
{
	timestamps: true
});

//------------------------------------------------------------------------
// Schema Methods 
// generating a hash
userSchema.statics.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

//------------------------------------------------------------------------
var Model = mongoose.model('User', userSchema);
module.exports = Model;