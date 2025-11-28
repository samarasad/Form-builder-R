import express from "express";
import formRoutes from "./formSchema.js";
import formSubmissionRoutes from "./formSubmissions.js";

const router = express.Router();
//route for get form schema
router.use("/form", formRoutes);
//route for post form submission
router.use("/form", formSubmissionRoutes);

export default router;
