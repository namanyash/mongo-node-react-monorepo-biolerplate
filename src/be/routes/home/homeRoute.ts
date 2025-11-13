import express from "express";
import { getAllEnvData } from "../../controller/homeController.js";

export const homeRoute = express.Router();

homeRoute.get("/getAllEnv", getAllEnvData);
