var mongoose = require('mongoose'),
    bcrypt = require('bcrypt');

// Account Schema
var accountSchema = mongoose.Schema({

    email        : String,
    password     : String
}, 
//Schema optioms
{
	timestamps: true
});

//------------------------------------------------------------------------
// Schema Methods 
// generating a hash
accountSchema.statics.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
accountSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

//------------------------------------------------------------------------
var Model = mongoose.model('Account', accountSchema);
module.exports = Model;