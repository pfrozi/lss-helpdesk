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
    user         : {type: mongoose.Schema.ObjectId, ref: 'User'},
    forum        : [{type: mongoose.Schema.ObjectId, ref: 'Forum'}]
});

mongoose.model('Requisition', reqSchema);
