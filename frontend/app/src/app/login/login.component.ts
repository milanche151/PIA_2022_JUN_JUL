import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/model/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService:UserService,private router:Router) { }

  ngOnInit(): void {
    localStorage.setItem('type','0')
  }
  username:string;
  password:string;
  message:string;
  type:number;
  register(){
    localStorage.setItem('type','0');
    
  }
  login(){
    this.userService.login(this.username,this.password).subscribe((userFromDB:User)=>{
      if(userFromDB!=null){
        let firstname=userFromDB.firstname
        let lastname=userFromDB.lastname 
        localStorage.setItem('name',firstname)
        localStorage.setItem('surrname',lastname)
        localStorage.setItem('username',this.username)
        localStorage.setItem('pass',this.password)
        if(userFromDB.type==0 && userFromDB.type==this.type){
          this.router.navigate(['/buyer']);
        }else if(userFromDB.type==2 && userFromDB.type==this.type){
          localStorage.setItem("lun",userFromDB.username);
         
          this.router.navigate(['/company']);
        }else if(userFromDB.type==3 && this.type==2 ){
          this.message="Zahtev za registraciju jos nije potvrdjen!"; 
        }
        else{
          this.message="Pogresan portal za logovanje ili pogresan tip korisnika"; 
        }
      }else{
        this.message="Pogresno korisnicko ime ili sifra, pokusajte ponovo";
      }
    });
  }

}
