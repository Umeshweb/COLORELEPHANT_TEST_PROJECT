var mongoose = require('mongoose');
bcrypt = require('bcryptjs');

var Todo1 = mongoose.model('Todo1', {
    name: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    },
    webaddress: {
        type: String,
        default: ''
    },
    cover: {
        type: String,
        default: ''
    },
    workingFlag: {
        type: String,
        default: ''
    }
});

var userSchema = mongoose.Schema({ 
	  email: String,
	  pw: String,
	  fName : String,
	  timeStamp : String,
	  lName : String,
	  ip : String,
	  location : String,
	 
});

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.pw);
};

var User = mongoose.model('real_users', userSchema);

module.exports = {
		user : User,
		Todo1 : Todo1
}

