// grab the mongoose module
var mongoose = require('mongoose');

var TransactionDetailsSchema = new mongoose.Schema({
  // VoucherRowNo - _id (default ID field added by mongodb)
  transactionHeaderID: mongoose.Schema.Types.ObjectId,
  date: Date,
  accountID: mongoose.Schema.Types.ObjectId,
  amount: Number,
  transactionType: Boolean
});

module.exports = mongoose.model('TransactionDetails', TransactionDetailsSchema);

/**
 * TransType used
 * 1: Debit
 * 0: Credit
 */