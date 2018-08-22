const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/dashboard",{useNewUrlParser : true});
const Scheme = mongoose.Schema;

MySchemes ={
    User : Scheme({
        name:String,
        createdAt: {
            type: Date,
            default:Date.now
        }, 
        count: Number,
        createdListings: [
            {
                type : Scheme.Types.ObjectId,
                ref : "listing"
            }
        ],
        applications: [
            {
                type : Scheme.Types.ObjectId,
                ref : "appplication"
            }
        ]
    }),

    listing : Scheme({
        _id: Scheme.Types.ObjectId,
        createdAt: {
            type: Date,
            default:Date.now
        },
        name: String,
        description: String
    }),

    application : Scheme({
        _id: Scheme.Types.ObjectId,
        createdAt: {
            type: Date,
            default:Date.now
        },
        listing:{
            _id: Scheme.Types.ObjectId,
            name: String,
            description: String
        },
        coverLetter : String
    })
}

MyModels =
{
    User: mongoose.model("User",MySchemes.User),
    listing: mongoose.model("listing",MySchemes.listing),
    application: mongoose.model("application",MySchemes.application)
}
module.exports = {MYMODELS: MyModels,MYSCHEMES :MySchemes};

