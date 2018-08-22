const express  = require("express");
const router = express.Router();

router.get("/",(req,res,next) =>
{
    const pageNumber = req.params.pageNumber;
    res.status(200).json({
        message: "Top Active Users Route"
    });
});





module.exports = router;