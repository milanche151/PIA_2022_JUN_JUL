import mongoose from "mongoose";


const Schema= mongoose.Schema;

let Customer = new Schema({
    
    firstname:{
        type:String
    },
    lastname:{
        type:String
    },
    username:{
        type:String
    },
    password:{
        type:String
    },
   
    type:{
        type:String
    },
    tel:{
        type:String
    },
    
    brojlk:{
        type:String
    }


})
export default mongoose.model('CustomerModel',Customer,'customers' )