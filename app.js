const express = require("express");
const app = express();
const morgan = require('morgan');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const userRoutes  = require("./API/Routes/Users");
const topActiveUsersRoutes = require("./API/Routes/topActiveUsers");
const ListingsRoutes = require("./API/Routes/Listings");
const ApplicationRoutes = require("./API/Routes/Applications");

mongoose.connect("mongodb://localhost/dashboard",{useNewUrlParser : true})
.then(()=> console.log("mongoDbConnected"))
.catch(err => conso.log(err));


app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
res.status(error.status || 500)
res.json({
        error:{
            message: error.message
        }
    });
});

module.exports = app;