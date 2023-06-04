// ! 1 -- root folder
// ! npm run init -y ---- to create package.json
// ! npm install -- express, nodemon -g, dotenv, mongoose (to connect to MongoDB smoothly), cors

// ! npm run backend, npm run frontend, npm run both

// allow us to access the MONGO_URI
const dotenv = require("dotenv").config();

const express = require ("express")
const connectDB = require("./config/connectDB")
const mongoose = require ("mongoose");
const taskRoutes = require("./routes/taskRoute")
const cors = require("cors")

const app = express();

// Middleware - a function that does something - need to call a function - so we can access the body of information with the request (To avoid undefined info)
app.use(express.json());
app.use(express.urlencoded({extended: false})) // to access  the form data on Insomnia
app.use(cors({
    origin: ["http://localhost:3000", "https://mern-task-app.onrender.com"]
}
));
app.use("/api/tasks", taskRoutes)

// Routes for Postman or Insomnia (API tester)
app.get("/", (req, res) => {
    res.send("Home page")
})

// env file
const PORT = process.env.PORT  || 5000

// !  to connect to MongoDB using mongoose (2nd method)
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`)
        });
    })
    .catch ((err) => console.log(err));

