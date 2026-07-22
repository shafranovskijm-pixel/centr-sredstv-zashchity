import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";

const requiredFiles = [
  "out/index.html",
  "out/sveden/index.html",
  "out/programmy/pozharnaya-bezopasnost/index.html",
  "out/documents/komplekt-proektov-docx.zip",
  "out/documents/proekty-docx/01-prikaz-o-sozdanii-uchebnogo-centra.docx",
  "out/documents/proekty-docx/20-plan-i-cheklist-gosuslugi.docx",
];

await Promise.all(requiredFiles.map((file) => access(file)));

const sveden = await readFile("out/sveden/index.html", "utf8");
assert.match(sveden, /21 редактируемый документ Word/);
assert.match(sveden, /komplekt-proektov-docx\.zip/);

console.log("Timeweb static export validated: pages and downloads are present in out/.");
