// grab the mongoose module
var mongoose = require('mongoose');

var SubscriberTicketMappingSchema = new mongoose.Schema({
    group_id: String,
    data: Object
});

module.exports = mongoose.model('SubscriberTicketMapping', SubscriberTicketMappingSchema);
