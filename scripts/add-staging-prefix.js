const fs = require("fs");
const path = require("path");

const OUTPUT_DIR = path.join(__dirname, "..", "out");
const PREFIX = "/staging";

function processFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");

  content = content.replace(
    /(src|href)="\/(?!staging\/)/g,
    `$1="${PREFIX}/`
  );

  fs.writeFileSync(filePath, content, "utf8");
  console.log("✔ patched", filePath);
}

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
    } else if (entry.isFile() && full.endsWith(".html")) {
      processFile(full);
    }
  }
}

if (!fs.existsSync(OUTPUT_DIR)) {
  console.error("Cartella 'out' non trovata");
  process.exit(1);
}

walk(OUTPUT_DIR);
console.log("Prefisso /staging aggiunto a tutti gli src/href assoluti.");
