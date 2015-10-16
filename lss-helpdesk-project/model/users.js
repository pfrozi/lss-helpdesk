var mongoose = require("mongoose");

// after tests, we'll include more fields
var userSchema = new mongoose.Schema({
    name:     String,
    nick:     String,
    password: String,
    created:  { type: Date, default: Date.now },
    type:     { type: String, default: "D"    }, // D - Developer, C - Customer

});

mongoose.model('User', userSchema);
