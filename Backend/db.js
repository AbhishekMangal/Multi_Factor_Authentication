const mongoose = require('mongoose');
require('dotenv').config();

const connectToMongo = async(username, password)=> {
    try {
      
        await mongoose.connect(
  `mongodb+srv://${username}:${password}@cluster0.sxtxgnl.mongodb.net/myDatabaseName?retryWrites=true&w=majority`
);

        // await mongoose.connect('mongodb://127.0.0.1:27017/minor_project');

        console.log("Connected Succefully");
    } catch (error) {
        console.error(error.message)
    }


}
module.exports = connectToMongo;