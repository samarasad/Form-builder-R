import { getFormSchemaService } from "../services/form.service.js";

export const getFormSchema = (req, res, next) => {
  try {
    const data = getFormSchemaService();

    // Check if data is empty
    if (!data || Object.keys(data).length === 0 || (data.fields && data.fields.length === 0)) {
      return res.status(200).json({
        success: true,
        message: "Form schema is empty",
        data: data
      });
    }

    return res.status(200).json({
      success: true,
      message: "Form schema retrieved successfully",
      data: data
    });

  } catch (err) {
    next(err);
  }
};

