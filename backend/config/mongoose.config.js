import { connect, Types } from "mongoose";
import "dotenv/config";

const connectDB = async () => {
  try {
    await connect(process.env.MONGODB_URI, {
      dbName: "sistemaConsultorios",
    });
    console.log("✅ Conectado a MongoDB Atlas");
  } catch (err) {
    console.error("❌ Error al conectar con MongoDB:", err.message);
  }
};

const isValidID = (id) => Types.ObjectId.isValid(id);

export { connectDB, isValidID };
