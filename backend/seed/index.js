require("dotenv").config();
const mongoose = require("mongoose");
const seedHouses = require("./houses");

async function main() {
  try {
    const encodedPassword = encodeURIComponent(process.env.DB_PASSWORD);
    const uri = `mongodb+srv://${process.env.DB_USER}:${encodedPassword}@cluster0.av1ajpx.mongodb.net`;

    await mongoose.connect(uri, {
      dbName: "motel-develpoment-db", // ✅ this makes sure DB is correct
    });

    console.log("✅ Connected to MongoDB");
    await seedHouses(); // 🔁 run seeder
    console.log("🌱 Seeding complete");
    await mongoose.connection.close();
  } catch (err) {
    console.error("❌ MongoDB connection or seed failed:", err.message);
  }
}

main();
