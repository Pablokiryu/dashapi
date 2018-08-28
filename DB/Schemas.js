const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/dashboard",{useNewUrlParser : true});
const Scheme = mongoose.Schema;

MySchemes ={
    Listing : Scheme({
        createdAt: {
            type: Date,
            default:Date.now
        },
        name: String,
        description: String
    }),

    Application : Scheme({
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
    }),

    User : Scheme({
        name:String,
        createdAt: {
            type: Date,
            default:Date.now
        }, 
        count: {
            type: Number,
            default :0
        },
        createdListings: [
            {
                type : Scheme.Types.ObjectId,
                ref : "Listing"
            }
        ],
        applications: [
            {
                type : Scheme.Types.ObjectId,
                ref : "Appplication"
            }
        ]
    })
}

MyModels =
{
    User: mongoose.model("User",MySchemes.User),
    Listing: mongoose.model("Listing",MySchemes.Listing),
    application: mongoose.model("Application",MySchemes.Application)
}
module.exports = {MYMODELS: MyModels,MYSCHEMES :MySchemes};