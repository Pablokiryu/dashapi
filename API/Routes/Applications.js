const express = require("express");
const router = express.Router();
const {Application} = require("./../../DB/Schemas.js").MYMODELS; 
const mongoose = require("mongoose");
const mySchemes = require("./../../DB/Schemas.js").MYSCHEMES;

router.get("/",(req,res,next)=>{
    Application.find().then( (doc)=>
    {
        res.send(doc);
    },(err)=>{
        res.status(400).send(err);
    });
});

router.get("/:id", (req, res, next) => {

    Application.find({_id:req.params.id}).then((ReqApplication) => {
        res.send({ ReqApplication });
    }, (err) => {
        res.status(400).send(err);
    });
});

router.delete("/:id",(req,res,next)=>{
    
    const id = req.params.id;
    Application.deleteOne({_id:id}).then((result)=>{
        //TODO: antes de retornar , apagar a application, do usuario que a fez. 
        res.status(200).json({result});
    }).catch((err)=>{
        console.log(err);
        res.status(500).json({error:err});
    });
});

module.exports = router;