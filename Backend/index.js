const express = require('express');
const connectToMongo = require('./db');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port =  5000;

// Middleware
app.use(express.json({ limit: '50mb' }));

const corsOptions = {
  origin: process.env.CLIENT_ORIGIN,
  methods: ["GET","POST","PUT","DELETE"],
  credentials: true,
};
app.use(cors(corsOptions));

// Routes
app.use('/api/auth', require('./Routes/userRoutes'));
app.use('/api/videoPassword', require('./Routes/videoPasswordRoute'));

// Health check (optional)
app.get("/", (req, res) => {
  res.send("API is running ✅");
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// DB connection
connectToMongo(process.env.Name, process.env.password);
