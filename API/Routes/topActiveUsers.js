const express  = require("express");
const {User} = require("./../../DB/Schemas.js").MYMODELS;
const router = express.Router();

router.get("/",(req,res,next) =>
{

    User.find().then((result) => {
        res.status(200).json({
            message: "Top Active Users Route"
        });

    }).catch((err) => {
        
    });
    
});

module.exports = router;