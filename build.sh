#!/bin/sh
# Construye la app en un único HTML: artifact (sin doctype) y docs/index.html (GitHub Pages)
set -e
cd "$(dirname "$0")"
mkdir -p dist docs
JS=$(mktemp --suffix=.js)
cat src/temas.js src/q1_tributario.js src/q2_aduana_cambios.js src/q3_transversal.js src/q4_comportamental.js src/likert.js src/app.js > "$JS"
node -e '
const fs=require("fs");const sh=fs.readFileSync("src/shell.html","utf8");const js=fs.readFileSync(process.argv[1],"utf8");
const body=sh.replace("/*DATA*/",()=>js);
fs.writeFileSync("dist/expediente-dian.html",body);
fs.writeFileSync("docs/index.html","<!doctype html>\n<html lang=\"es\">\n<head>\n<meta charset=\"utf-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1, viewport-fit=cover\">\n"+body.replace(/<div class="app">/,"</head>\n<body>\n<div class=\"app\">")+"\n</body>\n</html>\n");
' "$JS"
node --check "$JS"
rm "$JS"
ls -la dist docs
