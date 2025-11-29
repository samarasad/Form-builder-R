import express from "express";
import {getFormSubmissions} from "../controllers/getFormSubmissions.controller.js";
const router = express.Router();

router.get("/submissions", getFormSubmissions);

export default router;