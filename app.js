const express = require("express");
const app = express();
const morgan = require('morgan');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const userRoutes  = require("./API/Routes/Users");
const topActiveUsersRoutes = require("./API/Routes/topActiveUsers");
const ListingsRoutes = require("./API/Routes/Listings");
const ApplicationRoutes = require("./API/Routes/Applications");

                                    //Production URI  "mongodb://mongo:27017/dashboard" should have a mongo container named mongo running on port 27017
//Promise Based MongoDb connection  TESTURI : "mongodb://localhost/dashboardtest"  should have a local mongo instance running //TODO pass URI as param to App.js
mongoose.connect(process.env.MONGOURI ||"mongodb://localhost/dashboardtest",{useNewUrlParser : true})
.then(()=> console.log("mongoDbConnected"))
.catch(err => console.log(err));

//Useful middleware
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");//Everyone is
    res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept,Authorization");
    if(req.method === "OPTIONS")
    {
        res.header("Access-Control-Allow-Methods","GET, POST,PATCH");
        return res.status(200).json({});
    }
    next();
});

//adding routes Middleware
app.use("/Users", userRoutes);
app.use("/topActiveUsers",topActiveUsersRoutes);
app.use("/Listings",ListingsRoutes);
app.use("/Applications",ApplicationRoutes);


//No route Found, 404
app.use((req,res,next) =>
{
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
});

//Database error
app.use((error,req,res,next) =>{
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    });
});

module.exports = app;