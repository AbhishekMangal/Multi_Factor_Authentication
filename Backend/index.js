const express = require('express');
const connectToMongo = require('./db');
const cors = require('cors');
const app = express();
const port = 5000

app.use(express.json({limit: '50mb'}));
app.use(cors());

  require('dotenv').config();
app.use('/api/auth', require('./Routes/userRoutes'));
app.use('/api/videoPassword', require('./Routes/videoPasswordRoute'));
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
connectToMongo(process.env.Name, process.env.password);
