const sql=require('../sql');
const key="1234345aaddff67775558655";
const encryptor=require('simple-encryptor')(key);
const jwt=require('jsonwebtoken');
const secretKey='secretkey';

const generateToken=(req)=>{
    const token=jwt.sign({ phoneNo: req.phoneNo,password:req.password }, secretKey, { expiresIn: '24h' });
    console.log(token);   
    return token;
}

module.exports.createUserService=async(req)=>{
    var password=await  encryptor.encrypt(req.password);
    return new Promise((resolve,reject)=>{
    var value = [req.firstName, req.lastName, req.phoneNo, password, req.date, req.month, req.year, req.gender];
    console.log("values is", value);

    var myquery = `INSERT INTO user (
        firstName,
        lastName,
        phoneNo,
        password,
        date,
        month,
        year,
        gender
    ) VALUES (?)`;

    sql.query(myquery, [value], (error, result) => {
        if (error) {
            reject({status:false});
        } else {
            const signUpToken = generateToken(req);
            resolve({status:true,token:signUpToken});
        }
    });
    });
}
// async await 
module.exports.loginUserDBService=(req)=>{
    return new Promise((resolve,reject)=>{
        var myquery=`select password from user where phoneNo="${req.phone}"`;
        sql.query(myquery,(error,result)=>{
            if(error)
            {
                reject(error);
            }
            if(result.length==0)
            {
                 reject({"msg":"invalid Phone number"})
                 return;
            }
            var password=result[0].password;
            var decryptedPassword=encryptor.decrypt(password);
            if(decryptedPassword===req.password)
            {
                const logInToken = generateToken(req);
                resolve({token:logInToken});
            }
            else
            {
                reject({"msg":"Invalid phone Number and Password"});
            }
        })

    })
}