import { configDotenv } from "dotenv";
import express from "express";
import { initDB, sql } from "./config/db.js";
import ratelimiter from "./middleware/rateLimiter.js";
import transactionRouter from "./routers/transactionsRoute.js";
import job from "./config/cron.js";

configDotenv();
const app = express();

if (process.env.NODE_ENV === "production") job.start;

// middleware
app.use(ratelimiter);
app.use(express.json());

const PORT = process.env.PORT;

app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
  });
});

app.use("/api/transactions", transactionRouter);

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running http://localhost:${PORT}/`);
  });
});
