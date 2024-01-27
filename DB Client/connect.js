import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

const link=process.env.LINK

const DBclient = async () => {
    try {
        await mongoose.connect(link, { useNewUrlParser: true })
        console.log("db connected")
    } catch (err) {
        console.log(err)
    }

}


export default DBclient