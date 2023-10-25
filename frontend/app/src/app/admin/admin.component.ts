import { transformAll } from '@angular/compiler/src/render3/r3_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { subscribeOn } from 'rxjs';
import { Company } from 'src/model/company';
import { Request } from 'src/model/request';
import { User } from 'src/model/user';
import { CompanyService } from '../company.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private companyService:CompanyService, private router:Router) { }

  ngOnInit(): void {
    this.username=localStorage.getItem('username');
    localStorage.setItem('type','1')
    this.showReqs=false
    this.showComp=false
    this.getAllReqs();
    this.getAllComp()
  }
  username:string;
  showReqs:boolean
  showComp:boolean;
  allRequests:Request[];
  allCompanies:Company[];
  getAllReqs(){
      this.companyService.getReqs().subscribe((zahtevi:Request[])=>{
        this.allRequests=zahtevi

     
    })
  }
  getAllComp(){
    this.companyService.getComp().subscribe((zahtevi:Company[])=>{
   //  alert(zahtevi[2].korisnik);
      this.allCompanies=zahtevi;
   
   
  })
}
  deleteReq(req:Request,user:User){

      this.companyService.delR(req.maticnibroj,user).subscribe((res)=>{
        if(res["message"]==="Obrisan zahtev"){
          alert("Zahtev uspesno odbijen");
          this.getAllReqs(); 
          this.getAllComp();
          this.router.navigate['/admin'];
        } 
          
          
      })
     
    
    
  }
   addComp(req:Request){
  
        let user:User={
          firstname:req.korisnik.firstname,
          lastname:req.korisnik.lastname,
          username:req.korisnik.username,
          password:req.korisnik.password,
          type:2
        }
        localStorage.setItem("un"+user.username,"0");
        this.companyService.addC(user,req.telefon,req.mejl,req.naziv,req.adresa,req.pib,req.maticnibroj,req.slika,"aktivno").subscribe((resp)=>{
          alert(resp["message"]);
          this.getAllComp();
          this.getAllReqs();
          this.router.navigate['/admin'];
        })
        
    }
    activate(cmp:Company){

      localStorage.setItem("un"+cmp.korisnik.username,"0");
      if(cmp.status=="aktivno"){
        alert("Preduzece je vec aktivno")
      }else{
        this.companyService.activate(cmp).subscribe((res)=>{
          this.getAllComp();
          this.getAllReqs();
          this.router.navigate['/admin'];
        })
        
      }
      
    }
    deactivate(cmp:Company){
      if(cmp.status!="aktivno"){
        alert("Preduzece je vec deaktivirano")
      }else{
        this.companyService.deactivate(cmp).subscribe((res)=>{
          this.getAllComp();
          this.getAllReqs();
          this.router.navigate['/admin'];
        })
      }
      
    }
    logout(){
      sessionStorage.clear();
      this.router.navigate(['']);
    }
}