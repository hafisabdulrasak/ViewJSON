"use client";

import { useEffect, useState } from "react";
import { Clipboard, Download, RefreshCcw } from "lucide-react";
import { downloadFile } from "@/lib/download-utils";
import { excelToJson } from "@/lib/excel-utils";

type ExcelToJsonProps = {
  uploadedBuffer?: ArrayBuffer;
};

export default function ExcelToJson({ uploadedBuffer }: ExcelToJsonProps) {
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (uploadedBuffer) {
      try {
        const json = excelToJson(uploadedBuffer);
        setOutput(JSON.stringify(json, null, 2));
        setError(null);
      } catch (conversionError) {
        setError(conversionError instanceof Error ? conversionError.message : "Unable to parse Excel file.");
      }
    }
  }, [uploadedBuffer]);

  return (
    <section className="space-y-4">
      <p className="text-sm text-slate-300">
        Upload an Excel file from the dropzone above. The first worksheet will be converted to JSON.
      </p>
      <button onClick={() => setOutput("")} className="tool-btn">
        <RefreshCcw className="h-4 w-4" />
        Clear Output
      </button>

      {error ? <p className="text-sm text-rose-400">{error}</p> : null}

      <textarea
        value={output}
        readOnly
        placeholder="JSON output appears here after uploading an Excel file..."
        className="h-80 w-full rounded-xl border border-slate-700 bg-slate-900 p-4 text-sm outline-none"
      />
      <div className="flex flex-wrap gap-2">
        <button onClick={() => navigator.clipboard.writeText(output)} className="tool-btn-secondary" disabled={!output}>
          <Clipboard className="h-4 w-4" />
          Copy
        </button>
        <button
          onClick={() => downloadFile(output, "excel-converted.json", "application/json")}
          className="tool-btn-secondary"
          disabled={!output}
        >
          <Download className="h-4 w-4" />
          Download JSON
        </button>
      </div>
    </section>
  );
}
