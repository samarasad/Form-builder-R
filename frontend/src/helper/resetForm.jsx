const resetForm = () => {
  const cleared = {};

  schema.fields.forEach((f) => {
    if (f.type === "multi-select") cleared[f.name] = [];
    else if (f.type === "switch") cleared[f.name] = false;
    else cleared[f.name] = "";
  });

  setFormData(cleared);
  setErrors({});
};
