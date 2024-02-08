import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { UserModuleRouting } from './user-routing.module';
import { CustomerComponent } from './customer/customer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LogInComponent } from './log-in/log-in.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import {SidebarModule} from 'primeng/sidebar';
import {ButtonModule} from 'primeng/button'
import { TooltipModule } from 'primeng/tooltip';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [
    DashBoardComponent,
    CustomerComponent,
    LogInComponent,
    CustomerDetailsComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    UserModuleRouting,
    ReactiveFormsModule,
    HttpClientModule,
    SidebarModule,
    ButtonModule,
    TooltipModule,
    OverlayPanelModule,
    PasswordModule,
    ToastModule
    // BrowserAnimationsModule
  ]
})
export class UserModule { }
