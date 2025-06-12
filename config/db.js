import { neon } from "@neondatabase/serverless";
import { configDotenv } from "dotenv";
configDotenv();

// Create a sql connection using DB URL
export const sql = neon(process.env.DATABASE_URL);
