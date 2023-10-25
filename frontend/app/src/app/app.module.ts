import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ChangePassComponent } from './change-pass/change-pass.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { CompanyregComponent } from './companyreg/companyreg.component';
import { BuyerComponent } from './buyer/buyer.component';
import { CompanyComponent } from './company/company.component';
import { RegisteradminComponent } from './registeradmin/registeradmin.component';
import { FirstloginComponent } from './firstlogin/firstlogin.component';
import {MatTabsModule} from '@angular/material/tabs';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations'; 
import {MatMenuModule} from '@angular/material/menu'; 
import {MatPaginatorModule} from '@angular/material/paginator'; 
import {MatTableModule} from '@angular/material/table'; 
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog'; 
@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    LoginComponent,
    AdminComponent,
    RegisterComponent,
    ChangePassComponent,
    LoginAdminComponent,
    CompanyregComponent,
    BuyerComponent,
    CompanyComponent,
    RegisteradminComponent,
    FirstloginComponent,
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatTabsModule,
    NoopAnimationsModule,
    MatMenuModule,
    MatPaginatorModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
