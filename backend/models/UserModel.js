const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userShema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A user should have a name.'],
    validate: {
      validator: function(el) {
        return /^[a-zA-Z][a-zA-Z ]*$/.test(el);
      },
      message:
        'Name should contain at least four characters, no numerical value and special charaters.'
    },
    minlength: 4
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'A user should have email.'],
    validate: [validator.isEmail, 'Provide a valid email']
  },
  photo: {
    types: String
    //default: 'default.jpeg'
  },
  role: {
    type: String,
    default: 'user',
    enum: ['user', 'admin']
  },
  password: {
    type: String,
    required: [true, 'A user should have a password.'],
    select: false,
    minlength: 8,
    validate: {
      validator: function(el) {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
          el
        );
      },
      message:
        'Password should contain at least one upper, Numeric and Special character'
    }
  },
  passwordconfirmed: {
    type: String,
    required: [true, 'Please complete confirm password field.'],
    minlength: 8,
    validate: {
      validator: function(el) {
        return el === this.password;
      },
      message: 'Passwords do not match.'
    }
  },
  passwordChangedAT: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false
  },
  address: String,
  eduction: String,
  job: String,
  phoneNo: String,
  website: String,
  facebookLink: String,
  instagramLink: String,
  linkedInLink: String
});

userShema.pre('save', async function(next) {
  //Only run this function if the password was actully mmodified
  if (!this.isModified('password')) return next();

  //Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  //Delete passwordconfirm field
  this.passwordconfirmed = undefined;
  next();
});

userShema.pre('save', function(next) {
  if (!this.isModified('password') || this.isNew)
    this.passwordChangedAT = Date.now() - 2000;
  next();
});

userShema.pre(/^find/, function(next) {
  //this.point current querrry
  this.find({ active: { $ne: false } });
  this.select('-passwordChangedAT -__v');
  next();
});

userShema.methods.correctPassword = async function(candidatePass, userPass) {
  return await bcrypt.compare(candidatePass, userPass);
};

userShema.methods.changePassAfter = function(JWTTimestamp) {
  if (this.passwordChangedAT) {
    const changdTimestand = parseInt(
      this.passwordChangedAT.getTime() / 1000,
      10
    );
    //console.log(changdTimestand,JWTTimestamp);
    return JWTTimestamp < changdTimestand;
  }
  //falsemeans not change
  return false;
};

userShema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  //console.log({resetTolen}, this.passwordResetToken);
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

const User = mongoose.model('User', userShema);
module.exports = User;
