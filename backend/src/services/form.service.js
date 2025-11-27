// import { createRequire } from "module";
// const require = createRequire(import.meta.url);

// const formSchema = require("../db/formSchema.json");

// export const getFormSchemaService = () => {
//   if (!formSchema || !formSchema.fields) {
//     const error = new Error("Form schema is missing or invalid.");
//     error.statusCode = 500;
//     throw error;
//   }
//   return formSchema;
// };

import { createRequire } from "module";
const require = createRequire(import.meta.url);

let formSchema = {};
try {
  formSchema = require("../db/formSchema.json"); // load JSON safely
} catch (err) {
  console.error("Failed to load JSON:", err.message);
  formSchema = {}; // fallback to empty
}

export const getFormSchemaService = () => {
  // Return JSON even if it's empty
  return formSchema || {};
};
