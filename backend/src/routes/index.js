import express from "express";
import formRoutes from "./formSchema.js";

const router = express.Router();

router.use("/form", formRoutes);

export default router;
