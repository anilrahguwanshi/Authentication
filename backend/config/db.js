const { default: mongoose } = require("mongoose");

const connectDB = async () => {
    try {
        let res = await mongoose.connect(process.env.MONGODB_URL)
        
        if (res) {
            console.log("mongodb connected");
        }
    } catch (error) {
        console.log("mongodb is not connected",error);
        
    }
}

module.exports = connectDB