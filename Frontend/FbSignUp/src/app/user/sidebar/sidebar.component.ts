import { Component } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { Router } from '@angular/router';
import { SidebarModule } from 'primeng/sidebar';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  constructor(private router:Router){}

   sidebarVisible:boolean=false;

   openSidebar()
   {
    this.sidebarVisible=true;
   }

   closeSidebar()
   {
    this.sidebarVisible=false;
   }
   onCustomer()
  {
    this.sidebarVisible = false
    this.router.navigate(['/customer']);
  }

  onDashboard()
  {
    this.sidebarVisible = false
    this.router.navigate(['/dashboard']);
  }


}
