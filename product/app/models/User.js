var mongoose = require('mongoose'),
    bcrypt = require('bcrypt');

// User Schema
var userSchema = mongoose.Schema({

    local            : {
        email        : String,
        password     : String,
    },

    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }
});

//------------------------------------------------------------------------
// Schema Methods 
// generating a hash
userSchema.statics.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

//------------------------------------------------------------------------
var Model = mongoose.model('User', userSchema);
module.exports = Model;