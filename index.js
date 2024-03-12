import  Express from "express";
const app = new Express();
import fetchRouter from "./app/router/fetch.js";
import { PORT } from "./app/const.js";

app.use("/api/fetch/", fetchRouter);
app.listen(8800, () => {
    console.log("WELCOME");
});
// import { Database } from "./app/database.js";
// import {connect} from "./app/const.js";
// var d = new Database(connect);
// let company = await d.getall({table: 'companies', fetch: "s"});
// console.log(company.ceo);