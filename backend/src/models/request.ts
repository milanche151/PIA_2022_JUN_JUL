import mongoose from "mongoose";
import UserModel from "../models/user"

const Schema= mongoose.Schema;

let Request = new Schema ({
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
    }

})

export default mongoose.model('RequestModel',Request,'requests');