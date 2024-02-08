import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { SharedService } from '../services/shared.service';
@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {
  sharedService=inject(SharedService);
  customer:any=[];

  ngOnInit():void{
    this.http.get(`http://localhost:4000/getParticularcustomerDetails/${this.sharedService.particularCustomerDetails.id}`)
    .subscribe((res:any)=>{
      this.customer=res;
    })
  }

  constructor(private http:HttpClient){}
}

