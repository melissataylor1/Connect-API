const { Schema, model,} = require('mongoose');

//
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            //REGEX for email
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Please fill a valid email address']
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'thought'
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'user'
        }]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

//add friend count

//initialize user model
const User = model('user', userSchema);
module.exports = User;