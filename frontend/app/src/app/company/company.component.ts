import { ChangeDetectorRef, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormGroup,FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


import { Company, Kasa, Magacin } from 'src/model/company';
import { goodsinfo } from 'src/model/goodsinfo';
import { goodsw } from 'src/model/goodswarehouse';
import { User } from 'src/model/user';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
  template: `<canvas #canvas></canvas>`,
 /* styles: [
    `
      canvas {
        border: 1px solid #000;
      }
    `
  ]*/
  
})
export class CompanyComponent implements OnInit {

  constructor(private router:Router,private companyService:CompanyService,private fb1:FormBuilder,private _changeDetectorRef: ChangeDetectorRef,private _changeDetectorRef1: ChangeDetectorRef,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.myComp.korisnik=new User();
    this.myComp.adresa=["","",""]
    let un=localStorage.getItem("lun")
    this.uname=un;
    this.num=localStorage.getItem("un"+un);
    if(this.num=="0"){
      
      this.first=true;
    }
    else{
      this.first=false;
    }
  //  console.log(this.first);

     this.getMyComp();
     if(this.myComp.kategorija==="Prodavnica"){
      this.prod=true;
     }
     
     this.narucilac.korisnik=new User();
    //console.log(this.tableData[0].naziv);
     
     
  }

  setPagination(tableData) {
    
    this.dataSource = new MatTableDataSource<any>(tableData);
    this.dataSource1 = new MatTableDataSource<any>(this.tableData1);
    this._changeDetectorRef.detectChanges();
    //this._changeDetectorRef1.detectChanges();
    this.dataSource.paginator = this.paginator.toArray()[0];
    this.dataSource1.paginator = this.paginator.toArray()[1];
    this.dataObs$ = this.dataSource.connect();
    this.dataObs1$ = this.dataSource1.connect();
  }

  dataSource: MatTableDataSource<any>;
  dataSource1: MatTableDataSource<any>;
  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();

  dataObs$: Observable<any>;
  dataObs1$: Observable<any>;


  
  /*openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DialogAnimationsExampleDialog, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }*/

  prod:boolean=false;
  nizkasa:Kasa[];
  nizmagacina:Magacin[];
  myComp:Company=new Company(); 
  tableData:any[]=[]
  num:string;
  uname:string;
  first:boolean;
  kategorija:string;
  sifra:string;
  pdv:boolean;
  ziro:string;
  kase:number;
  magacini:number;
  edit:boolean=false;
  menu1:boolean=false;
  menu2:boolean=false;
  menu3:boolean=false;
  menu4:boolean=false;
  menu5:boolean=false;
  narucilac:Company=new Company();
  drzava:string;
  grad:string;
  ulica:string;
  pbroj:string;
  file:File;
  slika:string;
  rabat:number=0;
  brDana:number=0;
  mb:string;
  chosen:any;
  pib:string;
  message:string;
  img:string="";
  filtered:any;
  adresa:string[]=[]; 
  allGoods:goodsinfo[];
  purchs:Company[];
  sifre:string[]=[];
  ziroi:string[]=[]; 
  unosenje:boolean=false;
  tmpart:goodsinfo={
    comp:null,
    sifra:null,
    naziv:null,
    jedinica_mere:null,
    stopa:null,
    tip:null,
    proizvodjac:null,
    zporekla:null,
    strani_naziv:null,
    barkod:null,
    carinska_tarifa:null,
    ekoak:null,
    minz:null,
    maxz:null,
    opis:null,
    deklaracija:null,
    slika:this.img

  };

  tmpartw:goodsw[];
 
