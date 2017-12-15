// grab the mongoose module
var mongoose = require('mongoose');

var VoucherSeriesSchema = new mongoose.Schema({
    voucherSerierID: Number,
    voucherClass: String,
    voucherType: String,
    voucherPrefix: String,
    startingVoucherClassNo: Number,
    startingVoucherTypeNo: Number,
    voucherSuffix: String,
    editable: Boolean,
    lastNo: Number
});

module.exports = mongoose.model('VoucherSeries', VoucherSeriesSchema);
