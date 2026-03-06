"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FileUp } from "lucide-react";

type SupportedFormat = "json" | "csv" | "excel";

type FileDropzoneProps = {
  onFileParsed: (payload: {
    format: SupportedFormat;
    name: string;
    text?: string;
    buffer?: ArrayBuffer;
  }) => void;
};

const ACCEPTED_MIME_TYPES = {
  "application/json": [".json"],
  "text/csv": [".csv"],
  "application/vnd.ms-excel": [".xls"],
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
};

function detectFormat(name: string): SupportedFormat | null {
  const lowerName = name.toLowerCase();

  if (lowerName.endsWith(".json")) return "json";
  if (lowerName.endsWith(".csv")) return "csv";
  if (lowerName.endsWith(".xlsx") || lowerName.endsWith(".xls")) return "excel";

  return null;
}

export default function FileDropzone({ onFileParsed }: FileDropzoneProps) {
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const [file] = acceptedFiles;
      if (!file) return;

      const format = detectFormat(file.name);
      if (!format) return;

      if (format === "excel") {
        const buffer = await file.arrayBuffer();
        onFileParsed({ format, name: file.name, buffer });
        return;
      }

      const text = await file.text();
      onFileParsed({ format, name: file.name, text });
    },
    [onFileParsed],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_MIME_TYPES,
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className="cursor-pointer rounded-xl border border-dashed border-slate-600 bg-slate-900/70 p-6 text-center transition hover:border-cyan-400"
    >
      <input {...getInputProps()} />
      <FileUp className="mx-auto mb-3 h-6 w-6 text-cyan-400" />
      <p className="text-sm text-slate-200">
        {isDragActive
          ? "Drop your file here..."
          : "Drag & drop .json, .csv, .xlsx, or .xls files, or click to upload."}
      </p>
    </div>
  );
}
