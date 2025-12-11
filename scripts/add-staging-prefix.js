const fs = require("fs");
const path = require("path");

const OUT_DIR = path.join(__dirname, "..", "out");
const PREFIX = "/staging";

function walk(dir, cb) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath, cb);
    } else {
      cb(fullPath);
    }
  }
}

walk(OUT_DIR, (filePath) => {
  if (
    !filePath.endsWith(".html") &&
    !filePath.endsWith(".css") &&
    !filePath.endsWith(".js")
  ) {
    return;
  }

  let content = fs.readFileSync(filePath, "utf8");

  content = content.replace(
    /(href=")\/(?!staging\/)/g,
    `$1${PREFIX.replace("/", "")}/`
  );

  content = content.replace(
    /(src=")\/(?!staging\/)/g,
    `$1${PREFIX.replace("/", "")}/`
  );

  content = content.replace(
    /(url\(")\/(?!staging\/)/g,
    `$1${PREFIX.replace("/", "")}/`
  );

  fs.writeFileSync(filePath, content, "utf8");
  console.log(`Rewritten paths in ${filePath}`);
});

console.log("ok /staging a href/src/url()");
