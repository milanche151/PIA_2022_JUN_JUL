import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/model/user';
import { CompanyService } from '../company.service';

async function readFileAsDataURL(file: File): Promise<string> {
  console.log(file);
  const result_base64 = await new Promise((resolve) => {
    const fileReader = new FileReader();
    fileReader.onload = () => resolve(fileReader.result as string);
    fileReader.readAsDataURL(file);
});
return result_base64 as string;
}
@Component({
  selector: 'app-companyreg',
  templateUrl: './companyreg.component.html',
  styleUrls: ['./companyreg.component.css']
})
export class CompanyregComponent implements OnInit {

  constructor(private companyService:CompanyService, private router:Router) { }

  ngOnInit(): void {
    this.type=localStorage.getItem('type');
  }
  ime:string;
  prezime:string;
  korisnik:User;
  username:string;
  sifra:string;
  retype:string;
  telefon:string;
  mejl:string;
  naziv:string;
  adresa:string[]=[];
  pib:string;
  maticnibroj:string;
  message:string;
  file:File;
  type:string;
  slika:string;
  drzava:string;
  grad:string;
  ulica:string;
  pbroj:string;
  
  async addReq(){
    if(!(this.sifra===this.retype)){
      this.message="Potvrđena šifra se ne poklapa sa prvobitno unetom!Probajte ponovo";
      this.router.navigate(['/companyreg']);
    }else{
      let user:User={
        firstname:this.ime,
        lastname:this.prezime,
        username:this.username,
        password:this.retype,
        type:3
      }
        this.adresa.push(this.drzava);
        this.adresa.push(this.grad);
        this.adresa.push(this.pbroj);
        this.adresa.push(this.ulica);
      
      

   
      this.companyService.addR(user,this.telefon,this.mejl,this.naziv,this.adresa,this.pib,this.maticnibroj,this.slika).subscribe((resp)=>{
        alert(resp["message"]);
      })
      this.router.navigate(['']);
    }
  }
  async onFileChanged(event){
    
    this.file=event.target.files[0];
    this.slika = await readFileAsDataURL(this.file);
  
  }
 async addComp(){
  
  if(this.type!='1'){
     await  this.addReq();
      return;
  }
    if(!(this.sifra===this.retype)){
      this.message="Potvrđena šifra se ne poklapa sa prvobitno unetom!Probajte ponovo";
      this.router.navigate(['/companyreg']);
    }else{
      let user:User={
        firstname:this.ime,
        lastname:this.prezime,
        username:this.username,
        password:this.retype,
        type:2
      }

      localStorage.setItem("un"+user.username,"0");

      
     // alert(this.slika);
      this.companyService.addC(user,this.telefon,this.mejl,this.naziv,this.adresa,this.pib,this.maticnibroj,this.slika,"aktivno").subscribe((resp)=>{
        alert(resp["message"]);
      })
    }
  }
}
