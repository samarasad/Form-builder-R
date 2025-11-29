import { loadJSON } from "../utils/loadJSON.js";

const formSchema = loadJSON();
export const getFormSchemaService = () => {
  
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
