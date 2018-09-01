const express  = require("express");
const {User} = require("./../../DB/Schemas.js").MYMODELS;
const router = express.Router();

router.get("/",(req,res,next) =>
{
    function compare(a, b) {
        const useraCount = a.count;
        const userbCount = b.count;
        
        let comparison = 0;
        if (useraCount > userbCount) {
            comparison = 1;
        } else if (useraCount < userbCount) {
            comparison = -1;
        }
        return comparison *-1;
    } 

    User.find({}, { applications :{$slice: 3}}).then((result) => {
        res.status(200).json({
            message: "Top Active Users Route",
            Userarr : result.sort(compare)
            
        }); 

    }).catch((err) => {
        
    });
    
});

module.exports = router;