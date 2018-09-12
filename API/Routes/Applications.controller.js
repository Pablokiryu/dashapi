const {Application} = require("./../../DB/Schemas.js").MYMODELS; 

exports.get = function(req,res){
    Application.find().then( (doc)=>
    {
        res.send(doc);
    },(err)=>{
        res.status(400).send(err);
    });
};

exports.getId = function(req,res){
    Application.find({_id:req.params.id}).then((ReqApplication) => {
        res.send({ ReqApplication });
    }, (err) => {
        res.status(400).send(err);
    });
};

exports.delete = function(req,res){
    const id = req.params.id;
    Application.deleteOne({_id:id}).then((result)=>{
        //TODO: antes de retornar , apagar a application, do usuario que a fez. 
        res.status(200).json({result});
    }).catch((err)=>{
        console.log(err);
        res.status(500).json({error:err});
    });
}