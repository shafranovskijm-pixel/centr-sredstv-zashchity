import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";

const requiredFiles = [
  "out/index.html",
  "out/sveden/index.html",
  "out/programmy/pozharnaya-bezopasnost/index.html",
  "out/documents/komplekt-utverzhdennyh-pdf.zip",
  "out/documents/utverzhdennye-pdf/01-dogovor-sintagma.pdf",
  "out/documents/utverzhdennye-pdf/19-svedeniya-dlya-oficialnogo-sayta.pdf",
];

await Promise.all(requiredFiles.map((file) => access(file)));

const sveden = await readFile("out/sveden/index.html", "utf8");
assert.match(sveden, /19 документов PDF/);
assert.match(sveden, /Документы сформированы в PDF/);
assert.match(sveden, /komplekt-utverzhdennyh-pdf\.zip/);

console.log("Timeweb static export validated: pages and downloads are present in out/.");
