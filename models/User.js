const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt-nodejs");

//Define our model
const userSchema = new Schema({
  googleId: String,
  credits: { type: Number, default: 0 },
  //'emails' is from Google OAuth while 'email' is for email/pw login
  emails: { type: String, unique: true, lowercase: true },
  email: { type: String, unique: true, lowercase: true },
  password: String,
  name: String,
  company: String,
  jobTitle: String,
});

//on Save Hook, encrypt password
userSchema.pre("save", function(next) {
  //get instance of the user model. user.email, user.password
  const user = this;

  //generate a salt, then run callback
  bcrypt.genSalt(10, function(err, salt) {
    if (err) {
      return next(err);
    }
    //hash pw using the salt. run callback, resulting in a hash
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) {
        return next(err);
      }
      //overwrite plaintext pw with encrypted pw
      user.password = hash;
      //proceed with saving the model
      next();
    });
  });
});

//create the model class
const ModelClass = mongoose.model("user", userSchema);

//from Google OAuth
mongoose.model("users", userSchema);

//Export the Model
module.exports = ModelClass;
