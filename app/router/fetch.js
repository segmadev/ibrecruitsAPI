import express  from "express";
import { Fetch } from "../fetch.js";
import { connect } from "../const.js";
const fetchRouter = express.Router();

const F = new Fetch(connect);
fetchRouter.get("/blog", async (req, res) => {
    
     let data = await F.getBlogs({limit: 3});
     res.send(data);
});
export default fetchRouter;