export type JsonValidationResult = {
  valid: boolean;
  message: string;
  line?: number;
  column?: number;
};

export function formatJson(input: string): string {
  const parsed = JSON.parse(input);
  return JSON.stringify(parsed, null, 2);
}

export function minifyJson(input: string): string {
  const parsed = JSON.parse(input);
  return JSON.stringify(parsed);
}

export function validateJson(input: string): JsonValidationResult {
  try {
    JSON.parse(input);
    return { valid: true, message: "JSON is valid." };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid JSON.";
    const position = message.match(/position\s(\d+)/i);

    if (!position) {
      return { valid: false, message: `Invalid JSON: ${message}` };
    }

    const index = Number(position[1]);
    const context = input.slice(0, index);
    const lines = context.split("\n");
    const line = lines.length;
    const column = lines[lines.length - 1].length + 1;

    return {
      valid: false,
      message: `Invalid JSON near line ${line}, column ${column}. ${message}`,
      line,
      column,
    };
  }
}
