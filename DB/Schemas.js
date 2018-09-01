const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/dashboard",{useNewUrlParser : true});
const Scheme = mongoose.Schema;

MySchemes ={
    ///Job listing
    Listing : Scheme({
        createdAt: {
            type: Date,
            default:Date.now
        },
        name:{
            type :String,
            required:true
        },
        description:{
            type :String,
            required:true
        }
    }),

    //Application for a job Listing. Done by An user
    Application : Scheme({
        UserId : {
            type : Scheme.Types.ObjectId,
            ref : "User"
        },
        createdAt: {
            type: Date,
            default:Date.now
        },
        listing:{
            _id: Scheme.Types.ObjectId,
            name: String,
            description: String
        },
        coverLetter :{
            type: String,
            required: true
        }
    }),

    User : Scheme({
        name:{
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default:Date.now
        }, 
        count: {
            type: Number,
            default :0
        },
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
    Application: mongoose.model("Application",MySchemes.Application)
}
module.exports = {MYMODELS: MyModels,MYSCHEMES :MySchemes};