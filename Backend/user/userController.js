const service=require('./userServices');

exports.createUserFn=async(req,res)=>{
    const status=await service.createUserService(req.body);
    if(status.status===true)
    {
        res.send({"status":true,"msg":"user created successfully","token":status.token});
    }
    else
    {
        res.send({"status":false,"msg":"failed to create the user"});
    }
}

exports.loginControllerFn=async(req,res)=>{
    try{
        const status=await service.loginUserDBService(req.body);
        res.status(200).send({"msg":"user login successfully","token":status.token});
    }
    catch(error)
    {
        res.status(401).send({"msg":error});
    }
}