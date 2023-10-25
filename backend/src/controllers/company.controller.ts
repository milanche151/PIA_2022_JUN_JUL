import * as express from 'express'
import mongoose, { model } from 'mongoose'
import CompanyModel, { Kasa, Magacin } from '../models/company'
import UserModel from '../models/user'
import RequestModel from '../models/request'
import { Request, Response } from 'express-serve-static-core'
import PurchModel from '../models/purchaser'
import PCompanyModel from '../models/PCompany'
import GoodsInfoModel from '../models/goodsinfo'
import GoodsWModel from '../models/goodsW'
import KindModel from '../models/kind'



export class CompanyCotroller{
    
   
     
    async updK(req: Request, res: Response) {
        try{
            //console.log(req.body.myComp.maticnibroj)
            await CompanyModel.updateOne({"maticnibroj":req.body.myComp.maticnibroj},{$set:{"kas":req.body.kas}});
            res.json({"message":"Uspesno promenjeno kase"});
           }catch(err){
            res.json({"message":"greska"});
            console.log(err);
           }
    }
    async updM(req: Request, res: Response){
       try{
        //console.log(req.body.myComp.maticnibroj)
        await CompanyModel.updateOne({"maticnibroj":req.body.myComp.maticnibroj},{$set:{"mag":req.body.mag}});
        res.json({"message":"Uspesno promenjeno"});
       }catch(err){
        res.json({"message":"greska"});
        console.log(err);
       }
    }
   
    
    async activate(req: Request, res: Response){
    try{
      await CompanyModel.updateOne({"maticnibroj":req.body.comp.maticnibroj},{"status":"aktivno"}) 
      await UserModel.updateOne({"username":req.body.comp.korisnik.username},{"type":2})
    }catch(err){
        console.log(err);
        res.status(400).json({"message":"greška"});  
    }
    res.json({"message":"Preduzece aktivno!"})
    }
    async deactivate(req: Request, res: Response){
        try{
            await CompanyModel.updateOne({"maticnibroj":req.body.comp.maticnibroj},{"status":"neaktivno"}) 
            await UserModel.updateOne({"username":req.body.comp.korisnik.username},{"type":3})
          }catch(err){
              console.log(err);
              res.status(400).json({"message":"greška"});  
          }
          res.json({"message":"Preduzece neaktivno!"})
    }
   
