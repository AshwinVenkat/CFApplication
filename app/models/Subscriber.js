// grab the mongoose module
var mongoose = require('mongoose');

var SubscriberSchema = new mongoose.Schema({
  subscriber: String,
  data: Object
});

module.exports = mongoose.model('Subscribers', SubscriberSchema);
