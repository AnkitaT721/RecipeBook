const app = require("./app");
const dotenv = require("dotenv");

const cloudinary = require("cloudinary");

const connectDataBase = require("./config/database");

//handling uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("shutting down the server due to uncaught exception");

  process.exit(1);
});

//config
dotenv.config({ path: "backend/config/config.env" });

//connecting to database
connectDataBase();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const PORT = process.env.PORT;

const server = app.listen(PORT, () => {
  console.log(`server is listening on http://localhost:${PORT}`);
});

//unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to unhandled promise rejection");

  server.close(() => {
    process.exit(1);
  });
});
