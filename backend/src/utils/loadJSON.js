import { createRequire } from "module";
const require = createRequire(import.meta.url);

export function loadJSON() {

    let formSchema = { fields: [] }; // fallback schema


try {
  const loaded = require("../db/formSchema.json");

  if (loaded && Array.isArray(loaded.fields)) {
    formSchema = loaded;
  } else {
    console.warn("⚠ formSchema.json is empty or malformed — using empty schema.");
  }
} catch (e) {
  console.warn("⚠ formSchema.json could not be loaded — using empty schema.");
} 
return formSchema;
}