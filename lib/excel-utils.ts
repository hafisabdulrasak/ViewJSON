import * as XLSX from "xlsx";

export function excelToJson(buffer: ArrayBuffer): unknown[] {
  const workbook = XLSX.read(buffer, { type: "array" });
  const firstSheetName = workbook.SheetNames[0];

  if (!firstSheetName) {
    throw new Error("No worksheets found in file.");
  }

  const worksheet = workbook.Sheets[firstSheetName];
  return XLSX.utils.sheet_to_json(worksheet, { defval: null });
}
