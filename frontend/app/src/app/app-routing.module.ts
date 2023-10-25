import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { BuyerComponent } from './buyer/buyer.component';
import { ChangePassComponent } from './change-pass/change-pass.component';
import { CompanyComponent } from './company/company.component';
import { CompanyregComponent } from './companyreg/companyreg.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RegisteradminComponent } from './registeradmin/registeradmin.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [ 
  {path:"", component:LoginComponent},
  {path:"user", component:UserComponent},
  {path:"login-admin",component:AdminComponent},
  {path:"register",component:RegisterComponent},
  {path:"changepass",component:ChangePassComponent},
  {path:"loginadmin",component:LoginAdminComponent},
  {path:"admin",component:AdminComponent},
  {path:"companyreg",component:CompanyregComponent},
  {path:"buyer",component:BuyerComponent},
  {path:"company",component:CompanyComponent},
  {path:"registerAdmin",component:RegisteradminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
