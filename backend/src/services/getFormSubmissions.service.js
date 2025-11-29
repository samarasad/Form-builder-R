import { FormModel } from "../db/models/FormSchema.js";

export const getFormSubmissionsService = async ({ page, sortBy, sortOrder }) => {
  page = Number(page) || 1;

  sortBy = sortBy || "createdAt";
  sortOrder = sortOrder === "asc" ? 1 : -1;

  const skip = (page - 1) * 10;
  const [submissions, totalCount] = await Promise.all([
    FormModel.find({})
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(10),

    FormModel.countDocuments()
  ]);

  return {
    submissions,
    totalCount,
    currentPage: page,
    totalPages: Math.ceil(totalCount / 10),

      
  };
};
