import dotenv from "dotenv";
dotenv.config();
export const connect = { host: process.env.HOST, database: process.env.DATABASE, password: process.env.PASS, user: process.env.USER };
export const PORT = process.env.PORT;
export const FILEROOT = (process.env.FILEROOT.endsWith('/')) ? process.env.FILEROOT.slice(0, -1) : process.env.FILEROOT
