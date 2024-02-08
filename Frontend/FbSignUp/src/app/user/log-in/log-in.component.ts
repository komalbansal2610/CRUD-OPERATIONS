import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder,FormGroup,FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalService } from 'src/app/local.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {
  constructor(private fb:FormBuilder,private http:HttpClient,private router:Router,private LocalStorage:LocalService,private messageService:MessageService){}
  fieldTextType:boolean=false;

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  logInForm=this.fb.group({
    phone:['',[Validators.required,Validators.pattern]],
    password:['',Validators.required]
  })

  get phone()
  {
    return this.logInForm.controls['phone'];
  }

  get password()
  {
    return this.logInForm.controls['password'];
  }

  // handleApiResponse(response: any, isSuccessful: boolean) {
  //   const message = {
  //   severity: isSuccessful ? 'success' : 'error',
  //   summary: isSuccessful ? 'Success' : 'Error',
  //   detail: response.message || 'An error occurred.',
  //   };
    
  //   this.messageService.add(message);
  //   }
  showErrorMessage=false;
  public item={phone:"",password:""};
  logIn()
  {
      this.http.post('http://localhost:4000/user/login',this.logInForm.value)
      .subscribe({
        next:(res:any)=>{
          this.LocalStorage.saveData("token",res.token);
          // this.handleApiResponse({message:"User Login Successfully"},true);
          setTimeout(()=>{
            this.router.navigate(['/dashboard']);
          },1000)
      },
        error:(err:any)=>{
          this.showErrorMessage = true;
          setTimeout(() => {
            this.showErrorMessage = false;
          }, 2000);
      }
      });
  }    
}
