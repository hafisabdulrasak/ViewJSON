"use client";

import { useState } from "react";
import { Clipboard, Download, ShieldCheck, Shrink, WandSparkles } from "lucide-react";
import { downloadFile } from "@/lib/download-utils";
import { formatJson, minifyJson, validateJson } from "@/lib/json-utils";

export default function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const copyOutput = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setStatus({ type: "success", message: "Output copied to clipboard." });
  };

  const handleFormat = () => {
    try {
      const formatted = formatJson(input);
      setOutput(formatted);
      setStatus({ type: "success", message: "JSON formatted successfully." });
    } catch (error) {
      setStatus({ type: "error", message: error instanceof Error ? error.message : "Unable to format JSON." });
    }
  };

  const handleValidate = () => {
    const result = validateJson(input);
    setStatus({ type: result.valid ? "success" : "error", message: result.message });
  };

  const handleMinify = () => {
    try {
      const minified = minifyJson(input);
      setOutput(minified);
      setStatus({ type: "success", message: "JSON minified successfully." });
    } catch (error) {
      setStatus({ type: "error", message: error instanceof Error ? error.message : "Unable to minify JSON." });
    }
  };

  return (
    <section className="space-y-4">
      <textarea
        value={input}
        onChange={(event) => setInput(event.target.value)}
        placeholder="Paste JSON here..."
        className="h-64 w-full rounded-xl border border-slate-700 bg-slate-900 p-4 text-sm outline-none ring-cyan-400 transition focus:ring"
      />
      <div className="flex flex-wrap gap-2">
        <button onClick={handleFormat} className="tool-btn">
          <WandSparkles className="h-4 w-4" />
          Format JSON
        </button>
        <button onClick={handleValidate} className="tool-btn">
          <ShieldCheck className="h-4 w-4" />
          Validate JSON
        </button>
        <button onClick={handleMinify} className="tool-btn">
          <Shrink className="h-4 w-4" />
          Minify JSON
        </button>
      </div>

      {status ? (
        <p className={`text-sm ${status.type === "success" ? "text-emerald-400" : "text-rose-400"}`}>{status.message}</p>
      ) : null}

      <textarea
        value={output}
        readOnly
        placeholder="Output appears here..."
        className="h-64 w-full rounded-xl border border-slate-700 bg-slate-900 p-4 text-sm outline-none"
      />
      <div className="flex flex-wrap gap-2">
        <button onClick={copyOutput} className="tool-btn-secondary" disabled={!output}>
          <Clipboard className="h-4 w-4" />
          Copy
        </button>
        <button
          onClick={() => downloadFile(output, "formatted.json", "application/json")}
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
