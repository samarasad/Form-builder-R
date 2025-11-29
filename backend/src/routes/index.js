import express from "express";
import formRoute from "./formSchema.js";
import formSubmissionRoute from "./formSubmissions.js";
import getFormSubmissionsRoute from "./getFormSubmissions.js";

const router = express.Router();
//route for get form schema
router.use("/get", formRoute);
//route for post form submission
router.use("/post", formSubmissionRoute);

router.use("/get", getFormSubmissionsRoute);

export default router;
