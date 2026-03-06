import Papa from "papaparse";

export function csvToJson(input: string): unknown[] {
  const parsed = Papa.parse(input, {
    header: true,
    skipEmptyLines: true,
    dynamicTyping: true,
  });

  if (parsed.errors.length > 0) {
    throw new Error(parsed.errors[0].message);
  }

  return parsed.data;
}

export function jsonToCsv(input: string): string {
  const parsed = JSON.parse(input);

  if (!Array.isArray(parsed)) {
    throw new Error("JSON must be an array of flat objects.");
  }

  if (parsed.length === 0) {
    return "";
  }

  const hasInvalidItem = parsed.some(
    (item) =>
      item === null ||
      typeof item !== "object" ||
      Array.isArray(item) ||
      Object.values(item).some((value) => typeof value === "object" && value !== null),
  );

  if (hasInvalidItem) {
    throw new Error("JSON must contain only flat objects.");
  }

  return Papa.unparse(parsed as Record<string, unknown>[]);
}
