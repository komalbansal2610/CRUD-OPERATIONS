import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder ,FormControl,FormGroup, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SharedService } from '../services/shared.service';
import { TooltipModule } from 'primeng/tooltip';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})

export class CustomerComponent implements OnInit {
  sharedService = inject(SharedService);
   customers:any=[];
   isEdit=false;

   ngOnInit(): void {
      this.http.get('http://localhost:4000/getcustomerDetails').subscribe((res:any)=>{
      this.sharedService.customerDetails=res;
      this.customers=res;

    });
   }

   constructor(private fb:FormBuilder,private http:HttpClient,private router:Router){}

   onSubmit()
   {
    if(this.isEdit)
    {
        this.updateCustomer();
    }else
    {
      this.addCustomer();
    }
   }

   CustomerForm=this.fb.group({
    name:['',[Validators.required,Validators.maxLength(15)]],
    email:['',[Validators.required,Validators.email]],
    phone:['',[Validators.required,Validators.pattern("^[1-9]{1}[0-9]{9}$")]],
    address:['',Validators.required],
    tags:['']
  })


  get name(){
    return this.CustomerForm.controls['name'];
  }
  get email(){
    return this.CustomerForm.controls['email'];
  }
  get phone(){
    return this.CustomerForm.controls['phone'];
  }

  get address(){
    return this.CustomerForm.controls['address'];
  }

  validateAllFields(form:FormGroup)
  {
      Object.keys(form.controls).forEach(field=>{
        const control=form.get(field);
        if(control instanceof FormControl)
        {
          control.markAsTouched({ onlySelf: true });
        }
        else if(control instanceof FormGroup)
        {
          this.validateAllFields(control);
        }
      })
  }

  showAddMessage=false;
  addCustomer()
  {
    if(this.CustomerForm.valid){
      this.http.post('http://localhost:4000/createCustomer',this.CustomerForm.value).subscribe((res:any)=>{
        this.http.get('http://localhost:4000/getcustomerDetails').subscribe((res:any)=>{
          this.sharedService.customerDetails=res;
          this.customers=res;
        });
      });
      this.showAddMessage=true;
      setTimeout(()=>{
        this.showAddMessage=false
      },2000);
      this.CustomerForm.reset();
    }
    else{
      this.validateAllFields(this.CustomerForm);
    }
  }
  
  public item={id:"",name:"",address:"",phoneNo:"",email:"",tags:""};
  itemMethods(item:any){
    this.item=item;  
  }

    onEdit(){
    this.CustomerForm.patchValue({
      name: this.item['name'],
      phone:this.item['phoneNo'],
      email:this.item['email'],
      address:this.item['address'],
      tags:this.item['tags']

    });
    this.isEdit=true;
  }
  
  showUpdateMessage=false;
  updateCustomer(){
     this.http.put(`http://localhost:4000/updateCustomerDetails/${this.item.id}`,this.CustomerForm.value)
     .subscribe((res:any)=>{
      this.http.get('http://localhost:4000/getcustomerDetails').subscribe((res:any)=>{
      this.sharedService.customerDetails=res;
      this.customers=res;
    });
     })  
     this.showUpdateMessage=true;
     setTimeout(() => {
       this.showUpdateMessage = false;
     }, 2000);
  }


  deleteCustomer()
  {
     this.http.put('http://localhost:4000/deleteCustomerDetails',this.item).subscribe((res:any)=>{
      this.http.get('http://localhost:4000/getcustomerDetails').subscribe((res:any)=>{
        this.sharedService.customerDetails=res;
        this.customers=res;
      })
     })
  }

  selectCustomer(x:any){
    this.sharedService.particularCustomerDetails=x;
    this.router.navigate(['/customer-Details',this.sharedService.particularCustomerDetails.id]);
  }

  isOffcanvasVisible: boolean = false;
  onCustomer()
  { 
    this.isOffcanvasVisible = !this.isOffcanvasVisible;
    this.router.navigate(['/customer']);
  }
}



