const _ = require("lodash");
const Path = require("path-parser").default;
const { URL } = require("url");
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const Mailer = require("../services/Mailer");
const bucketEmailTemplate = require("../services/emailTemplates/bucketEmailTemplate");

const Bucket = mongoose.model("buckets");

module.exports = app => {
  // app.get("/api/buckets", requireLogin, async (req, res) => {
  app.get("/api/buckets", async (req, res) => {
    const buckets = await Bucket.find({ _user: req.user.id }).select({
      recipients: false,
    });
    res.send(buckets);
  });

  app.get("/api/buckets/:bucketId/:choice", (req, res) => {
    res.send("Thanks for responding!");
  });

  app.post("/api/buckets/webhooks", (req, res) => {
    const p = new Path("/api/buckets/:bucketId/:choice");
    //this is a chain of lodash events that cleans data from the array of responses,
    //and runs mongoose query to find and update relevant entry in mongodb.
    //note: mongo uses _id as id.
    //.exec() executes the query.
    _.chain(req.body)
      .map(({ email, url }) => {
        const match = p.test(new URL(url).pathname);
        if (match) {
          return { email, bucketId: match.bucketId, choice: match.choice };
        }
      })
      .compact()
      .uniqBy("email", "bucketId")
      .each(({ bucketId, email, choice }) => {
        Bucket.updateOne(
          {
            _id: bucketId,
            recipients: {
              $elemMatch: { email: email, responded: false },
            },
          },
          {
            $inc: { [choice]: 1 },
            $set: { "recipients.$.responded": true },
            lastUpdated: new Date(),
          }
        ).exec();
      })
      .value();

    //res.send just making sure sendgrid stops repeatedly pinging thinking it failed.
    res.send({});
  });

  app.post("/api/buckets", requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    //creating new instance of a bucket
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
