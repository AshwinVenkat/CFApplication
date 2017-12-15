var mongoose = require('mongoose');

var GroupAuctionSchema = new mongoose.Schema({
    groupID: mongoose.Schema.Types.ObjectId,
    auctionNo: Number,
    prizeWinnerTicketID: mongoose.Schema.Types.ObjectId,
    data: Object
});

module.exports = mongoose.model('GroupAuction', GroupAuctionSchema);

/**
 * Data object format:
 * 
 * "data" : {
        "dividend_amount" : Number,
        "prize_amount" : Number,
        "discount_amount" : Number,
        "discount_value" : Number,
        "discount_type" : {
                "id" : String
        },
        "company_comm" : Number,
        "prized_subscriber" : {
                "id" : String
        },
        "no_of_subscribers" : Number,
        "chit_value" : Number,
        "auction_number" : Number,
        "auction_time" : Date,
        "auction_date" : Date,
        "group_name" : {
                "id" : String
        }
    }
 */

