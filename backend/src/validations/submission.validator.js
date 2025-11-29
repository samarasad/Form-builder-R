import Ajv from "ajv";
const ajv = new Ajv({ allErrors: true });
import { loadJSON } from "../utils/loadJSON.js";

const formSchema = loadJSON();

const generateAjvSchema = () => {
  if (!formSchema.fields || !Array.isArray(formSchema.fields)) {
    return {
      type: "object",
      properties: {},
      required: [],
      additionalProperties: false
    };
  }

  const properties = {};
  const required = [];

  formSchema.fields.forEach(field => {
    let type = "string";

    switch (field.type) {
      case "number": type = "number"; break;
      case "switch": type = "boolean"; break;
      case "select":
      case "multiselect":
      case "text":
      case "textarea":
      case "date":
        type = "string";
        break;
    }

    properties[field.name] = { type };
    if (field.required) required.push(field.name);
  });

  return {
    type: "object",
    properties,
    required,
    additionalProperties: false
  };
};

export const validateSubmission = (data) => {
  const schema = generateAjvSchema();
  const validate = ajv.compile(schema);

  const valid = validate(data);

  if (!valid) {
    const errorMap = {};

    validate.errors.forEach(err => {
      let field;

      if (err.keyword === "required") {
        field = err.params.missingProperty;
      } else if (err.instancePath) {
        field = err.instancePath.replace("/", "");
      } else {
        field = "form";
      }

      errorMap[field] = err.message;
    });

    const error = new Error("Validation failed.");
    error.statusCode = 400;
    error.errors = errorMap;
    throw error;
  }

  return { ...data };
};
