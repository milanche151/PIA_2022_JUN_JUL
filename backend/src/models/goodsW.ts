import mongoose from "mongoose"

const Schema= mongoose.Schema;

let GoodsW = new Schema ({

    id_info:{
        type:mongoose.Types.ObjectId,
        ref:"GoodsInfoModel"     
    },
    minkol:{
        type:Number
    },
    maxkol:{
        type:Number
    },
    magacin:{
        type:String
    },
    nabavna:{
        type:Number
    },
    prodajna:{
        type:Number
    },
    stanje:{
        type:Number
    }
    
})

export default mongoose.model('GoodsWModel',GoodsW,'goodswarehouse');