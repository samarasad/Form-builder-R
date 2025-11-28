import { getFormSchemaService } from "../services/form.service.js";

export const getFormSchema = async (req, res, next) => {
  try {
    const data =  getFormSchemaService();
    return res.status(200).json({
      success: true,
      message: "Form schema retrieved successfully",
      data,
    });

  } catch (err) {
    next(err); 
  }
};
