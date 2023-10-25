import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-registeradmin',
  templateUrl: './registeradmin.component.html',
  styleUrls: ['./registeradmin.component.css']
})
export class RegisteradminComponent implements OnInit {

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
    this.userService.register(this.firstname,this.lastname,this.username,this.password,1,this.telefon,this.brojlk).subscribe(respObj=>{
      if(respObj['message']='ok'){
        this.message='User added!'
        this.router.navigate(['/loginadmin']);
      }else{
        this.message='Error'
      }
    })
  }

}
