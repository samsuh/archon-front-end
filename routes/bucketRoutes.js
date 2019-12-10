//BUG: bucketRoutes doesnt get req.user properly. something is broken inside this file; possibly the Mailer object does not send back a response.
const mongoose = require("mongoose");
// const requireLogin = require("../middlewares/requireLogin");
// const requireCredits = require("../middlewares/requireCredits");
const Mailer = require("../services/Mailer");
const bucketEmailTemplate = require("../services/emailTemplates/bucketEmailTemplate");

const Bucket = mongoose.model("buckets");

module.exports = app => {
  app.get("/api/buckets/thanks", (req, res) => {
    res.send("Thanks for responding!");
  });
  // undid code to check if user is logged in and has enough credits to create a new bucket (custom middlewares). put it back before finished.
  // app.post("/api/buckets", requireLogin, requireCredits, async (req, res) => {
  app.post("/api/buckets", async (req, res) => {
    console.log(
      "DOES NOT WORK, returns undefined: bucketRoutes print req.user: ",
      req.user
    );
    console.log(
      "DOES NOT WORK, returns undefined: bucketRoutes print req.body.user: ",
      req.body.user
    );
    const { title, subject, body, recipients } = req.body;

    //creating new instance of a bucket
    //ERROR HERE: req.user is undefined, so req.user.id doesnt work as intended.
    const bucket = new Bucket({
      title,
      body,
      subject,
      recipients: recipients.split(",").map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now(),
    });

    // send email from bucket here; giving it the entire bucket
    const mailer = new Mailer(bucket, bucketEmailTemplate(bucket));

    try {
      await mailer.send();
      await bucket.save();
      req.user.credits -= 1;
      const user = await req.user.save();

      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
