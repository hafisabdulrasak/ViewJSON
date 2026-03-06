"use client";

import { useEffect, useState } from "react";
import { Clipboard, Download, RefreshCcw } from "lucide-react";
import { csvToJson } from "@/lib/csv-utils";
import { downloadFile } from "@/lib/download-utils";

type CsvToJsonProps = {
  uploadedText?: string;
};

export default function CsvToJson({ uploadedText }: CsvToJsonProps) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (uploadedText) {
      setInput(uploadedText);
    }
  }, [uploadedText]);

  const handleConvert = () => {
    try {
      const result = csvToJson(input);
      setOutput(JSON.stringify(result, null, 2));
      setError(null);
    } catch (conversionError) {
      setError(conversionError instanceof Error ? conversionError.message : "Unable to convert CSV to JSON.");
    }
  };

  return (
    <section className="space-y-4">
      <textarea
        value={input}
        onChange={(event) => setInput(event.target.value)}
        placeholder="Paste CSV data here..."
        className="h-56 w-full rounded-xl border border-slate-700 bg-slate-900 p-4 text-sm outline-none ring-cyan-400 transition focus:ring"
      />
      <button onClick={handleConvert} className="tool-btn">
        <RefreshCcw className="h-4 w-4" />
        Convert CSV → JSON
      </button>

      {error ? <p className="text-sm text-rose-400">{error}</p> : null}

      <textarea
        value={output}
        readOnly
        placeholder="JSON output appears here..."
        className="h-56 w-full rounded-xl border border-slate-700 bg-slate-900 p-4 text-sm outline-none"
      />
      <div className="flex flex-wrap gap-2">
        <button onClick={() => navigator.clipboard.writeText(output)} className="tool-btn-secondary" disabled={!output}>
          <Clipboard className="h-4 w-4" />
          Copy
        </button>
        <button
          onClick={() => downloadFile(output, "converted.json", "application/json")}
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
