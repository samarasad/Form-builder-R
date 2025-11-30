
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import Toast from "../toast/toasts.jsx";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export function DynamicForm({ schema }) {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  // Toast auto clear
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  // initialize form
  useEffect(() => {
    const initialData = {};
    schema?.fields?.forEach((f) => {
      if (f.type === "multi-select") initialData[f.name] = [];
      else if (f.type === "switch") initialData[f.name] = false;
      else initialData[f.name] = "";
    });
    setFormData(initialData);
  }, [schema]);

  // Centralized border logic
  const baseClasses =
    "w-full p-3 rounded-md border transition-all text-gray-200 placeholder-gray-400";

  const fieldBorder = (name) =>
    errors[name]
      ? "border-red-500 focus:border-red-500"
      : "border-gray-600 focus:border-blue-500";
      

  // Handle change
  const handleChange = (name, value) => {
    const field = schema.fields.find((f) => f.name === name);
    if (!field) return;

    let newValue = value;

    switch (field.type) {
      case "number":
        newValue = value === "" ? "" : Number(value);
        break;
      case "switch":
        newValue = !!value;
        break;
      case "multi-select":
        newValue = Array.isArray(value) ? value : [value];
        break;
      default:
        newValue = value;
    }

    setFormData((prev) => ({ ...prev, [name]: newValue }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Validate
  const validate = () => {
    const newErrors = {};

    schema?.fields?.forEach((field) => {
      const value = formData[field.name];
      const v = field.validations;

      if (field.required) {
        if (field.type === "multi-select" && (!value || value.length === 0))
          newErrors[field.name] = "This field is required";
        else if (!value) newErrors[field.name] = "This field is required";
      }

      if ((field.type === "text" || field.type === "textarea") && value) {
        if (v?.minLength && value.length < v.minLength)
          newErrors[field.name] = `Minimum ${v.minLength} characters required`;
        if (v?.maxLength && value.length > v.maxLength)
          newErrors[field.name] = `Maximum ${v.maxLength} characters allowed`;
        if (v?.regex && !new RegExp(v.regex).test(value))
          newErrors[field.name] = "Invalid format";
      }

      if (field.type === "number" && value !== "") {
        const num = Number(value);
        if (v?.min && num < v.min)
          newErrors[field.name] = `Minimum is ${v.min}`;
        if (v?.max && num > v.max)
          newErrors[field.name] = `Maximum is ${v.max}`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      setToast({
        type: "error",
        title: "Validation Errors",
        message: "Please fix highlighted fields.",
      });
      return;
    }

    setSubmitting(true);
    setToast(null);

    const submissionData = { ...formData };

    // convert multi-select array → comma-separated string
    schema.fields.forEach((field) => {
      if (field.type === "multi-select") {
        submissionData[field.name] = submissionData[field.name].join(", ");
      }
    });

    try {
      const response = await fetch(
        "http://localhost:3000/api/form-submissions/post/submission",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(submissionData),
        }
      );

      const data = await response.json();

      if (data.success) {
        setToast({
          type: "success",
          title: "Success",
          message: data.message || "Form submitted successfully!",
        });
        resetForm();
      } else {
        const combinedErrors = Object.entries(data.errors || {})
          .map(([field, msg]) => `${field}: ${msg}`)
          .join("\n");

        setToast({
          type: "error",
          title: "Validation Errors",
          message: combinedErrors,
        });
      }
    } catch (err) {
      setToast({
        type: "error",
        title: "Network Error",
        message: "Unable to connect to server.",
      });
    }

    await new Promise((res) => setTimeout(res, 2000));
    setSubmitting(false);
  };

  // Render field
  const renderField = (field) => {
    const { name, type, placeholder, options } = field;
    const value = formData[name];

    switch (type) {
      case "text":
      case "date":
      case "number":
        return (
          <Input
            type={type}
            id={name}
            value={value}
            placeholder={placeholder}
            onChange={(e) => handleChange(name, e.target.value)}
            className={`${baseClasses} ${
              errors[name] ? "border-red-500" : "border-gray-600"
            } focus:border-blue-500 focus:ring focus:ring-blue-400/30`}
          />
        );

      case "textarea":
        return (
          <Textarea
            id={name}
            value={value}
            placeholder={placeholder}
            onChange={(e) => handleChange(name, e.target.value)}
            className={`${baseClasses} ${
              errors[name] ? "border-red-500" : "border-gray-600"
            } focus:border-blue-500 focus:ring focus:ring-blue-400/30`}
          />
        );

      case "select":
        return (
          <Select value={value} onValueChange={(val) => handleChange(name, val)}>
            <SelectTrigger
              className={`${baseClasses} ${
              errors[name] ? "border-red-500" : "border-gray-600"
            } focus:border-blue-500 focus:ring focus:ring-blue-400/30`}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>

            <SelectContent className="bg border border-gray-600">
              {options.map((opt) => (
                <SelectItem key={opt} value={opt}>
                  {opt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "multi-select":
        return (
          <select
            multiple
            className={`p-2 rounded ] transition-all ${fieldBorder(
              name
            )}`}
            value={value}
            onChange={(e) =>
              handleChange(
                name,
                [...e.target.selectedOptions].map((o) => o.value)
              )
            }
          >
            {options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        );

      case "switch":
        return (
          <div className="flex justify-end">
            <Switch
              checked={!!value}
              onCheckedChange={(val) => handleChange(name, val)}
            />
          </div>
        );

      default:
        return <div className="text-red-500">Unsupported field: {type}</div>;
    }
  };

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

  return (
    <form
      className="space-y-6 p-6 bg rounded-lg w-full"
      onSubmit={handleSubmit}
    >
      {schema?.fields?.map((field) => (
        <div key={field.name} className="flex flex-col space-y-1">
          <label className="text-gray-200 font-medium">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>

          {renderField(field)}

          {errors[field.name] && (
            <span className="text-red-500 text-sm">{errors[field.name]}</span>
          )}
        </div>
      ))}

      <Button
        type="submit"
        disabled={submitting}
        className={`w-full ${
          submitting ? "bg-blue-600" : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {submitting ? "Submitting..." : "Submit"}
      </Button>

      {toast && (
        <Toast type={toast.type} title={toast.title} message={toast.message} />
      )}
    </form>
  );
}
