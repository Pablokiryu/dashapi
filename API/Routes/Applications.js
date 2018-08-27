const express = require("express");
const router = express.Router();
const myModels = require("./../../DB/Schemas.js").MYMODELS; // use Object Destructuring later :D 
const mongoose = require("mongoose");
const mySchemes = require("./../../DB/Schemas.js").MYSCHEMES;


router.post("/", (req, res, next) => {

    const coverLetter = req.query.coverLetter;


    var newApplication = new myModels.newApplication;

    
    newApplication.description = description;

    newApplication.save((err) => {
        if (err) throw err;
        console.log("New newApplication : " + newApplication.coverLetter + " saved to DB successfully");
    })

    res.status(201).json({
        message: "Handling Post Request newApplications route",
    });
});

router.get("/", (req, res, next) => {

    myModels.newApplication.find().then((newApplications) => {
        res.send({ newApplications });
    }, (err) => {
        res.status(400).send(err);
    });
});

module.exports = router;