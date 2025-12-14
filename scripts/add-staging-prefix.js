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
  
  content = content.replace(
    /url\(\s*(["']?)\/(?!staging\/)([^"')]+)\1\s*\)/g,
    `url($1${PREFIX}/$2$1)`
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
    } else if (entry.isFile() && (full.endsWith(".html") || full.endsWith(".css"))) {
      processFile(full);
    }
  }
}

if (!fs.existsSync(OUTPUT_DIR)) {
  console.error("Cartella 'out' non trovata");
  process.exit(1);
}

walk(OUTPUT_DIR);
console.log("Prefisso /staging aggiunto a src/href e url() nei CSS.");
