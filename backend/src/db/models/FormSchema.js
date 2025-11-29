import mongoose from 'mongoose';
const FormSchema = new mongoose.Schema({
submissionId: { type: String, required: true },
  createdAt: { type: Date, required: true },
  
  formData: { type: mongoose.Schema.Types.Mixed, required: true }
}
);
export const FormModel = mongoose.model('FormSubmission', FormSchema);