  async  getReqs(req: Request, res: Response) {
        
        let firms;
        firms= await RequestModel.find().populate("korisnik");
        res.json(firms);
  }
    addComp= async(req:express.Request,res:express.Response)=>{
       let error = false;
       let isin = false;
       let u = await UserModel.findOne({"username":req.body.user.username});
       
       if(u!=null){
        if(u.type==2 || u.type==1){
            res.json({"message":"Korisnik sa tim k. imenom vec postoji"})
            return;
        }
        else{
            //console.log("Usao");
            isin=true;
            try{
                await UserModel.updateOne({"username":req.body.user.username},{"type":2});
            }catch(err){
                console.log(err);
                res.status(400).json({"message":"greška"});
            }
            
        }
       }
       if(!isin){
            u=await UserModel.create({
            _id: new mongoose.Types.ObjectId(),
            firstname: req.body.user.firstname,
            lastname: req.body.user.lastname,
            username: req.body.user.username,
            password: req.body.user.password,
            type: req.body.user.type

        })
        }
        let comp=new CompanyModel({
          korisnik:u._id,
          telefon:req.body.tel,
          mejl:req.body.mail,
          naziv:req.body.name,
          adresa:req.body.adr,
          pib:req.body.pib,
          maticnibroj:req.body.mat,
          slika:req.body.img,
          status:req.body.status,
          kategorija:null,
          sif:null,
          pdv:null,
          ziro:null,
          magacini:null,
          mag:null,
          kase:null,
          kas: null
        })
        RequestModel.deleteOne({"pib":comp.pib},(err,resp)=>{
            if(err) {
                res.status(400).json({"message":"greska pri odbijanju zahteva"});
                error=true;
            }
        })

       

        await comp.save((err,resp)=>{
            if(err) {
                console.log(err);
                res.status(400).json({"message":"greška-kompanija"});
                error = true;
            }
        });
        if (!error) {
            res.json({"message":"Kompanija ubacena"})
            return;
        }

    }
    addReq = async(req:express.Request,res:express.Response)=>{
        let error = false; 
        let isin = false;
        const u= await UserModel.findOne({"username":req.body.user.username})
        
        if(u!=null) {
           
                res.json({"message":"Korisnik sa tim k. imenom vec postoji"})
                return;
           
        }
        let user=await UserModel.create({
            _id: new mongoose.Types.ObjectId(),
            firstname: req.body.user.firstname,
            lastname: req.body.user.lastname,
            username: req.body.user.username,
            password: req.body.user.password,
            type: req.body.user.type

        })
        let comp=new RequestModel({
          korisnik:user._id,
          telefon:req.body.tel,
          mejl:req.body.mail,
          naziv:req.body.name,
          adresa:req.body.adr,
          pib:req.body.pib,
          maticnibroj:req.body.mat,
          slika:req.body.img
        })
      

         await comp.save((err,resp)=>{
            if(err) {
                console.log(err);
                res.status(400).json({"message":"greška-zahtev"});
                error = true;
            }
        });
    
        if (!error) {
            res.json({"message":"Zahtev ubacen"})
            return;
        }

    }
async deleteR(req:express.Request,res:express.Response){
            
       let mb=req.body.maticni;
       let username=req.body.user.username
        let  rek= await RequestModel.findOne({"maticnibroj":mb});

        let comp=new CompanyModel({
            korisnik:rek.korisnik,
            telefon:rek.telefon,
            mejl:rek.mejl,
            naziv:rek.naziv,
            adresa:rek.adresa,
            pib:rek.pib,
            maticnibroj:rek.maticnibroj,
            slika:rek.slika,
            status:"neaktivno",
            kategorija:null,
            sif:null,
            pdv:null,
            ziro:null,
            magacini:null,
            kase:null
  
          })
          await comp.save((err,resp)=>{
            if(err) {
                console.log(err);
                res.status(400).json({"message":"greška-zahtev"});
              
            }
        });

            await RequestModel.deleteOne({"maticnibroj":mb});
    
            res.json({"message":"Obrisan zahtev"})
        }
        
       async getComp(req: Request, res: Response) {
        let firms;
        firms= await CompanyModel.find().populate("korisnik");
        res.json(firms);
       }
       
