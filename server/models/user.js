const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
//Define model
const userSchema = new Schema({
  email: { type:String, unique:true, lowercase: true }, //forces database to check that email is unique before storing
  password: String
  // literal refernce to JS string
});

// On Save Hook, encrypt password
//before saving a model, run this function
userSchema.pre('save', function(next) {
  const user = this; //get access to user model

  //generate a 'salt', then run callback
  bcrypt.genSalt(10, function(err, salt) {
    if (err) { return next(err); }

    // hash (encrypt) password using salt
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) { return next(err); }

      // overwrite plain text password with encrypted password
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) {return callback(err); }

    callback(null, isMatch)
  });
}


// create model class
const ModelClass = mongoose.model('user', userSchema);
   //ModelClass -> referencing all users (class of users) not a specific user

// export model
module.exports = ModelClass;
