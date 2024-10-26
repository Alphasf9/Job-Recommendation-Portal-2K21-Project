import mongoose from 'mongoose';


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connection to database established successfully')
    } catch (error) {
        console.log('Error connecting to database ' + error);
        process.exit(1);
    }
}

export default connectDB