        async addInfo(req: Request, res: Response) {
           let uname=req.body.uname;

           let userid = await UserModel.findOne({"username":uname})

           await CompanyModel.updateOne({"korisnik":userid._id},{"kategorija":req.body.kategorija,"sif":req.body.sifra,"pdv":req.body.pdv,"ziro":req.body.ziro,"kase":req.body.kase,"magacini":req.body.magacini})

           res.json({"message":"Uspesno registorvanje"})
       }
       async getMyComp(req: Request, res: Response){
       
        try{   
          let user=await UserModel.findOne({"username":req.body.uname});
          let comp= await CompanyModel.findOne({"korisnik":user._id}).populate("korisnik")
          res.json(comp);
        } catch(err){
            console.log(err);
            res.status(400).json(err);
            
        }
        

       }
       addPur = async(req:express.Request,res:express.Response)=>{
        let company;
        let error=false;

        company= await CompanyModel.findOne({"maticnibroj":req.body.mat});
        
        
        if(company!=null){
        console.log(req.body.brDana);
        
      
            try{
                await PurchModel.create({
                 kompanija:company._id,
                 brojDana:req.body.brDana,
                 rabat:req.body.rabat
                 });
          
            }catch(err){
                    console.log(err);
                    res.status(400).json({"message":"greška-narucilac"});
                    error = true;
            }
        }
        else{
            try {
            let company=await PCompanyModel.create({
                korisnik:req.body.user._id,
                telefon:req.body.tel,
                mejl:req.body.mail,
                naziv:req.body.name,
                adresa:req.body.adr,
                pib:req.body.pib,
                maticnibroj:req.body.mat,
                slika:req.body.img,
                status:null,
                kategorija:null,
                sif:null,
                pdv:null,
                ziro:null,
                magacini:null,
                mag:null,
                kase:null,
                kas: null,
                brojDana:req.body.brDana,
                rabat:req.body.rabat
              })
            }catch(err){
                console.log(err);
                res.status(400).json({"message":"greška-narucilac"});
                error = true;
            }
                
        }
        if (!error) {
            res.json({"message":"Narucilac ubacen"})
            return;
        }
       
        
        
    }

     
     async byPib(req: Request, res: Response){
        let cmp=null;
        let error=false;
        try{
          cmp=await CompanyModel.find({"pib":req.body.pib}).populate("korisnik");  
          if(cmp==null){
            res.json(null);
            return;
          }
        }catch(err){
            console.log(err);
                res.status(400).json({"message":"greška-narucilac"});
                error = true;
        }
        res.json(cmp);
    } 
    async addG(req: Request, res: Response) {
        let error=false;
        try{

        let cmp= await CompanyModel.findOne({"maticnibroj":req.body.info.comp.maticnibroj})
        let inf = await GoodsInfoModel.create({
        id_comp:cmp._id,
        sifra:req.body.info.sifra,
        naziv:req.body.info.naziv,
        jedinica_mere:req.body.info.jedinica_mere,
        stopa:req.body.info.stopa,
        tip:req.body.info.tip,
        proizvodjac:req.body.info.proizvodjac,
        zporekla:req.body.info.zporekla,
        strani_naziv:req.body.info.strani_naziv,
        barkod:req.body.info.barkod,
        carinska_tarifa:req.body.info.carinska_tarifa,
        ekoak:req.body.info.ekoak,
        minz:req.body.info.minz,
        maxz:req.body.info.maxz,
        opis:req.body.info.opis,
        deklaracija:req.body.info.deklaracija,
        slika:req.body.info.slika
        })
        for(let i=0;i<cmp.magacini;i++){
        if(req.body.warehouse[i].minkol &&
            req.body.warehouse[i].maxkol &&
            req.body.warehouse[i].magacin &&
            req.body.warehouse[i].nabavna &&
            req.body.warehouse[i].prodajna &&
            req.body.warehouse[i].stanje){
            let gw=GoodsWModel.create({
                id_info:inf._id,
                minkol:req.body.warehouse[i].minkol,
                maxkol:req.body.warehouse[i].maxkol,
                magacin:req.body.warehouse[i].magacin,
                nabavna:req.body.warehouse[i].nabavna,
                prodajna:req.body.warehouse[i].prodajna,
                stanje:req.body.warehouse[i].stanje,
            })
        }
        }
        }catch(err){
            console.log(err);
            res.status(400).json({"message":"greška-narucilac"});
            error = true;
        }
        if (!error) {
            res.json({"message":"Artikal ubacen"})
            return;
        }
    }
    async getGoods(req: Request, res: Response){
        let mat=req.body.mat;
        let arr,cmp;
       
        try{
           
            
            cmp=await CompanyModel.findOne({"maticnibroj":mat});
  
            if(cmp){ 
                
                arr=await GoodsInfoModel.find({"id_comp":cmp._id});
            }
        }catch(err){
            console.log("GRESKA");
            res.json(null)
            return;
        }
       
        res.json(arr)
    }
    async addkind(req: Request, res: Response){
        let error=false;
            try{
                    KindModel.updateOne({'name':req.body.name},{$push:{"goods":req.body.elem}})
            }catch(err){
                console.log(err);
                res.status(400).json({"message":"greška-narucilac"});
                error = true;
            }
            if(!error){
                res.json({"message":"Uspesno ubacen artikal u proizvod"})
            }
    }
    async delkind(req: Request, res: Response){
    let error=false;
    try{
            KindModel.updateOne({'name':req.body.name},{$pull:{'goods':{'sifra':req.body.elem}}})
    }catch(err){
        console.log(err);
        res.status(400).json({"message":"greška-narucilac"});
        error = true;
    }
    if(!error){
        res.json({"message":"Uspesno ubacen artikal u proizvod"})
    }
    }
    async addk(req: Request, res: Response){
        
    }
}