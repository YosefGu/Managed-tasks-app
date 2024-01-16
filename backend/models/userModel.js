const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const { OAuth2Client } = require('google-auth-library');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    lName: {
        type: String,
        require: true
    },
    title: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    manager: {
        type: Boolean,
        require: true
    },
    image: {
        type: String,
    }   
}, { timestamps: true });

// static signup method
userSchema.statics.signup = async function(name, lName, title, email, password, manager) {

    //validation
    if (!name || !lName || !title || !email || !password) {
        throw Error('All fields must be filled');
    };
    if (!validator.isEmail(email)) {
        throw Error('Email is not valid')
    };
    if (!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough')
    }; 

    const exists = await this.findOne({email})
    if (exists) {
        throw Error('Email already in use.')
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({ name, lName, title, email, password: hash, manager });
    
    return user
};

// static login method
userSchema.statics.login = async function( email, password ) {

    //validation
    if ( !email || !password ) {
        throw Error('All fields must be filled');
    };

    const user = await this.findOne({ email })
    if (!user) {
        throw Error('Inorrect email.')
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        throw Error('Icorrect password.')
    }
    
    return user
}

// static verifyGoogleLogin
userSchema.statics.verifyGoogleLogin = async function(client_id, jwtToken) {
    const client = new OAuth2Client(client_id);

    try {
        const ticket = await client.verifyIdToken({
            idToken: jwtToken,
            audience: client_id,
        });
        const payload = ticket.getPayload();
        const exists = await this.findOne({ email: payload.email })
        if (exists) {
            // console.log(exists, 1)
            return exists
        } else {

            const user = await this.create({ 
                name: payload.name, 
                lName: payload.family_name, 
                title: null, 
                email: payload.email , 
                password: 'google', 
                manager: null });
                // console.log(user, 2)
            return user
        }

    } catch (error) {
        throw Error({1: 'Token verification error', error: error.message})
    }
}
module.exports = mongoose.model('User', userSchema);
