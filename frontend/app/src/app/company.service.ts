import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Company, Kasa, Magacin } from 'src/model/company';
import { goodsinfo } from 'src/model/goodsinfo';
import { goodsw } from 'src/model/goodswarehouse';
import { User } from 'src/model/user';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  
  constructor(private http:HttpClient) { }

  uri='http://localhost:4000';

  addC(userForm,telefon,mejl,naziv,adresa,pib,maticni,slika,status:string){

    const data={
      user:userForm,
      tel:telefon,
      mail:mejl,
      name:naziv,
      adr:adresa,
      pib:pib,
      mat:maticni,
      img:slika,
      status:status
    }
    return this.http.post(`${this.uri}/companies/register`,data);

  }  
  addP(user: User, telefon: string, mejl: string, naziv: string, adresa: string[], pib: string, maticnibroj: string, slika: string,brDana:number,rabat:number) {

    const data={
      user:user,
      tel:telefon,
      mail:mejl,
      name:naziv,
      adr:adresa,
      pib:pib,
      mat:maticnibroj,
      img:slika,
      brDana:brDana,
      rabat:rabat
     
    }
    return this.http.post(`${this.uri}/companies/adpurch`,data);
  }
  addR(user: User, telefon: string, mejl: string, naziv: string, adresa: string[], pib: string, maticnibroj: string, slika: string) {
    const data={
      user:user,
      tel:telefon,
      mail:mejl,
      name:naziv,
      adr:adresa,
      pib:pib,
      mat:maticnibroj,
      img:slika
    }

    return this.http.post(`${this.uri}/companies/makereq`,data);
  }
  getReqs() {
    
    return this.http.post(`${this.uri}/companies/getreqs`,null);
  } 
  delR(maticnibroj: string,user:User) {
    const data={
     maticni:maticnibroj,
     user:user
    }
    return this.http.post(`${this.uri}/companies/deleter`,data);

  } 
   getComp() {
    return this.http.post(`${this.uri}/companies/getcomp`,null);
  }
  deactivate(cmp: Company) {
    let data={
      comp:cmp
    }
    return this.http.post(`${this.uri}/companies/deact`,data);
  }
  activate(cmp: Company) {
    let data={
      comp:cmp
    }
    return this.http.post(`${this.uri}/companies/act`,data);
  } 
  addInfo(uname: string, kategorija: string, sifra: string[], pdv: boolean, ziro: string[], kase: number, magacini: number) {
    let data = {
      uname: uname,  kategorija: kategorija, sifra: sifra, pdv: pdv, ziro: ziro, kase: kase, magacini: magacini
    }
    return this.http.post(`${this.uri}/companies/addinfo`,data);

  }
  getMyComp(uname: string) {
    let data={
      uname:uname
    }
    return this.http.post(`${this.uri}/companies/mycomp`,data);
  }
  updateMagacin(myComp: Company, mag: Magacin[]) {
    let data={
      myComp: myComp, mag: mag
    }
    return this.http.post(`${this.uri}/companies/updm`,data);
  }
  updateKasa(myComp: Company, kas: Kasa[]) {
    let data={
      myComp: myComp, kas: kas
    }
    return this.http.post(`${this.uri}/companies/updk`,data);
  }  
  byPib(pib: string) {
    let data={
      pib:pib
    }
    return this.http.post(`${this.uri}/companies/byp`,data);
  }  
  addGood(tmpart: goodsinfo, tmpartw: goodsw[]) {
    let data={
      info:tmpart,
      warehouse:tmpartw
    }
   
    return this.http.post(`${this.uri}/companies/addgood`,data);
  }
  getAllG(mat:string) {
    let data={
      mat:mat
    }
    return this.http.post(`${this.uri}/companies/getg`,data);
  }

}
