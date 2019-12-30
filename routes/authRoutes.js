const passport = require("passport");
const User = require("../models/User");

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
      res.redirect("/buckets");
    }
  );

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });

  app.post("/auth/email/callback", function(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
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
      });

      user.save(function(err) {
        if (err) {
          return next(err);
        }

        // step 4: respond to request indicating the user was created.
        res.json({ success: true });
      });
    });

    // passport.authenticate("local", function(req, res) {
    //     // {
    //     //   successRedirect: "/buckets",
    //     //   failureRedirect: "/auth/potatofail",
    //     //   failureFlash: true,
    //     // }
    // console.log("passport user from authRoutes, req.user: ", req.user);
    // })(req, res, next);
    // res.send({ success: "True" });
  });

  // simple passportjs
  //app.post(
  //   "/auth/email/callback",
  //   passport.authenticate("local", {
  //     successRedirect: "/",
  //     failureRedirect: "/login",
  //     failureFlash: true,
  //   })
  // );
};
