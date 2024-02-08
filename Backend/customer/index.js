const controller=require('./customerController')

app.post('/createCustomer',controller.createCustomerController);
app.get('/getcustomerDetails',controller.getCustomerDetailsController);
app.put('/updateCustomerDetails/:id',controller.updateCustomerDetailsController);
app.put('/deleteCustomerDetails',controller.deleteCustomerDetailsController);
app.get('/getParticularcustomerDetails/:id',controller.getParticularCustomerDetailsController);