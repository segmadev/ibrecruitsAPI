import express  from "express";
import { Fetch } from "../fetch.js";
import { connect } from "../const.js";
const fetchRouter = express.Router();
const F = new Fetch(connect);
fetchRouter.get("/blogs", async (req, res, next) => {
    let limit = req.query.limit ? req.query.limit : 3;
    let data = await F.getBlogs({limit});
    res.send(data);
});
fetchRouter.get("/sliders", async (req, res, next) => {
     res.send(await F.getSliders());
});
fetchRouter.get("/testimonials", async (req, res, next) => {
     res.send(await F.getTestimonials());
});
fetchRouter.get("/services", async (req, res, next) => {
     res.send(await F.getServices());
});
fetchRouter.get("/services/:id", async (req, res, next) => {
     if(!req.params.id) return;
     let id = req.params.id;
     res.send(await F.getService({id}));
});
fetchRouter.get("/settings", async (req, res, next) => {
     res.send(await F.getSettings());
});
export default fetchRouter;