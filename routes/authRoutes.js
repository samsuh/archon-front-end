const passport = require("passport");
const User = require("../models/User");
const jwt = require("jwt-simple");
const config = require("../config/keys.js");
const passportService = require("../services/passport");

//jwt-login check middleware
const requireAuth = passport.authenticate("jwt", { session: false });
//middleware to check sign in
const requireSignin = passport.authenticate("local", { session: false });

//for jwt auth, take a user's secret and encode it
function tokenForUser(user) {
  const timestamp = Date.now();
  //sub is subject, who this token about/who does it belong to?
  //iat is issued-at-time
  return jwt.encode({ sub: user.id, iat: timestamp }, config.jwtSecret);
}

module.exports = app => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/dashboard");
    }
  );

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });

  app.post("/auth/email/signup", function(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    const company = req.body.company;
    const jobTitle = req.body.jobTitle;
    if (!email || !password) {
      return res
        .status(422)
        .send({ error: "you must provide email and password" });
    }

    console.log(req.body);
    // step1: see if a user with the given email exists
    User.findOne({ email: email }, function(err, existingUser) {
      if (err) {
        return next(err);
      }
      // step 2: if a user with email does exist, return an error
      if (existingUser) {
        return res.status(422).send({ error: "email is in use" });
      }
      // step 3: if a user with email does not exist, create and save user record
      const user = new User({
        email: email,
        password: password,
        company: company,
        jobTitle: jobTitle,
      });

      user.save(function(err) {
        if (err) {
          return next(err);
        }

        // step 4: respond to request indicating the user was created.
        res.json({ token: tokenForUser(user) });
      });
    });

    // passport.authenticate("local", function(req, res) {
    //     // {
    //     //   successRedirect: "/dashboard",
    //     //   failureRedirect: "/auth/potatofail",
    //     //   failureFlash: true,
    //     // }
    // console.log("passport user from authRoutes, req.user: ", req.user);
    // })(req, res, next);
    // res.send({ success: "True" });
  });

  // simple passportjs
  //app.post(
  //   "/auth/email/signup",
  //   passport.authenticate("local", {
  //     successRedirect: "/",
  //     failureRedirect: "/login",
  //     failureFlash: true,
  //   })
  // );

  //dummy route to test jwt requireAuth
  app.get("/testRoute", requireAuth, function(req, res) {
    res.send({ hi: "there" });
  });

  app.post("/auth/email/signin", requireSignin, function(req, res, next) {
    //User has already had email/pw auth'd. need to give them a jwt
    res.send({ token: tokenForUser(req.user) });
  });
};
