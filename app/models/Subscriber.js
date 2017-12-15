// grab the mongoose module
var mongoose = require('mongoose');

var SubscriberSchema = new mongoose.Schema({
  subscriber: String,
  data: Object,
  isCompanySubscriber: Boolean,
  ledgerID: mongoose.Schema.Types.ObjectId,
  active: Boolean,
  kyc: Object,
});

module.exports = mongoose.model('Subscribers', SubscriberSchema);

/**
 * Data object format:
 *  "data" : {
         "pincode2" : Number,
         "zone2" : String,
         "city2" : {
                 "id" : String
         },
         "stree2" : String,
         "address2" : String,
         "pincode1" : Number,
         "zone1" : String,
         "city1" : {
                 "id" : String
         },
         "stree1" : String,
         "address1" : String,
         "party_type" : {
                 "id" : String
         },
         "fax" : Number,
         "office" : Number,
         "residence" : Number,
         "mobile" : Number,
         "email" : String,
         "name" : String,
         "title" : {
                 "id" : String
         }
  }
 * 
 */

 /**
 * KYC object format:
 * "kyc" : {
        "id_no" : String,
        "other_id" : {
                "id" : String
        },
        "aadhaar" : String,
        "pan" : String,
        "ifsc" : String,
        "account_type" : {
                "id" : String
        },
        "account_no" : String,
        "city" : String,
        "branch" : String,
        "bank" : String,
        "authorised_signatory" : String,
        "contact_person" : String,
        "party_type" : {
                "id" : String
        },
        "occupation" : String,
        "relation_name" : String,
        "relation" : {
                "id" : String
        },
        "dob" : Date
  },
 * 
 */