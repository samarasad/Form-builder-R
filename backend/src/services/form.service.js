import { createRequire } from "module";
const require = createRequire(import.meta.url);
export const getFormSchemaService = () => {
  let formSchema = {};
  try {
    formSchema = require("../db/formSchema.json"); // load JSON safely
  } catch (err) {
    console.error("Failed to load JSON:", err.message);
    const error = new Error("Form schema file could not be loaded.");
    error.statusCode = 500;
    throw error;
  }
  if (!formSchema) {
    const err = new Error("Form schema file could not be loaded.");
    err.statusCode = 500;
    throw err;
  }

  if (Object.keys(formSchema).length === 0) {
    const err = new Error("Form schema is empty.");
    err.statusCode = 404;
    throw err;
  }

  if (!formSchema.fields || formSchema.fields.length === 0) {
    const err = new Error("Form schema fields are missing.");
    err.statusCode = 404;
    throw err;
  }

  return formSchema;
};
