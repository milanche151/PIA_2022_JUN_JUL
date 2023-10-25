import mongoose from "mongoose"

const Schema= mongoose.Schema;

let GoodsInfo = new Schema ({

    id_comp:{
        type:mongoose.Types.ObjectId,
        ref:"CompanyModel"     
    },sifra:{
        type:String
    },
    naziv:{
        type:String
    },
    jedinica_mere:{
        type:String
    },
    stopa:{
        type:Number
    },
    tip:{
        type:String
    },
    proizvodjac:{
        type:String
    },
    zporekla:{
        type:String
    },
    strani_naziv:{
        type:String
    },
    barkod:{
        type:String
    },
    carinska_tarifa:{
        type:Number
    },
    ekoak:{
        type: String,
    },minz:{
        type:Number
    },maxz:{
        type:Number
    },opis:{
        type:String
    },
    deklaracija:{
        type:String
    },
    slika:{
        type:String
    }
    
    
})

export default mongoose.model('GoodsInfoModel',GoodsInfo,'goodsinfo');