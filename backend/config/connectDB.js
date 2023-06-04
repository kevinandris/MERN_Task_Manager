// ! 3 -- Connect app to MongoDB
// ! ensure the mongoDB connection starts first before the server

const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI)

        // console.log(`MongoDB Connected: ${connect.connection.host}`)
        console.log(`MongoDB Connected`)
    } catch (error) {
        console.log(error)

        // exit the process in case the app doesn't move forward.
        process.exit(1)
    }
};

module.exports = connectDB

// ! ensure the mongoDB connection starts first before the server to avoid errors (1st method) 
// ! put this on server.js
// const startServer = async () => {
//      try {
    
//         // database connection
//      await connectDB()
    
//          app.listen(PORT, () => {
//             console.log(`Server running on port ${PORT}`)
//          });
//      } catch (error) {
//          console.log(error)
//      }
//     };

// startServer();