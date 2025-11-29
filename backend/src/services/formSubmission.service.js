import { validateSubmission } from "../validations/submission.validator.js";
import { FormModel } from "../db/models/FormSchema.js";
import { v4 as uuidv4 } from "uuid";

export const createSubmissionService = async (data) => {
  
 const submissionId = uuidv4();  // <-- generate id
 const result = validateSubmission(data); // this will throw on error
//  console.log("Validated submission data:", result);
  const createdAt = new Date().toISOString();
  const formSubmission = new FormModel({
    submissionId: submissionId,
    createdAt,
    formData: result
  });

  await formSubmission.save();

  return { submissionId, createdAt };
};

