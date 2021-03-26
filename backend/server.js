const app = require("./app");
const connectDatabase = require("./config/database");

//Handle the uncaught Exceptions
process.on("uncaughtException", (err) => {
  console.log(`ERROR:${err.message}`);
  console.log("Server Shutting down due to uncaught exception");
  process.exit(1);
});

//Setting up config file

if (process.env.NODE_ENV !== "PRODUCTION")
  require("dotenv").config({ path: "backend/config/config.env" });

//connecting to database
connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server started on PORT:${process.env.PORT} in ${process.env.NODE_ENV} mode`
  );
});

// Handle Unhandled Promise Rejections
process.on("unhandledRejection", (err) => {
  console.log(`ERROR:${err.message}`);
  console.log("Shutting down the server due to Unhandled Promise Rejection");
  server.close(() => {
    process.exit(1);
  });
});
