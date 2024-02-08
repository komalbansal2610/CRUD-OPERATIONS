import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { LocalService } from 'src/app/local.service';
@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent {
  constructor(private router:Router,private http:HttpClient,private LocalStorage:LocalService){}

  logOut()
  {
    this.LocalStorage.removeData("token");
    this.router.navigate(['/signUp']);
  }

}
