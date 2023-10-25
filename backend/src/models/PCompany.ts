import mongoose from "mongoose";

export type Kasa = { tip: String, lokacija: String }
export type Magacin = { id: Number, naziv: String }
const Schema= mongoose.Schema;

let PCompany = new Schema ({
   
    korisnik:{
        type:mongoose.Types.ObjectId,
        ref:"UserModel"
    },
    telefon:{
        type:String
    },
    mejl:{
        type:String
    },
    naziv:{
        type:String
    },
    adresa:{
        type:Array<String>()
    },
    pib:{
        type:String
    },
    maticnibroj:{
        type:String
    },
    slika:{
        type:String
    },
    status:{
        type:String
    },
    kategorija:{
        type:String
    },
    sif:{
        type:Array<String>()
    },
    pdf:{
        type:Boolean
    },
    ziro:{
        type:Array<String>()
    },
    magacini:{
        type:Number
    },
    mag:{
        type:Array<Magacin>()
    }
    ,
    kase:{
        type:Number
    },
    kas:{
       type:Array<Kasa>() 
    },
    brojDana:{
        type:Number
    },
    rabat:{
        type:Number
    }

})

export default mongoose.model('PCompanyModel',PCompany,'purchasers');