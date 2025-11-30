import { createSubmissionService } from "../services/formSubmission.service.js";

export const formSubmission = async (req, res, next) => {
  try {
    console.log("Form submission result:");
    const result = await createSubmissionService(req.body);
    
    return res.status(201).json({ success: true, ...result });
  } catch (err) {
    next(err);
  }
};
