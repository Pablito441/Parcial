import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
//Conexión a la base MongoDB
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ Conectado a MongoDB");
  } catch (err) {
    console.error("❌ Error al conectarse a MongoDB:", err);
    process.exit(1);
  }
};
