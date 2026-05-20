import mongoose from 'mongoose';

const sentiSchema = new mongoose.Schema({
    foodId:{type:String,required:true},
    food:{type:String,required:true},
    newComment:{type:String, required:true},
    sentiment_score_5:{type:Number, required:true},
    sentiment_label:{type:String, required:true},
    price:{type:Number,required:true},
    date:{type:Date, default:Date.now()},
    customer_name:{type:String, required:true}
})

const sentiModel = mongoose.models.sentiment || mongoose.model("sentiment",sentiSchema,"sentiment");

export default sentiModel;