var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const Bcrypt = require("bcryptjs");
var UserSchema = new Schema({
  email: {
    type: String,
    required: 'Заповніть поле email',
    index: true,
    unique: true
  },
  name: {
    type: String,
    required: 'Заповніть поле name'
  },
  password: {
    type: String,
    required: 'Заповніть поле пароль'
  },
  role: {
    type: String,
    default: 'customer'
  }
})
UserSchema.pre("save", function(next) {
    if(!this.isModified("password")) {
        return next();
    }
    this.password = Bcrypt.hashSync(this.password, 10);
    next();
});
UserSchema.methods.comparePassword = function(plaintext, callback) {
    return callback(null, Bcrypt.compareSync(plaintext, this.password));
};
module.exports = mongoose.model('User', UserSchema)
