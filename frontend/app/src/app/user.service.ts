import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  uri='http://localhost:4000';
  login(usernameFromForm,passwordFromForm){
   const data={ 
    username:usernameFromForm,
    password:passwordFromForm
   }

   return this.http.post(`${this.uri}/users/login`,data);
  }
  register(firstnameForm,lastnameForm,usernameForm,passwordForm,typeForm,tel,blk){
    const data={
      firstname:firstnameForm,
      lastname:lastnameForm,
      username:usernameForm,
      password:passwordForm,
      type:typeForm,
      tel:tel,
      blk:blk

    }
    return this.http.post(`${this.uri}/users/register`,data);
  }
  changePassword(username,password){
    console.log("UserService")
      const data={
        username:username,
        password:password
      }
      return this.http.post(`${this.uri}/users/changepass`,data);
  }

}
