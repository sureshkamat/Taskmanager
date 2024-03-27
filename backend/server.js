const app = require("./app");
const dotenv = require("dotenv");
const { connection } = require("./config/database");

//Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error:${err.message}`);
  console.log(`Shutting Down the Server due to Uncaught Exception Rejection`);
  process.exit(1);
});

//config
dotenv.config({ path: "backend/config/config.env" });

app.listen(process.env.PORT, async () => {
  await connection;
  console.log("Database TaskManager connected through Atlas");
  console.log(
    `Server is working on port: http://localhost:${process.env.PORT}`
  );
});
