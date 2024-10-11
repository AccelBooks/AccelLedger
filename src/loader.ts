import fs from "fs";
import path from "path";
import { parseLedgerToCooked } from "hledger-parser";

function loadFile(filePath: string): any {
  let absoluteFilePath: string;

  if (path.isAbsolute(filePath)) {
    absoluteFilePath = filePath;
  } else {
    absoluteFilePath = path.resolve(__dirname, "..", filePath);
  }

  console.log("Attempting to load file:", absoluteFilePath);

  if (!fs.existsSync(absoluteFilePath)) {
    throw new Error(`File not found: ${absoluteFilePath}`);
  }

  const content = fs.readFileSync(absoluteFilePath, "utf-8");
  console.log("File content loaded, length:", content.length);

  try {
    const result = parseLedgerToCooked(content);
    console.log("parseLedgerToCooked result type:", typeof result);
    return result;
  } catch (error) {
    console.error("Error parsing ledger:", error);
    throw error;
  }
}

function loadString(string: string, dedent: boolean = false): any {
  if (dedent) {
    string = string.replace(/^[ \t]+/gm, "");
  }
  try {
    const result = parseLedgerToCooked(string);
    console.log("parseLedgerToCooked result type:", typeof result);
    return result;
  } catch (error) {
    console.error("Error parsing string:", error);
    throw error;
  }
}

export { loadFile, loadString };

// ... existing code ...
