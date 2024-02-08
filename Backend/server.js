const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const cors=require('cors');
const userRouter=require('./user/userRouter');
const log4js=require('log4js');

log4js.configure({
    appenders: { console: { type: 'console' } },
    categories: { default: { appenders: ['console'], level: 'info' } }
});

const logger=log4js.getLogger();
const port=4000;
global.app=app;



app.listen(port,(error)=>{
    if(error)
    {
        console.log(error);
    }
    else
    {
        console.log("server is started on port",port);
    }
})
app.use(cors());
app.use(bodyParser.json());
app.use(log4js.connectLogger(logger, { format: ':status :method :url'})); 
app.use('/user',userRouter);
require('./customer');


