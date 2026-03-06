"use client";

import { useMemo, useState } from "react";
import CsvToJson from "@/components/csv-to-json";
import ExcelToJson from "@/components/excel-to-json";
import FileDropzone from "@/components/file-dropzone";
import JsonFormatter from "@/components/json-formatter";
import JsonToCsv from "@/components/json-to-csv";

type TabKey = "formatter" | "csvToJson" | "jsonToCsv" | "excelToJson";

const tabs: { key: TabKey; label: string }[] = [
  { key: "formatter", label: "JSON Formatter" },
  { key: "csvToJson", label: "CSV → JSON" },
  { key: "jsonToCsv", label: "JSON → CSV" },
  { key: "excelToJson", label: "Excel → JSON" },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabKey>("formatter");
  const [uploadedCsv, setUploadedCsv] = useState("");
  const [uploadedJson, setUploadedJson] = useState("");
  const [uploadedExcel, setUploadedExcel] = useState<ArrayBuffer | undefined>(undefined);

  const activePanel = useMemo(() => {
    switch (activeTab) {
      case "csvToJson":
        return <CsvToJson uploadedText={uploadedCsv} />;
      case "jsonToCsv":
        return <JsonToCsv uploadedText={uploadedJson} />;
      case "excelToJson":
        return <ExcelToJson uploadedBuffer={uploadedExcel} />;
      default:
        return <JsonFormatter />;
    }
  }, [activeTab, uploadedCsv, uploadedExcel, uploadedJson]);

  return (
    <main className="min-h-screen px-4 py-10">
      <div className="mx-auto max-w-5xl space-y-8">
        <header className="space-y-2 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-cyan-400">ViewJSON</h1>
          <p className="text-slate-300">Format, validate, and convert JSON instantly</p>
        </header>

        <FileDropzone
          onFileParsed={({ format, text, buffer }) => {
            if (format === "csv") {
              setUploadedCsv(text ?? "");
              setActiveTab("csvToJson");
            }

            if (format === "json") {
              setUploadedJson(text ?? "");
              setActiveTab("jsonToCsv");
            }

            if (format === "excel") {
              setUploadedExcel(buffer);
              setActiveTab("excelToJson");
            }
          }}
        />

        <nav className="flex flex-wrap gap-2 rounded-xl bg-slate-900 p-2">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                activeTab === tab.key
                  ? "bg-cyan-500 text-slate-950"
                  : "bg-slate-800 text-slate-200 hover:bg-slate-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 shadow-2xl shadow-slate-950">{activePanel}</div>
      </div>
    </main>
  );
}