  /*vars*/
  /*sifForm:FormGroup;
  ziroForm:FormGroup;*/
  submit(){
    localStorage.setItem("un"+this.uname,"1");
    this.sifre.push(this.sifra);
    this.ziroi.push(this.ziro)
    this.first=false;
    this.companyService.addInfo(
      this.uname,
      this.kategorija,
      this.sifre,
      this.pdv,
      this.ziroi,
      this.kase,
      this.magacini).subscribe((res)=>{
       // alert(res["message"]+" "+this.first);
        this.router.navigate(['/company'])
      });
    

  }
  meni1(){
    this.menu1=true;
    this.menu2=false;
    this.menu3=false;
    this.menu4=false;
    this.menu5=false;
    this.router.navigate(['/login']);
  }
  meni2(){
    this.menu1=false;
    this.menu2=true;
    this.menu3=false;
    this.menu4=false;
    this.menu5=false;
    this.router.navigate(['/company']);
  }
  meni3(){
    this.menu1=false;
    this.menu2=false;
    this.menu3=true;
    this.menu4=false;
    this.menu5=false;
    this.router.navigate(['/company']);
  }
  meni4(){
    this.menu1=false;
    this.menu2=false;
    this.menu3=false;
    this.menu4=true;
    this.menu5=false;
    this.router.navigate(['/company']);
  }
  meni5(){
    this.menu1=false;
    this.menu2=false;
    this.menu3=false;
    this.menu4=false;
    this.menu5=true;
    this.router.navigate(['/company']);
  }
  reset(){
    this.menu1=false;
    this.menu2=false;
    this.menu3=false;
    this.menu4=false;
    this.menu5=false;
    this.router.navigate(['/company']);
  }
   getMyComp(){
      this.companyService.getMyComp(this.uname).subscribe((res:Company)=>{
        this.myComp=res;
        this.nizkasa=new Array<Kasa>(this.myComp.kase);
        for(let i=0;i<this.myComp.kase;i++){
          this.nizkasa[i]={
            tip:this.myComp.kas[i].tip,
            lokacija:this.myComp.kas[i].lokacija
          }
        }
        this.nizmagacina=new Array<Magacin>(this.myComp.magacini)
        this.tmpartw=new Array<goodsw>(this.myComp.magacini);
       //alert(this.myComp.telefon)
      for(let i = 0;i<this.myComp.magacini;i++){
      this.tmpartw[i]=new goodsw();
      this.tmpartw[i]={
        info:this.tmpart,
        minkol:null,
        maxkol:null,
        magacin:null,
        nabavna:null,
        prodajna:null,
        stanje:null
      }
     }
        for(let i=0;i<this.myComp.magacini;i++){
          this.nizmagacina[i]={
            id:this.myComp.mag[i].id,
            naziv:this.myComp.mag[i].naziv
          }
        }
        this.getGoods();
        return;
      });
      
  }
  izmeniM(){
    for(let i=0;i<this.myComp.magacini;i++){
      if(this.nizmagacina[i]==undefined){
        this.nizmagacina[i]={
          id:this.myComp.mag[i].id,
          naziv:this.myComp.mag[i].naziv
        }
      }
    }
      this.companyService.updateMagacin(this.myComp,this.nizmagacina).subscribe((res)=>{
        alert(res["message"]);

      })

  }
  izmeniK(){
    for(let i=0;i<this.myComp.kase;i++){
      if(this.nizkasa[i]==undefined){
        this.nizkasa[i]={
         tip:this.myComp.kas[i].tip,
          lokacija:this.myComp.kas[i].lokacija
        }
      }
    }
   // alert(this.nizkasa);
   this.companyService.updateKasa(this.myComp,this.nizkasa).subscribe((res)=>{
     alert(res["message"]);
   })
   //alert("Izasao");
  }
  async onFileChanged(event){
    
    this.file=event.target.files[0];
    this.slika = await readFileAsDataURL(this.file);
  
  }
  addP(){
    
      let user:User={
        firstname:this.narucilac.korisnik.firstname,
        lastname:this.narucilac.korisnik.lastname,
        username:this.narucilac.korisnik.username,
        password:this.narucilac.korisnik.password,
        type:3
      }
        this.adresa.push(this.drzava);
        this.adresa.push(this.grad);
        this.adresa.push(this.pbroj);
        this.adresa.push(this.ulica);
      
      

   
      this.companyService.addP(user,this.narucilac.telefon,this.narucilac.mejl,this.narucilac.naziv,this.adresa,this.narucilac.pib,this.narucilac.maticnibroj,this.slika,this.brDana,this.rabat).subscribe((resp)=>{
        alert(resp["message"]);
      })
      
    }
    addPib(){
        this.companyService.byPib(this.pib).subscribe((res:Company[])=>{
            this.purchs=res;
        })
      
    }
    logout(){
      
      sessionStorage.clear();
      this.router.navigate(['']);
    }
    tableData1:any[];
    getGoods(){
      
      this.companyService.getAllG(this.myComp.maticnibroj).subscribe((res:goodsinfo[])=>{
        this.allGoods=res;
        this.tableData=[];
        this.tableData1=[];
        for(let i=0;i<this.allGoods.length;i++){
          this.tableData.push({
             naziv:this.allGoods[i].naziv,
             jedinica_mere:this.allGoods[i].jedinica_mere,
             stopa:this.allGoods[i].stopa,
             sifra:this.allGoods[i].sifra,
             proizvodjac:this.allGoods[i].proizvodjac

          })
          this.tableData1.push({
            naziv:this.allGoods[i].naziv,
            jedinica_mere:this.allGoods[i].jedinica_mere,
            stopa:this.allGoods[i].stopa,
            sifra:this.allGoods[i].sifra,
            proizvodjac:this.allGoods[i].proizvodjac,
            button:"Dodaj"
         })
         
        }
        this.setPagination(this.tableData)
        
      });
    }
    addP1(){
      alert(this.mb);
      this.chosen=this.purchs.find(({maticnibroj})=>maticnibroj==this.mb)
      alert(this.chosen.telefon);

       this.companyService.addP(this.chosen.korisnik,this.chosen.telefon,this.chosen.mejl,this.chosen.naziv,this.chosen.adresa,this.chosen.pib,this.chosen.maticnibroj,this.chosen.slika,this.brDana,this.rabat).subscribe((resp)=>{
          alert(resp["message"]);
        })
    }
    
