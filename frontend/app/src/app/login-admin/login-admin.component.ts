import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/model/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {

  constructor(private userService:UserService,private router:Router) { }

  ngOnInit(): void {
  }
  username:string;
  password:string;
  message:string;

  login(){
    this.userService.login(this.username,this.password).subscribe((userFromDB:User)=>{
      if(userFromDB!=null){
        let firstname=userFromDB.firstname
        let lastname=userFromDB.lastname
        if(userFromDB.type==0){
          this.message="Pogresan portal za logovanje"; 
         
        }else{
         
          localStorage.setItem('name',firstname)
          localStorage.setItem('surrname',lastname)
          localStorage.setItem('username',this.username)
          this.router.navigate(['admin']);
        }
      }else{
        this.message="Pogresno korisnicko ime ili sifra, pokusajte ponovo";
      }
    });
  }
}
