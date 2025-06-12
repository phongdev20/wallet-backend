import { configDotenv } from "dotenv";
import express from "express";
import { initDB, sql } from "./config/db.js";
import ratelimiter from "./middleware/rateLimiter.js";
import transactionRouter from "./routers/transactionsRoute.js";

configDotenv();
const app = express();

// middleware
app.use(ratelimiter);
app.use(express.json());

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("It's working");
});

app.use("/api/transactions", transactionRouter);

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running http://localhost:${PORT}/`);
  });
});
