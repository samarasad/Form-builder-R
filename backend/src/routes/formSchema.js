import express from "express";
import { getFormSchema } from "../controllers/form.controller.js";

const router = express.Router();

router.get("/schema", getFormSchema);

export default router;
