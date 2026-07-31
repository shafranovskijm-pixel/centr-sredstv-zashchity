import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";

const requiredFiles = [
  "out/index.html",
  "out/sveden/index.html",
  "out/programmy/pozharnaya-bezopasnost/index.html",
  "out/documents/komplekt-na-podpis.zip",
  "out/documents/na-podpis/01-dogovor-sintagma.docx",
  "out/documents/na-podpis/19-svedeniya-dlya-oficialnogo-sayta.docx",
];

await Promise.all(requiredFiles.map((file) => access(file)));

const sveden = await readFile("out/sveden/index.html", "utf8");
assert.match(sveden, /19 заполненных документов Word/);
assert.match(sveden, /Пакет подготовлен к подписанию/);
assert.match(sveden, /komplekt-na-podpis\.zip/);

console.log("Timeweb static export validated: pages and downloads are present in out/.");
