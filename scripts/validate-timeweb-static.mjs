import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";

const programFiles = [
  "dpp-178h-for-approval-20260913.pdf",
  "module-programs-178h-for-approval-20260913.pdf",
  "assignments-178h-for-approval-20260913.pdf",
  "assessment-procedure-178h-for-approval-20260913.pdf",
];

const requiredFiles = [
  "out/index.html",
  "out/sveden/index.html",
  "out/programmy/pozharnaya-bezopasnost/index.html",
  "out/documents/egrul-csz-2026-08-20.pdf",
  "out/documents/ustav-csz-public-20260907.pdf",
  "out/documents/utverzhdennye-pdf/02-prikaz-1-OD-i-polozhenie-uchebnogo-centra.pdf",
  ...programFiles.map((file) => `out/documents/program-178h/${file}`),
];

await Promise.all(requiredFiles.map((file) => access(file)));

const forbiddenFiles = [
  "out/documents/program-34h",
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
assert.match(sveden, /178 академических часов · 11 модулей/);
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
assert.match(sveden, /Программа не утверждена; подписанная редакция пока не опубликована/);
assert.doesNotMatch(sveden, /NO-GO|встречная подпись|01-dogovor-sintagma\.pdf/);
assert.match(sveden, /Выписка из ЕГРЮЛ от 20\.08\.2026/);
assert.match(sveden, /\/documents\/egrul-csz-2026-08-20\.pdf/);
assert.match(sveden, /Курс на 178 часов и электронная библиотека проходят подготовку и проверку/);
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
assert.match(program, /154 часа теории \+ 22 часа практических работ \+ 2 часа итоговой аттестации/);
assert.match(program, /Каждый из 11 модулей включает 14 часов теории и 2 часа самостоятельной практической работы/);
assert.match(program, /5 учебных недель по календарному графику проекта/);
assert.match(program, /Итого: 178 часов/);
assert.equal(program.match(/class=["']plan-row["']/g)?.length, 12);
assert.match(program, /Монтаж, техническое обслуживание и ремонт первичных средств пожаротушения/);
assert.match(program, /Курс на 178 часов и электронная библиотека на платформе «Синтагма» проходят подготовку и проверку/);
assert.match(program, /Проект программы повышения квалификации/);
assert.match(program, /дистанционное документированное наблюдение по видео и технической документации/);
assert.match(program, /допустимость предлагаемого способа выполнения этого содержания ещё требует подтверждения/);
assert.doesNotMatch(program, /30\.07\.2026 № 2-ОД/);

// Public assets are limited to four approval drafts; the assessment answer keys remain private.
assert.deepEqual((await readdir("out/documents/program-178h")).sort(), [...programFiles].sort());
for (const file of programFiles) {
  const pdf = await readFile(`out/documents/program-178h/${file}`);
  assert.equal(pdf.subarray(0, 5).toString("ascii"), "%PDF-");
  for (const page of [sveden, program]) {
    assert.ok(page.includes(`href="/documents/program-178h/${file}"`));
    assert.ok(page.includes(`download="${file}"`));
    assert.match(page, /подписанная утверждённая версия пока не опубликована/);
  }
}

const home = await readFile("out/index.html", "utf8");
assert.match(home, /<strong>178<\/strong> академических часов/);
assert.match(home, /Общепрофессиональный модуль и все десять видов работ/);
assert.match(home, /доступ к обучению пока не открыт/);
for (const page of [home, sveden, program]) {
  assert.doesNotMatch(page, /34(?:<\/strong>)?[^<]{0,30}(?:академических|час)|program-34h|35 уроков|67 вопросов|8 учебных элементов|22 вопроса/);
  assert.match(page, /[Пп]рограмма не утверждена/);
  assert.match(page, /набор закрыт до получения образовательной лицензии/i);
  assert.doesNotMatch(page, /примерная программа|28-ФЗ|ГОЧС|Институт Гипноза|Пыжив/iu);
}


const expectedModuleTitles = [
  "Общепрофессиональный модуль",
  "Монтаж, техническое обслуживание и ремонт систем пожаротушения и их элементов, включая диспетчеризацию и проведение пусконаладочных работ",
  "Монтаж, техническое обслуживание и ремонт систем пожарной и охранно-пожарной сигнализации и их элементов, включая диспетчеризацию и проведение пусконаладочных работ",
  "Монтаж, техническое обслуживание и ремонт систем противопожарного водоснабжения и их элементов, включая диспетчеризацию и проведение пусконаладочных работ",
  "Монтаж, техническое обслуживание и ремонт автоматических систем (элементов автоматических систем) противодымной вентиляции, включая диспетчеризацию и проведение пусконаладочных работ",
  "Монтаж, техническое обслуживание и ремонт систем оповещения и эвакуации при пожаре и их элементов, включая диспетчеризацию и проведение пусконаладочных работ, в том числе фотолюминесцентных эвакуационных систем и их элементов",
  "Монтаж, техническое обслуживание и ремонт автоматических систем (элементов автоматических систем) передачи извещений о пожаре, включая диспетчеризацию и проведение пусконаладочных работ",
  "Монтаж, техническое обслуживание и ремонт противопожарных занавесов и завес, включая диспетчеризацию и проведение пусконаладочных работ",
  "Монтаж, техническое обслуживание и ремонт заполнений проемов в противопожарных преградах",
  "Выполнение работ по огнезащите материалов, изделий и конструкций",
  "Монтаж, техническое обслуживание и ремонт первичных средств пожаротушения"
];
for (const title of expectedModuleTitles) assert.ok(program.includes(title), title);

console.log("Timeweb static export validated: CSZ178 project pages, four approval PDFs and existing public downloads are present in out/.");
