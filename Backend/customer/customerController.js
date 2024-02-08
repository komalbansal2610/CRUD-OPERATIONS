const service=require('./customerService');

module.exports.createCustomerController=async(req,res)=>{
    const status=await service.createCustomerDBService(req.body);
    if(status)
    {
        res.status(200).send({"msg":"Customer added successfully"});
    }
    else{
        res.status(500).send("failed to create the user");
    }
}

module.exports.getCustomerDetailsController=async(req,res)=>{
    const status=await service.getCustomerDetailDBService(req.body);
    if(status.status===true)
    {
        res.status(200).send(status.data);
    }
    else
    {
        res.status(500).send({"msg":"unable to get the details"});
    }
}

module.exports.updateCustomerDetailsController=async(req,res)=>{
    const status=await service.updateCustomerDetailsService(req);
    if(status)
    {
        res.status(200).send({"msg":"update customer details successfully"});
    }
    else
    {
        res.status(500).send({"msg":"failed to update the details"});
    }
}
module.exports.deleteCustomerDetailsController=async(req,res)=>{
    const status=await service.deleteCustomerDetailsService(req.body);
    if(status)
    {
        res.status(200).send({"msg":"delete customer successfully"});
    }
    else
    {
        res.status(500).send({"msg":"failed to delete the customer"});
    }

}

module.exports.getParticularCustomerDetailsController=async(req,res)=>{
    const status=await service.getParticularCustomerDetailDBService(req);
    if(status.status===true)
    {
        res.status(200).send(status.data);
    }
    else
    {
        res.status(500).send({"msg":"unable to get the details"});
    }
}

