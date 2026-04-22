import mongoose from 'mongoose';

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://reactapp:12345@cluster0.vzwkwrj.mongodb.net/food-delivery-app').then(()=>{
        console.log("DB Connected");
    })

}