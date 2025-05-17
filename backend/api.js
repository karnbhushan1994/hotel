require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Routes
const auth = require('./routes/auth');
const house = require('./routes/house');
const reservations = require('./routes/reservations');

app.use('/auth', auth);
app.use('/house', house);
app.use('/reservations', reservations);

app.get('/', (req, res) => {
  res.send(`Hello Express is working on port ${process.env.PORT}`);
});

async function main() {
  try {
    const encodedPassword = encodeURIComponent(process.env.DB_PASSWORD);
    const uri = `mongodb+srv://${process.env.DB_USER}:${encodedPassword}@cluster0.av1ajpx.mongodb.net/motel-develpoment-db?retryWrites=true&w=majority&appName=Cluster0`;

    console.log('🔌 Connecting to:', uri);

    await mongoose.connect(uri);

    console.log('✅ MongoDB connected successfully!');
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running on port ${process.env.PORT}`);
    });

  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
}

main();
