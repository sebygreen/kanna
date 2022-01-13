require('dotenv').config()

// JWT authentication strategy
const JwtStrategy = require('passport-jwt').Strategy;
// JWT request extractor
const ExtractJwt = require('passport-jwt').ExtractJwt;

const mongoose = require('mongoose');
const User = mongoose.model('users');

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = process.env.JWT_SECRET;

module.exports = passport => {
    passport.use(
        new JwtStrategy(options, (jwt_payload, done) => { // initialize a new authentication strategy
            User.findById(jwt_payload.id, function (err, user) {
                if (err) {
                    return done(err, false);
                }
                // check if user with id exists
                if (user) {
                    return done(null, user);
                }
                // nothing if nothing
                return done(null, false);
            });
        })
    );
}