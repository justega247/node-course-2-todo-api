const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var UserSchema = new mongoose.Schema({
        email: {
            type: String,
            required: true,
            minlength: 1,
            trim: true,
            unique: true,
            validate: {
                validator: (value) => {
                    return validator.isEmail(value)
                },
                message: '{VALUE} is not a valid email address'
            }
        },
        password: {
            type: String,
            required: true,
            minlength: 6
        },
        // tokens is a feature only available in mongodb,not available in sql databases like postgres
        tokens: [{
            access: {
                type: String,
                required: true
            },
            token: {
                type: String,
                required: true
            }
        }]
});

// The ES6 arrow function does not bind the 'this' keyword, hence we make use of the normal 'function' keyword
// when we have to work with the 'this' keyword.

UserSchema.methods.toJSON = function () {
    var user = this;
    var userObject = user.toObject();

    return _.pick(userObject, ['_id', 'email']);
}

UserSchema.methods.generateAuthToken = function() {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

    user.tokens.push({access, token});

    return user.save().then(() => {
        return token;
    });
};


var User = mongoose.model('User', UserSchema);

module.exports = {
    User
};