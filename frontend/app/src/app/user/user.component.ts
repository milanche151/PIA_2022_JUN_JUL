import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.firstname=localStorage.getItem('name');
    this.lastname=localStorage.getItem('surrname');
    localStorage.setItem('type','0');
  }
  firstname:string;
  lastname:string;

}
