import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashBoardComponent } from './user/dash-board/dash-board.component';
import { LogInComponent } from './user/log-in/log-in.component';
import { CustomerComponent } from './user/customer/customer.component';
import { authGuard } from './user/guards/auth.guard';
import { CustomerDetailsComponent } from './user/customer-details/customer-details.component';

const routes: Routes = [
  {path:'',redirectTo:'signUp',pathMatch:'full'},
  {path:'signUp',component:SignUpComponent},
  {path: 'dashboard',component:DashBoardComponent,canActivate:[authGuard]},
  {path: 'login',component:LogInComponent},
  {path:'customer',component:CustomerComponent,canActivate:[authGuard]},
  {path:'customer-Details/:id',component:CustomerDetailsComponent,canActivate:[authGuard]},


  // {path:'**',component:InvalidURLComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
