import mongoose from "mongoose";


const Schema= mongoose.Schema;

let Purch = new Schema ({
    kompanija:{
        type:mongoose.Types.ObjectId,
        ref:"CompanyModel"
    },
    brojDana:{
        type:Number
    },
    rabat:{
        type:Number
    }
})

export default mongoose.model('PurchModel',Purch,'purchasers');