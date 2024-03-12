import dotenv from "dotenv";
dotenv.config();
export const connect = { host: process.env.HOST, database: process.env.DATABASE, password: process.env.PASS, user: process.env.USER };
export const PORT = process.env.PORT;