import express from "express";
import { formSubmission } from "../controllers/formSubmissions.controller.js";

const router = express.Router();

router.post("/submission", formSubmission);

export default router;
