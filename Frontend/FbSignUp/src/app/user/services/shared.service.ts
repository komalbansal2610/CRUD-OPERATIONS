import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
   
  customerDetails:any=[];
  particularCustomerDetails:any=[];
  constructor() { }
}
