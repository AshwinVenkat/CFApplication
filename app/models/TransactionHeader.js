// grab the mongoose module
var mongoose = require('mongoose');

var TransactionHeaderSchema = new mongoose.Schema({
  // VoucherID - _id (default ID field added by mongodb)
  date: Date,
  voucherClass: String,
  voucherType: String,
  prefix: String,
  voucherNo: Number,
  suffix: String,
  referenceNo: String,
  transactionTotalAmount: Number,
  userID: String,
  noOfDetails: Number,
  narration: String,
  remarks: String,
});

module.exports = mongoose.model('TransactionHeader', TransactionHeaderSchema);