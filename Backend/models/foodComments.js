import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    
    foodId:{type:String,required:true},
    food:{type:String, required:true},
    newComment:{type:String,required:true},
    date: { type: Date, default: Date.now() }
});

const commentModel=mongoose.models.comment || mongoose.model("comment",commentSchema);

export default commentModel;
