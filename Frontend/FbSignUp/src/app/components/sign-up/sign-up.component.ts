import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { LocalService } from '../../local.service';
import { Router } from '@angular/router';
const secretKey = 'yourSecretKey'; 


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  constructor(private fb: FormBuilder,private http:HttpClient,private localStorage:LocalService,private router:Router){

  }
  
  signUpForm=this.fb.group({
    firstName:['',[Validators.required,Validators.maxLength(12)]],
    lastName:['',[Validators.required,Validators.maxLength(15)]],
    phoneNo:['',[Validators.required,Validators.pattern]],
    password:['',Validators.required],
    date:['',Validators.required],
    month:['',Validators.required],
    year:['',Validators.required],
    gender:['',Validators.required]
  })

  logInForm=this.fb.group({
    email:['',Validators.required],
    password:['',Validators.required]
  })

  get firstName(){
    return this.signUpForm.controls['firstName'];
  }
  get lastName(){
    return this.signUpForm.controls['lastName'];
  }
  get phoneNo(){
    return this.signUpForm.controls['phoneNo'];
  }
  get password(){
    return this.signUpForm.controls['password'];
  }
  get date(){
    return this.signUpForm.controls['date'];
  }
  get month(){
    return this.signUpForm.controls['month'];
  }
  get year(){
    return this.signUpForm.controls['year'];
  }
  get gender(){
    return this.signUpForm.controls['gender'];
  }

  public months=['Jan','Feb','March','April','May','June','July','Aug','Sept','Oct','Nov','Dec'];
    createDate()
    {
      var dateArr=[];
      for(var i=1;i<=31;i++)
      {
        dateArr.push(i)
      }
      return dateArr;
    }
    createYear()
    {
      var yearArr=[];
      for(var i=1995;i<=2020;i++)
      {
        yearArr.push(i);
      }
      return yearArr;
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
    onSubmit()
    {
      if(this.signUpForm.valid)
      {
      this.http.post("http://localhost:4000/user/create",this.signUpForm.value).subscribe(
        (response:any)=>{
        this.localStorage.saveData("token",response.token);
        this.router.navigate(['/dashboard'])
      });   
      }
    else
      {
        this.validateAllFields(this.signUpForm);
      }
    }
    logIn()
    {
       this.router.navigate(['/login']);
    }

}
