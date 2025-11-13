import { Router } from "express";
import { homeRoute } from "./home/homeRoute.js";

const appRoutes = Router();

appRoutes.use("/home", homeRoute);

export default appRoutes;
