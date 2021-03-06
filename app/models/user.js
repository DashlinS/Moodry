// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({
  local: {
    email: String,
    password: String,
    onBoardingComplete: Boolean,
  },
  info: {
    lastVideo: String,
    videoName: String,
  },
  moodData: [[]],
  gamesData: [[]],
  learnData: [[]],
  activityData: [[]],
  userInfo: {
    profileImage: String,
    myName: String,
    username: String,
    age: Number,
    birthday: String,
    grade: String,
    favorite: String,
  }
});

// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
