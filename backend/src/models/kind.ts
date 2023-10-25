import mongoose from "mongoose"
class good{
    sifra:string;
    naziv:string;
    jedinica_mere:string;
    stopa:number;
    proizvodjac:string;
}
const Schema= mongoose.Schema;

let Kind = new Schema ({

   name:{
    type:String
   },
   goods:{
    type:[{gd:good}]
   }
    
})

export default mongoose.model('KindModel',Kind,'kinds');