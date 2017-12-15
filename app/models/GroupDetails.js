// grab the mongoose module
var mongoose = require('mongoose');

var GroupDetailsSchema = new mongoose.Schema({
    groupName: String,
    subscriberCount: Number,
    allAuctionComplete: Boolean,
    groupLedgerID: mongoose.Schema.Types.ObjectId,
    dividendLedgerID: mongoose.Schema.Types.ObjectId,
    data: Object
});

module.exports = mongoose.model('GroupDetails', GroupDetailsSchema);


/**
 * Data object format:
 * 
 *  "data" : {
        "configuration" : {
            "dd_dividend_distribution" : {
                    "id" : String
            },
            "c_last_auction_date" : Date,
            "c_auction_time" : Date,
            "c_auction_every" : Number,
            "first_auction" : Date,
            "c_company_commission" : Number,
            "c_maximum_bid" : Number,
            "c_minimum_bid" : Number,
            "c_comm_certificate_no" : String,
            "c_comm_certificate_date" : Date
        },
        "commencement_details" : {
            "bc_expiry_date" : Date,
            "bc_amount" : Number,
            "bc_reference_no" : Number,
            "bc_bank_name" : {
                    "id" : String
            },
            "cd_bank_collateral" : {
                    "id" : String
            },
            "comm_fees" : Number,
            "cd_challan_no" : String,
            "cd_challan_date" : String,
            "cd_challan_of_bank" : {
                    "id" : String
            },
            "comm_application_date" : Date,
            "prior_permission_ref_no" : String,
            "prior_permission_date" : Date
        },
        "prior_permission" : {
            "p_p_fees" : Number,
            "pp_challan_no" : String,
            "pp_challan_date" : Date,
            "pp_challan_of_bank" : {
                    "id" : String
            },
            "department" : {
                    "id" : String
            },
            "permission_application_date" : Date,
            "resolution_date" : Date,
            "installment" : Number,
            "subscribers" : Number,
            "chit_value" : Number,
            "group_name" : String
        }
    }
 */