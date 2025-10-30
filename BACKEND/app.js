import express from "express";
import {nanoid} from "nanoid"
import dotenv from "dotenv"
import connectDB from "./src/config/monogo.config.js"
import short_url from "./src/routes/short_url.route.js"
import user_routes from "./src/routes/user.routes.js"
import auth_routes from "./src/routes/auth.routes.js"
import { redirectFromShortUrl } from "./src/controller/short_url.controller.js";
import { errorHandler } from "./src/utils/errorHandler.js";
import cors from "cors"
import { attachUser } from "./src/utils/attachUser.js";
import cookieParser from "cookie-parser"

dotenv.config("./.env")

const app = express();  

// Allow both local and production frontend origins
app.use(
  cors({
    origin: [
      "http://localhost:5173",           // local React app
      "https://mini-url-generator.onrender.com" // deployed frontend (if any)
    ],
    credentials: true,
  })
);

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use(attachUser)

app.use("/api/user",user_routes)
app.use("/api/auth",auth_routes)
app.use("/api/create",short_url)
app.get("/:id",redirectFromShortUrl)

app.use(errorHandler)

// Use Render's dynamic port
const PORT = process.env.PORT || 5000;

// Connect DB before starting server
connectDB();

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
// GET - Redirection 
