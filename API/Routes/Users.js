const express = require("express");
const router = express.Router();
const myModels = require("./../../DB/Schemas.js").MYMODELS;
const mongoose = require("mongoose");

const mySchemes = require("./../../DB/Schemas.js").MYSCHEMES;



router.post("/", (req, res, next) => {

    const name = req.query.name;

    var newUser = new myModels.User;

    newUser.name = name;
    newUser.count = 0;
    newUser.save((err) => {
        if (err) throw err;
        console.log("New User : " + newUser.name + "saved to DB successfully");
    })

    res.status(201).json({
        message: "Handling Post Request Users route",
    });
});
router.get("/", (req, res, next) => {

   res.status(200).json({
        message: "Handling GET Request Users route"
    });
});


router.get("/:id", (req, res, next) => {
    const id = req.params.id;
    var UserArr = [];
    console.log(req.params);
    myModels.User.find().exec((err, Users)=>{
        if (err) throw err;
        UserArr = Users;
        console.log(Users);
    });
    // var users = myModels.User.find();
    res.status(200).json({
        message: "You selected User ID " + id,
        id: id,
       // users: users

    });

});
router.patch("/:id", (req, res, next) => {
    const id = req.params.id
    const idStr = id.toString();
    res.status(200).json(
        {
            message: "patching id: " + idStr,
            id: id
        });
});

router.delete("/:id", (req, res, next) => {
    const id = req.params.id
    const idStr = id.toString();
    res.status(200).json(
        {
            message: "deleting id: " + idStr,
            id: id
        });

});


router.post("/", (req, res, next) => {
    res.status(201).json({
        message: "Handling Post Request Users route"
    });
});
module.exports = router;