    unos(){
      this.unosenje=true;
    }
    unesi(){
     
      this.unosenje=false;
      //alert(this.tmpart);
      this.tmpart.comp=this.myComp;
      for(let i = 0;i<this.myComp.magacini;i++){
        this.tmpartw[i].magacin=this.nizmagacina[i].naziv;
      }
      this.companyService.addGood(this.tmpart,this.tmpartw).subscribe((res)=>{
        alert(res["message"])
        this.getGoods();
        this.menu1=false;
        this.menu2=false;
        this.menu3=true;
        this.menu4=false;
        this.menu5=false;
        this.router.navigate(['/company']);
      })
    }
    kategorijaR:string;
    ind:number=0;
    tabs = ['Hrana', 'Pice', 'Ostalo'];
    kats=[[],[],[]]
    selected = new FormControl(0);
    tabChanged(tabChangeEvent: MatTabChangeEvent): void {
     this.ind=tabChangeEvent.index
    }
    addTab(selectAfterAdding: boolean) {
      this.tabs.push(this.kategorijaR);
      this.kats.push([]);
      if (selectAfterAdding) {
        this.selected.setValue(this.tabs.length - 1);
     } 
     
  }
 
  removeTab(index: number) {
    this.tabs.splice(index, 1);
  }
  dodajArtikal(ind:number,index:number){
    this.kats[ind].push({
            naziv:this.tableData1[index].naziv,
            jedinica_mere:this.tableData1[index].jedinica_mere,
            stopa:this.tableData1[index].stopa,
            sifra:this.tableData1[index].sifra,
            proizvodjac:this.tableData1[index].proizvodjac,
          
    })
    delete this.tableData1[index];
    this.menu1=false;
    this.menu2=false;
    this.menu3=false;
    this.menu4=true;
    this.menu5=false;
    this.router.navigate(['/company']);
    

  }
   
}
async function readFileAsDataURL(file: File): Promise<string> {
  console.log(file);
  const result_base64 = await new Promise((resolve) => {
    const fileReader = new FileReader();
    fileReader.onload = () => resolve(fileReader.result as string);
    fileReader.readAsDataURL(file);
});
return result_base64 as string;
}
/*
@Component({
  selector: 'dialog-animations-example-dialog',
  templateUrl: 'dialog-animations-example-dialog.html',
})
export class DialogAnimationsExampleDialog {
  constructor(private router:Router,private companyService:CompanyService,private fb1:FormBuilder,private _changeDetectorRef: ChangeDetectorRef,public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>) {}
  ngOnInit(): void {
    this.myComp.korisnik=new User();
    this.myComp.adresa=["","",""]
    let un=localStorage.getItem("lun")
    this.uname=un;
    this.num=localStorage.getItem("un"+un);
    if(this.num=="0"){
      
      this.first=true;
    }
    else{
      this.first=false;
    }
  //  console.log(this.first);

     this.getMyComp();
     if(this.myComp.kategorija==="Prodavnica"){
      this.prod=true;
     }
     
     this.narucilac.korisnik=new User();
    //console.log(this.tableData[0].naziv);
     
     
  }

  setPagination(tableData) {
    
    this.dataSource = new MatTableDataSource<any>(tableData);
   
    this._changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;
  
    this.dataObs$ = this.dataSource.connect();

  }

  dataSource: MatTableDataSource<any>;

  @ViewChildren(MatPaginator) paginator:MatPaginator;
  dataObs$: Observable<any>;



  


  prod:boolean=false;
  nizkasa:Kasa[];
  nizmagacina:Magacin[];
  myComp:Company=new Company(); 
  tableData:any[]=[]
  num:string;
  uname:string;
  first:boolean;
  kategorija:string;
  sifra:string;
  pdv:boolean;
  ziro:string;
  kase:number;
  magacini:number;
  edit:boolean=false;
  menu1:boolean=false;
  menu2:boolean=false;
  menu3:boolean=false;
  menu4:boolean=false;
  menu5:boolean=false;
  narucilac:Company=new Company();
  drzava:string;
  grad:string;
  ulica:string;
  pbroj:string;
  file:File;
  slika:string;
  rabat:number=0;
  brDana:number=0;
  mb:string;
  chosen:any;
  pib:string;
  message:string;
  img:string="";
  filtered:any;
  adresa:string[]=[]; 
  allGoods:goodsinfo[];
  purchs:Company[];
  sifre:string[]=[];
  ziroi:string[]=[]; 
  unosenje:boolean=false;
  tmpart:goodsinfo={
    comp:null,
    sifra:null,
    naziv:null,
    jedinica_mere:null,
    stopa:null,
    tip:null,
    proizvodjac:null,
    zporekla:null,
    strani_naziv:null,
    barkod:null,
    carinska_tarifa:null,
    ekoak:null,
    minz:null,
    maxz:null,
    opis:null,
    deklaracija:null,
    slika:this.img

  };

  tmpartw:goodsw[];
 

  submit(){
    localStorage.setItem("un"+this.uname,"1");
    this.sifre.push(this.sifra);
    this.ziroi.push(this.ziro)
    this.first=false;
    this.companyService.addInfo(
      this.uname,
      this.kategorija,
      this.sifre,
      this.pdv,
      this.ziroi,
      this.kase,
      this.magacini).subscribe((res)=>{
       // alert(res["message"]+" "+this.first);
        this.router.navigate(['/company'])
      });
    

  }
  meni1(){
    this.menu1=true;
    this.menu2=false;
    this.menu3=false;
    this.menu4=false;
    this.menu5=false;
    this.router.navigate(['/company']);
  }
  meni2(){
    this.menu1=false;
    this.menu2=true;
    this.menu3=false;
    this.menu4=false;
    this.menu5=false;
    this.router.navigate(['/company']);
  }
  meni3(){
    this.menu1=false;
    this.menu2=false;
    this.menu3=true;
    this.menu4=false;
    this.menu5=false;
    this.router.navigate(['/company']);
  }
  meni4(){
    this.menu1=false;
    this.menu2=false;
    this.menu3=false;
    this.menu4=true;
    this.menu5=false;
    this.router.navigate(['/company']);
  }
  meni5(){
    this.menu1=false;
    this.menu2=false;
    this.menu3=false;
    this.menu4=false;
    this.menu5=true;
    this.router.navigate(['/company']);
  }
  reset(){
    this.menu1=false;
    this.menu2=false;
    this.menu3=false;
    this.menu4=false;
    this.menu5=false;
    this.router.navigate(['/company']);
  }
   getMyComp(){
      this.companyService.getMyComp(this.uname).subscribe((res:Company)=>{
        this.myComp=res;
        this.nizkasa=new Array<Kasa>(this.myComp.kase);
        for(let i=0;i<this.myComp.kase;i++){
          this.nizkasa[i]={
            tip:this.myComp.kas[i].tip,
            lokacija:this.myComp.kas[i].lokacija
          }
        }
        this.nizmagacina=new Array<Magacin>(this.myComp.magacini)
        this.tmpartw=new Array<goodsw>(this.myComp.magacini);
       //alert(this.myComp.telefon)
      for(let i = 0;i<this.myComp.magacini;i++){
      this.tmpartw[i]=new goodsw();
      this.tmpartw[i]={
        info:this.tmpart,
        minkol:null,
        maxkol:null,
        magacin:null,
        nabavna:null,
        prodajna:null,
        stanje:null
      }
     }
        for(let i=0;i<this.myComp.magacini;i++){
          this.nizmagacina[i]={
            id:this.myComp.mag[i].id,
            naziv:this.myComp.mag[i].naziv
          }
        }
        this.getGoods();
        return;
      });
      
  }
  izmeniM(){
    for(let i=0;i<this.myComp.magacini;i++){
      if(this.nizmagacina[i]==undefined){
        this.nizmagacina[i]={
          id:this.myComp.mag[i].id,
          naziv:this.myComp.mag[i].naziv
        }
      }
    }
      this.companyService.updateMagacin(this.myComp,this.nizmagacina).subscribe((res)=>{
        alert(res["message"]);

      })

  }
  izmeniK(){
    for(let i=0;i<this.myComp.kase;i++){
      if(this.nizkasa[i]==undefined){
        this.nizkasa[i]={
         tip:this.myComp.kas[i].tip,
          lokacija:this.myComp.kas[i].lokacija
        }
      }
    }
   // alert(this.nizkasa);
   this.companyService.updateKasa(this.myComp,this.nizkasa).subscribe((res)=>{
     alert(res["message"]);
   })
   //alert("Izasao");
  }
  async onFileChanged(event){
    
    this.file=event.target.files[0];
    this.slika = await readFileAsDataURL(this.file);
  
  }
  addP(){
    
      let user:User={
        firstname:this.narucilac.korisnik.firstname,
        lastname:this.narucilac.korisnik.lastname,
        username:this.narucilac.korisnik.username,
        password:this.narucilac.korisnik.password,
        type:3
      }
        this.adresa.push(this.drzava);
        this.adresa.push(this.grad);
        this.adresa.push(this.pbroj);
        this.adresa.push(this.ulica);
      
      

   
      this.companyService.addP(user,this.narucilac.telefon,this.narucilac.mejl,this.narucilac.naziv,this.adresa,this.narucilac.pib,this.narucilac.maticnibroj,this.slika,this.brDana,this.rabat).subscribe((resp)=>{
        alert(resp["message"]);
      })
      
    }
    addPib(){
        this.companyService.byPib(this.pib).subscribe((res:Company[])=>{
            this.purchs=res;
        })
      
    }
    logout(){
      
      sessionStorage.clear();
      this.router.navigate(['']);
    }
    tableData1:any[];
    getGoods(){
      
      this.companyService.getAllG(this.myComp.maticnibroj).subscribe((res:goodsinfo[])=>{
        this.allGoods=res;
        this.tableData=[];
        this.tableData1=[];
        for(let i=0;i<this.allGoods.length;i++){
          this.tableData.push({
             naziv:this.allGoods[i].naziv,
             jedinica_mere:this.allGoods[i].jedinica_mere,
             stopa:this.allGoods[i].stopa,
             sifra:this.allGoods[i].sifra,
             proizvodjac:this.allGoods[i].proizvodjac

          })
          this.tableData1.push({
            naziv:this.allGoods[i].naziv,
            jedinica_mere:this.allGoods[i].jedinica_mere,
            stopa:this.allGoods[i].stopa,
            sifra:this.allGoods[i].sifra,
            proizvodjac:this.allGoods[i].proizvodjac,
            button:"Dodaj"
         })
         
        }
        this.setPagination(this.tableData)
        
      });
    }
    addP1(){
      alert(this.mb);
      this.chosen=this.purchs.find(({maticnibroj})=>maticnibroj==this.mb)
      alert(this.chosen.telefon);

       this.companyService.addP(this.chosen.korisnik,this.chosen.telefon,this.chosen.mejl,this.chosen.naziv,this.chosen.adresa,this.chosen.pib,this.chosen.maticnibroj,this.chosen.slika,this.brDana,this.rabat).subscribe((resp)=>{
          alert(resp["message"]);
        })
    }
    
    unos(){
      this.unosenje=true;
    }
    unesi(){
     
      this.unosenje=false;
      //alert(this.tmpart);
      this.tmpart.comp=this.myComp;
      for(let i = 0;i<this.myComp.magacini;i++){
        this.tmpartw[i].magacin=this.nizmagacina[i].naziv;
      }
      this.companyService.addGood(this.tmpart,this.tmpartw).subscribe((res)=>{
        alert(res["message"])
        this.getGoods();
        this.menu1=false;
        this.menu2=false;
        this.menu3=true;
        this.menu4=false;
        this.menu5=false;
        this.router.navigate(['/company']);
      })
    }
    kategorijaR:string;
    ind:number=0;
    tabs = ['Hrana', 'Pice', 'Ostalo'];
    kats=[[],[],[]]
    selected = new FormControl(0);
    tabChanged(tabChangeEvent: MatTabChangeEvent): void {
     this.ind=tabChangeEvent.index
    }
    addTab(selectAfterAdding: boolean) {
      this.tabs.push(this.kategorijaR);
      this.kats.push([]);
      if (selectAfterAdding) {
        this.selected.setValue(this.tabs.length - 1);
     } 
     
  }
 
  removeTab(index: number) {
    this.tabs.splice(index, 1);
  }
  dodajArtikal(ind:number,index:number){
    this.kats[ind].push({
            naziv:this.tableData1[index].naziv,
            jedinica_mere:this.tableData1[index].jedinica_mere,
            stopa:this.tableData1[index].stopa,
            sifra:this.tableData1[index].sifra,
            proizvodjac:this.tableData1[index].proizvodjac,
          
    })
    delete this.tableData1[index];
    this.menu1=false;
    this.menu2=false;
    this.menu3=false;
    this.menu4=true;
    this.menu5=false;
    this.router.navigate(['/company']);
    

  }
}
*/