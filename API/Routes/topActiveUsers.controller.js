const {User} = require("./../../DB/Schemas.js").MYMODELS;

exports.get = function(req,res){
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
    
};