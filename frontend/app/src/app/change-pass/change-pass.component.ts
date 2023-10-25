import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.css']
})
export class ChangePassComponent implements OnInit {

  constructor(private userService:UserService,private router:Router) { }

  ngOnInit(): void {
    this.username=localStorage.getItem('username')
    this.oldPass=localStorage.getItem('pass')
  }
  username:string;
  oldPass:string;
  newPasword:string;
  retyped:string;
  message:string;
  pass:string;
  validate(){
    if(!(this.pass===this.oldPass)){
      this.message="Uneta stara sifra nije ispravna";
      this.router.navigate(['/changepass']);
    }
    if(!(this.newPasword===this.retyped)){
        this.message="Potvrđena šifra se ne poklapa sa prvobitno unetom!Probajte ponovo";
        this.router.navigate(['/changepass']);
    }else{
      this.userService.changePassword(this.username,this.retyped).subscribe((respObject)=>{
        if(respObject["message"]==="error"){
          this.message="Dogodila se greska pokusajte ponovo";
          this.router.navigate(['/changepass']);
        }
        else{
          alert(respObject["message"]);
          this.router.navigate(['']);
        }
      })
    }
  }
}
