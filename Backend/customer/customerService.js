const sql=require('../sql');

module.exports.createCustomerDBService=(req)=>{
      return new Promise((resolve,reject)=>{
        var myquery=`Select * from customer where  email="${req.email}"`;
        sql.query(myquery,(error,result)=>{
            if(error)
            {
                reject(error);
            }
            if(result.length==0)
            {
                var myquery=`Insert into customer(name,phoneNo,address,tag,email) values(?)`;
                var values=[req.name,req.phone,req.address,req.tag,req.email];
                sql.query(myquery,[values],(error)=>{
                    if(error)
                    {
                        reject(error);
                    }
                })  
            }
            else
            {
                var myquery=`update customer set isDeleted=false where email="${req.email}"`;
                sql.query(myquery,(error)=>{
                    if(error)
                    {
                        reject(error);
                    }
                });
            }
            resolve(true);
        });
        
      });
}

module.exports.getCustomerDetailDBService=(req)=>{
    return new Promise((resolve,reject)=>{
        var myquery="Select id,name,phoneNo,email,address,createdAt from customer where isDeleted=false";
        sql.query(myquery,(error,result)=>{
            if(error)
            {
                reject(error);
            }
            resolve({status:true,data:result});
        })
    })
}
module.exports.getParticularCustomerDetailDBService=(req)=>{
    return new Promise((resolve,reject)=>{
        let reqId=req.params['id'];
        var myquery=`Select id,name,phoneNo,email,address from customer where id=${reqId}`;
        sql.query(myquery,(error,result)=>{
            if(error)
            {
                reject(error);
            }
            resolve({status:true,data:result});
        })
    })
}

module.exports.updateCustomerDetailsService=(req)=>{
    return new Promise((resolve,reject)=>{
        var set="SET ";
        var values=[];
        if(req.name!=='')
        {
            set+="name=?,";
            values.push(req.body.name);
        }
        if(req.phone!=='')
        {
            set+="PhoneNo=?,";
            values.push(req.body.phone);
        }
        if(req.address!=='')
        {
            set+="address=?,";
            values.push(req.body.address);
        }
        if(req.email!=='')
        {
            set+="email=?,";
            values.push(req.body.email);
        }
        if(req.tags!=='')
        {
            set+="tag=?,";
            values.push(req.body.tags);
        }
        set=set.replace(/,\s*$/,'')
        let reqId=req.params['id'];
        var myquery=`Update customer  ${set} where id=?`;
        values.push(reqId);
        sql.query(myquery,values,(error)=>{
            if(error)
            {
                reject(error);
            }
            resolve(true);

        })
    })
}

module.exports.deleteCustomerDetailsService=(req)=>{
    return new Promise((resolve,reject)=>{
        var myquery=`update customer set isDeleted=true where id=${req.id}`;
        sql.query(myquery,(error)=>{
            if(error)
            {
                reject(error);
            }
            resolve(true);
        });
    });
}
