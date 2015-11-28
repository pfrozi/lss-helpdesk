var mongoose = require("mongoose");

var reqSchema = new mongoose.Schema({
    title        : String,
    description  : String,
    priority     : Number,
    created      : { type: Date, default: Date.now },
    modified     : { type: Date, default: Date.now },
    tags         : [String],
    modules      : [String],
    category     : [String],

});

mongoose.model('Requisition', reqSchema);
