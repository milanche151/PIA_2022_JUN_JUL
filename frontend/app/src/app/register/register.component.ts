import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService:UserService, private router:Router) { }

  ngOnInit(): void {
  }
  firstname:string;
  lastname:string;
  username:string;
  password:string;
  brojlk:string;
  telefon:string;

  message:string;

  register(){
    this.userService.register(this.firstname,this.lastname,this.username,this.password,0,this.telefon,this.brojlk).subscribe(respObj=>{
      if(respObj['message']='ok'){
        this.message='User added!'
        this.router.navigate(['admin']);
      }else{
        this.message='Error'
      }
    })
  }
}
