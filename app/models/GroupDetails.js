// grab the mongoose module
var mongoose = require('mongoose');

var GroupDetailsSchema = new mongoose.Schema({
    groupname: String,
    subscriberscount: Number,
    data: Object
});

module.exports = mongoose.model('GroupDetails', GroupDetailsSchema);
