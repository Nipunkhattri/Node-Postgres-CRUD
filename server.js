import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./helpers/database.js";
import AuthRoute from './routes/AuthRoutes.js'
import ProductRoutes from './routes/ProductRoutes.js'

const app = express();
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
dotenv.config();
app.use(cors());

// connecting to database
sequelize.authenticate()
  .then(()=>console.log("Database connected..."))
  .catch(err => console.log('Error:'+err))

sequelize.sync({ alter:true }) 
  .then(() => {
    console.log('Models synchronized with database');
  })
  .catch((error) => {
    console.error('Error synchronizing models:', error);
  });


// Routes
app.use("/api", ProductRoutes); // All Product Related operations
app.use("/auth", AuthRoute); // Authentication routes

app.get("/", (req, res) => {
  res.json({ message: "Hello" });
});

const PORT = process.env.PORT || 5000; // Use the port from environment variable if available

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
