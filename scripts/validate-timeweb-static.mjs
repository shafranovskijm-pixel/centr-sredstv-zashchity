import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";

const requiredFiles = [
  "out/index.html",
  "out/sveden/index.html",
  "out/programmy/pozharnaya-bezopasnost/index.html",
  "out/documents/egrul-csz-2026-08-20.pdf",
  "out/documents/ustav-csz-public-20260907.pdf",
  "out/documents/utverzhdennye-pdf/02-prikaz-1-OD-i-polozhenie-uchebnogo-centra.pdf",
];

await Promise.all(requiredFiles.map((file) => access(file)));

const forbiddenFiles = [
  "out/documents/utverzhdennye-pdf/01-dogovor-sintagma.pdf",
  "out/documents/ul-1037728048819-20260722152711.pdf",
  ...Array.from({ length: 11 }, (_, index) => {
    const number = String(index + 6).padStart(2, "0");
    const names = [
      "polozhenie-ob-organizacii-dpo",
      "pravila-priema",
      "pravila-vnutrennego-rasporyadka",
      "polozhenie-o-rezhime-zanyatiy",
      "polozhenie-o-kontrole-i-attestacii",
      "poryadok-perevoda-otchisleniya",
      "poryadok-obrazovatelnyh-otnosheniy",
      "polozhenie-ob-elektronnom-obuchenii",
      "polozhenie-o-yazyke-obrazovaniya",
      "polozhenie-o-dokumentah-o-kvalifikacii",
      "polozhenie-o-platnyh-uslugah",
    ];
    return `out/documents/utverzhdennye-pdf/${number}-${names[index]}.pdf`;
  }),
  "out/documents/utverzhdennye-pdf/17-obrazec-dogovora-na-obuchenie.pdf",
];

await Promise.all(forbiddenFiles.map((file) => assert.rejects(() => access(file))));

const sveden = await readFile("out/sveden/index.html", "utf8");
assert.match(sveden, /<html lang="ru" data-scroll-behavior="smooth">/);
assert.match(sveden, /178 часов · 11 модулей/);
assert.match(sveden, /href="\/sveden\/" download="svedeniya-csz.html"/);
assert.match(sveden, /href="\/documents\/ustav-csz-public-20260907.pdf" download=""/);
assert.match(sveden, /itemProp="email"/);
assert.match(sveden, /itemProp="foundingDate" dateTime="2003-10-09"/);
for (const id of ["common", "struct", "document", "education", "managers", "employees", "objects", "paid", "budget", "vacant", "grants", "inter", "catering"]) {
  assert.match(sveden, new RegExp(`href="#${id}"`));
  assert.match(sveden, new RegExp(`id="${id}"`));
}
assert.match(sveden, /Утверждённая редакция готовится к публикации/);
assert.doesNotMatch(sveden, /NO-GO|встречная подпись|01-dogovor-sintagma\.pdf/);
assert.match(sveden, /Выписка из ЕГРЮЛ от 20\.08\.2026/);
assert.match(sveden, /\/documents\/egrul-csz-2026-08-20\.pdf/);
assert.match(sveden, /Учебный курс на 178 часов и электронная библиотека проходят подготовку и проверку/);
assert.match(sveden, /Общежитие/);
assert.match(sveden, /Интернат/);
assert.match(sveden, /Сведения уточняются перед публикацией окончательного комплекта документов/);
assert.doesNotMatch(sveden, /Предписания органов контроля<\/strong><span>Отсутствуют|Объекты питания и охраны здоровья отсутствуют/);
assert.doesNotMatch(sveden, /№ 2-ОД|№ 3-ОД|факсимил|Кравченко Вероника Юрьевна|проект назначения/iu);
assert.doesNotMatch(sveden, /ul-1037728048819-20260722152711\.pdf/);
assert.doesNotMatch(sveden, /18 документов PDF|19 документов PDF|komplekt-utverzhdennyh-pdf\.zip/);
assert.doesNotMatch(
  sveden,
  /03-prikaz-2-OD-ob-utverzhdenii-programmy\.pdf|04-programma-178-chasov\.pdf|05-prikaz-3-OD-ob-utverzhdenii-lokalnyh-aktov\.pdf|18-svedeniya-o-mto-i-eios\.pdf/,
);

const program = await readFile(
  "out/programmy/pozharnaya-bezopasnost/index.html",
  "utf8",
);
assert.match(program, /Общепрофессиональный модуль/);
assert.match(program, /download="proekt-programmy-csz.html"/);
assert.match(program, /id="vision-toggle"/);
assert.match(program, /aria-label="Учебный план" tabindex="0"/);
assert.match(program, /154 часа теории \+ 22 часа практики \+ 2 часа итоговой аттестации/);
assert.match(program, /35 уроков/);
assert.match(program, /67 вопросов/);
assert.match(program, /Промежуточная аттестация проводится по каждому из 11 модулей/);
assert.match(program, /Курс и электронная библиотека на платформе «Синтагма» проходят подготовку и проверку/);
assert.match(program, /Проект программы повышения квалификации/);
assert.doesNotMatch(program, /видеоматериал|видеосвяз|тренаж[её]р|виртуальн(?:ое|ые|ый|ая) посещение|материал(?:ы)? производителей/iu);
assert.doesNotMatch(program, /30\.07\.2026 № 2-ОД|Общие вопросы организации обучения/);

console.log("Timeweb static export validated: pages and downloads are present in out/.");
