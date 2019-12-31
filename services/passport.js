const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
//jwt version uses
//const config = require('../config')
const keys = require("../config/keys");

//jwt-login version uses
//const User = require('../models/user')
const User = mongoose.model("users");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

//JWT Strategy: setup options; tell JwtStrategy where to look to find the key
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: keys.jwtSecret,
};
//JWT Strategy: Create JWT Strategy
//function gets called whenever user tries to login using JWT or when we need to authenticate user with JWT
//function's payload is the {sub, iat} from the token
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  // see if the user id in payload exists in our db
  User.findById(payload.sub, function(err, user) {
    //if search failed; db down or otherwise never got to check if user exists
    if (err) {
      return done(err, false);
    }
    //if exists, call 'done' with that user; null means there was no error when performing the search.
    //otherwise, call 'done' without a user object. 'this user is not authenticated'
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

//Create local strategy
const localOptions = { usernameField: "email" };
const localLogin = new LocalStrategy(localOptions, function(
  email,
  password,
  done
) {
  //Verify email/password, call 'done' with the user if correct
  User.findOne({ email: email }, function(err, user) {
    if (err) {
      return done(err);
    } //if the query never ran for some reason
    if (!user) {
      return done(null, false);
    } //if query ran, but user not found
    //compare passwords is `password` equal to user.password? comparing bcrypted pw to given pw; encrypt the given pw with same salt to see if it's the same as salted stored pw.
    user.comparePassword(password, function(err, isMatch) {
      if (err) {
        return done(err);
      }
      if (!isMatch) {
        return done(null, false);
      }
      return done(null, user);
    });
  });
  //if not correct, call 'done' with false
});

//Tell passport to use jwtLogin strategy from above.
passport.use(jwtLogin);
//Tell passport to use localLogin strategy from above
passport.use(localLogin);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({
        googleId: profile.id,
      });
      if (existingUser) {
        return done(null, existingUser);
      }
      const user = await new User({
        googleId: profile.id,
      }).save();
      done(null, user);
    }
  )
);

// passport.use(
//   new LocalStrategy(async (email, password, done) => {
//     const existingUser = await User.findOne({ email: email }, (err, user) => {
//       if (err) {
//         return done(err);
//       }
//       if (!user) {
//         return done(null, false, { message: "Incorrect email." });
//       }
//       if (!user.validPassword(password)) {
//         return done(null, false, { message: "Incorrect password." });
//       }
//       if (user) {
//         return done(null, existingUser);
//       }
//       user = new User({
//         email: email,
//         password: password,
//         company: company,
//         jobTitle: jobTitle,
//       }).save();
//       done(null, user);
//     });
//   })
// );
