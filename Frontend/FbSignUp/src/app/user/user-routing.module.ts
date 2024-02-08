import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { CustomerComponent } from './customer/customer.component';
import { LogInComponent } from './log-in/log-in.component';
import { SignUpComponent } from '../components/sign-up/sign-up.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
    {path:'dashboard',component:DashBoardComponent},
    {path:'login',component:LogInComponent},
    {path:'signUp',component:SignUpComponent},
    {path:'customer-Details/:id',component:CustomerDetailsComponent,canActivate:[authGuard]},
    {path:'customer',component:CustomerComponent}
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
export class UserModuleRouting { }