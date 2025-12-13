const fs = require("fs");
const path = require("path");

const OUTPUT_DIR = path.join(__dirname, "..", "out");
const PREFIX = "/staging";

function patchHtml(content) {
  return content.replace(/(src|href)="\/(?!staging\/)/g, `$1="${PREFIX}/`);
}

function patchCss(content) {
  return content.replace(
    /url\(\s*(["']?)\/(?!staging\/)([^"')]+)\1\s*\)/g,
    `url($1${PREFIX}/$2$1)`
  );
}

function patchJs(content) {
  return content.replace(/(["'`])\/(?!staging\/)/g, `$1${PREFIX}/`);
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");
  const ext = path.extname(filePath).toLowerCase();

  if (ext === ".html") content = patchHtml(content);
  if (ext === ".css") content = patchCss(content);
  if (ext === ".js") content = patchJs(content);

  fs.writeFileSync(filePath, content, "utf8");
  console.log("patched", filePath);
}

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (
      entry.isFile() &&
      (full.endsWith(".html") || full.endsWith(".css") || full.endsWith(".js"))
    ) {
      processFile(full);
    }
  }
}

if (!fs.existsSync(OUTPUT_DIR)) {
  console.error("Cartella 'out' non trovata");
  process.exit(1);
}

walk(OUTPUT_DIR);
console.log("Prefisso /staging aggiunto a HTML/CSS/JS.");
