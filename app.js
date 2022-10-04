// import dependencies
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import logger from "morgan";

// import the "dotenv" package
import dotenv from "dotenv";

import mainRoutes from "./server/routes/mainRoute";

// set up dependencies
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger("dev"));

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  // res.setHeader('Access-Control-Allow-Origin', "*");
  const domainsFromEnv = process.env.CORS_DOMAINS || "";
  const allowedOrigins = domainsFromEnv.split(",").map((item) => item.trim());
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
       res.setHeader('Access-Control-Allow-Origin', origin);
  }
  
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

// set up route
app.use("/api/", mainRoutes);

// call the config function
dotenv.config();

// set up mongoose
mongoose
  .connect(
    `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@cluster0.7omrglg.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.log("Error connecting to database");
  });

// set up port
const port = process.env.PORT || 8081;

// set up route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to Project with Nodejs Express and MongoDB",
  });
});
app.listen(port, () => {
  console.log(`Our server is running on port ${port}`);
});


//mongodb+srv://tantq:<password>@cluster0.7omrglg.mongodb.net/?retryWrites=true&w=majority