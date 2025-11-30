
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { FormSkeleton } from "@/components/layouts/FormSkeleton";
import {DynamicForm} from "@/components/form/DynamicForm";
import {DynamicTable} from "@/components/table/DataTable";
export function FormPage() {
  const API_URL = "http://localhost:3000/api/form-schema/get/schema";

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [schema, setSchema] = useState(null);

  const loadSchema = async () => {
    setLoading(true);
    setError(false);
    setErrorMessage("");
    setSchema(null);

    try {
   await new Promise((resolve) => setTimeout(resolve, 4000));

      const response = await fetch(API_URL);

      if (!response.ok) {
        const errorBody = await response.json().catch(() => null);

        throw new Error(
          errorBody?.message ||
          `Request failed with status ${response.status}`
        );
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || "Unexpected error");
      }

      setSchema(result.data); // real schema
    } catch (err) {
      setError(true);
      setErrorMessage(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSchema();
  }, []);

  return (
    <div>
      <Card className="p-6  border border-[var(--border-subtle)]">
      <h2 className="text-xl font-semibold mb-4">Load JSON</h2>

      {/* ---------- LOADING ---------- */}
      {loading && <FormSkeleton />}

      {/* ---------- ERROR ---------- */}
      {!loading && error && (
        <div className="flex flex-col items-center text-center py-10">
          <div className="w-12 h-12 rounded-full bg-red-900/20 flex items-center justify-center mb-4">
            <span className="text-red-500 text-2xl">⚠</span>
          </div>

          <h3 className="text-lg font-semibold mb-1">Failed to load form</h3>

          <p className="text-sm text-[var(--text-muted)] mb-6 max-w-sm">
            {errorMessage}
          </p>

          <button
            onClick={loadSchema}
            className="px-6 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white font-medium"
          >
            Retry
          </button>
        </div>
      )}

      {/* ---------- SUCCESS ---------- */}
      {!loading && !error && schema && (
        <pre className="text-sm text-[var(--text-muted)] whitespace-pre-wrap">
          {JSON.stringify(schema, null, 2)}
        </pre>
      )}
       
    </Card>
    <Card className="mt-6 p-6  border border-[var(--border-subtle)]">
    <h2 className="text-xl font-semibold mb-4">Active Form</h2>
      <DynamicForm schema={schema} />
    </Card>
    <Card className="mt-6 p-6 border border-[var(--border-subtle)]">
    <h2 className="text-xl font-semibold mb-4">FORMS</h2>
      {/* <DynamicForm schema={schema} /> */}
      <DynamicTable
        apiUrl="http://localhost:3000/api/get-submissions/get/submissions?page=1&sortBy=createdAt&sortOrder=desc"
      />
    </Card>
    </div>
  );
}
