var mongoose = require("mongoose");

// after tests, we'll include more fields
var userSchema = new mongoose.Schema({
    name:     String,
    nick:     String,
    password: String,
    created:  { type: Date, default: Date.now }
});

mongoose.model('User', userSchema);
