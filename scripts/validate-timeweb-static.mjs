import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";

const programFiles = [
  "dpp-34h-for-approval-20260909.pdf",
  "module-programs-34h-for-approval-20260909.pdf",
  "assignments-34h-for-approval-20260909.pdf",
  "assessment-procedure-34h-for-approval-20260909.pdf",
];

const requiredFiles = [
  "out/index.html",
  "out/sveden/index.html",
  "out/programmy/pozharnaya-bezopasnost/index.html",
  "out/documents/egrul-csz-2026-08-20.pdf",
  "out/documents/ustav-csz-public-20260907.pdf",
  "out/documents/utverzhdennye-pdf/02-prikaz-1-OD-i-polozhenie-uchebnogo-centra.pdf",
  ...programFiles.map((file) => `out/documents/program-34h/${file}`),
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
assert.match(sveden, /34 академических часа · 2 модуля/);
assert.match(sveden, /href="\/sveden\/" download="svedeniya-csz.html"/);
assert.match(sveden, /href="\/documents\/ustav-csz-public-20260907.pdf" download=""/);
assert.match(sveden, /itemProp="email"/);
assert.ok(sveden.includes('href="https://www.minobrnauki.gov.ru/"'));
assert.ok(sveden.includes('href="https://edu.gov.ru/"'));
assert.match(sveden, /itemProp="foundingDate" dateTime="2003-10-09"/);
for (const id of ["common", "struct", "document", "education", "managers", "employees", "objects", "paid", "budget", "vacant", "grants", "inter", "catering"]) {
  assert.match(sveden, new RegExp(`href="#${id}"`));
  assert.match(sveden, new RegExp(`id="${id}"`));
}
assert.match(sveden, /Утверждённая редакция готовится к публикации/);
assert.doesNotMatch(sveden, /NO-GO|встречная подпись|01-dogovor-sintagma\.pdf/);
assert.match(sveden, /Выписка из ЕГРЮЛ от 20\.08\.2026/);
assert.match(sveden, /\/documents\/egrul-csz-2026-08-20\.pdf/);
assert.match(sveden, /Курс на 34 академических часа и электронная библиотека созданы/);
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
assert.match(program, /28 часов теории \+ 4 часа самостоятельных профессиональных заданий \+ 2 часа итоговой аттестации/);
assert.match(program, /8 учебных элементов/);
assert.match(program, /22 вопроса/);
assert.match(program, /Каждый из двух модулей включает 14 часов теории и 2 часа самостоятельного профессионального задания/);
assert.match(program, /5 учебных дней по календарному графику проекта/);
assert.match(program, /модуль 11 Типовой программы/);
assert.match(program, /Монтаж, техническое обслуживание и ремонт первичных средств пожаротушения/);
assert.match(program, /Курс и электронная библиотека на платформе «Синтагма» созданы/);
assert.match(program, /Проект программы повышения квалификации/);
assert.doesNotMatch(program, /видеоматериал|видеосвяз|тренаж[её]р|виртуальн(?:ое|ые|ый|ая) посещение|материал(?:ы)? производителей/iu);
assert.doesNotMatch(program, /30\.07\.2026 № 2-ОД|Общие вопросы организации обучения/);

// Public assets are limited to four approval drafts; the assessment answer keys remain private.
assert.deepEqual((await readdir("out/documents/program-34h")).sort(), [...programFiles].sort());
for (const file of programFiles) {
  const pdf = await readFile(`out/documents/program-34h/${file}`);
  assert.equal(pdf.subarray(0, 5).toString("ascii"), "%PDF-");
  for (const page of [sveden, program]) {
    assert.ok(page.includes(`href="/documents/program-34h/${file}"`));
    assert.ok(page.includes(`download="${file}"`));
    assert.match(page, /подписанная утверждённая версия пока не опубликована/);
  }
}

const home = await readFile("out/index.html", "utf8");
assert.match(home, /<strong>34<\/strong> академических часа/);
assert.match(home, /Компетенции для работы с первичными средствами пожаротушения/);
assert.match(home, /доступ к обучению пока не открыт/);
for (const page of [home, sveden, program]) {
  assert.doesNotMatch(page, /178(?:<\/strong>)?[^<]{0,30}(?:академических|час)|11 модулей|35 уроков|67 вопросов/);
}

console.log("Timeweb static export validated: CSZ34 pages, four approval PDFs and existing public downloads are present in out/.");
