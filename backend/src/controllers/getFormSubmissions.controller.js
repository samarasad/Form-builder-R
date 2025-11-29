import {getFormSubmissionsService} from "../services/getFormSubmissions.service.js";
export const getFormSubmissions = async (req, res, next) => {
  try {
    const { page, sortBy, sortOrder } = req.query;
    const result = await getFormSubmissionsService(page, sortBy, sortOrder);
    return res.status(200).json({
      success: true,
      message: "Submissions fetched successfully",
      ...result,
    });
  } catch (err) {
    next(err);
  }
};
