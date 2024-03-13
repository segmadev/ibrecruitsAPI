import express  from "express";
import { Fetch } from "../fetch.js";
import { connect } from "../const.js";
const fetchRouter = express.Router();
const F = new Fetch(connect);
fetchRouter.get("/blog/:limit?", async (req, res) => {
    let limit = req.params.limit ? req.params.limit : 3;
     let data = await F.getBlogs({limit});
     res.send({data});
});
fetchRouter.get("/sliders", async (req, res) => {
     res.send({data: await F.getSliders()});
});
fetchRouter.get("/testimonials", async (req, res) => {
     res.send({data: await F.getTestimonials()});
});
export default fetchRouter;