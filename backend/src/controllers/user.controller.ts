import * as express from 'express'
import mongoose from 'mongoose';
import UserModel from '../models/user'
import CustomerModel from '../models/customer'
export class UserController{
    login = (req:express.Request,res:express.Response)=>{
        let username=req.body.username;
        let password=req.body.password;

        UserModel.findOne({'username':username,'password':password},(err,user)=>{
            if(err)
                console.log(err);
            else res.json(user);
        });
    }
    register=async (req:express.Request,res:express.Response)=>{
        let user=await UserModel.create({
            _id: new mongoose.Types.ObjectId(),
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            password: req.body.password,
            type: req.body.type
        })
        let cust = new CustomerModel({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            password: req.body.password,
            type: req.body.type,
            tel:req.body.tel,
            brojlk:req.body.blk
        })
        let uname:String;
        UserModel.findOne({'username':cust.username},(err,user)=>{
            if(err)
                console.log(err);
            else if(user==null){
                uname=null;
            }else{
                uname=user.username;
            }
        });
        await cust.save((err,resp)=>{
            if(err) {
                console.log(err);
                res.status(400).json({"message":"error"});
            }
            else if(uname!=null){
                res.json({"message":"Korisnik sa korisnickim imenom "+uname+ " vec postoji"})
            }
            else res.json({"message":"ok"})
        });
    }
    changePassword=(req:express.Request,res:express.Response)=>{
        let username=req.body.username;
        let password=req.body.password;

        UserModel.updateOne({'username':username},{'password':password},(err,user)=>{
            if(err){ 
                console.log(err);
                res.status(400).json({"message":"error"});
            }
            else res.json({"message":"Šifra uspešno promenjena"})
        })
    }
}
