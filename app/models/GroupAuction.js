var mongoose = require('mongoose');

var GroupAuctionSchema = new mongoose.Schema({
    GroupID: String,
    AuctionNo: Number,
    PrizeWinner: mongoose.Schema.Types.ObjectId,
    data: Object

    // voucher reference
});

module.exports = mongoose.model('GroupAuction', GroupAuctionSchema);