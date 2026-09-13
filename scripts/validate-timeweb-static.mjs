import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";

const programFiles = [
  "dpp-178h-for-approval-20260913.pdf",
  "module-programs-178h-for-approval-20260913.pdf",
  "assignments-178h-for-approval-20260913.pdf",
  "assessment-procedure-178h-for-approval-20260913.pdf",
];

const svedenSections = [
  ["common", "common", "Основные сведения"],
  ["struct", "struct", "Структура и органы управления образовательной организацией"],
  ["document", "document", "Документы"],
  ["education", "education", "Образование"],
  ["eduStandarts", "eduStandarts", "Образовательные стандарты и требования"],
  ["managers", "managers", "Руководство"],
  ["employees", "employees", "Педагогический состав"],
  ["objects", "objects", "Материально-техническое обеспечение и оснащённость образовательного процесса. Доступная среда"],
  ["grants", "grants", "Стипендии и меры поддержки обучающихся"],
  ["paid", "paid_edu", "Платные образовательные услуги"],
  ["budget", "budget", "Финансово-хозяйственная деятельность"],
  ["vacant", "vacant", "Вакантные места для приёма (перевода) обучающихся"],
  ["inter", "inter", "Международное сотрудничество"],
  ["catering", "catering", "Организация питания в образовательной организации"],
];

const requiredItemPropsBySlug = {
  common: ["fullName", "shortName", "regDate", "uchredLaw", "nameUchred", "address", "workTime", "telephone", "email", "licenseDocLink", "addressPlaceSet", "addressPlacePrac", "addressPlacePodg", "addressPlaceGia", "addressPlaceDop", "addressPlaceOppo"],
  struct: ["structOrgUprav", "name", "fio", "post", "addressStr", "site", "email", "divisionClauseDocLink", "filInfo", "repInfo"],
  document: ["ustavDocLink", "localActStud", "localActOrder", "localActCollec", "reportEduDocLink", "prescriptionDocLink", "priemDocLink", "modeDocLink", "tekKontrolDocLink", "perevodDocLink", "vozDocLink"],
  education: ["eduAccred", "eduCode", "eduName", "eduProf", "eduLevel", "eduForm", "learningTerm", "eduPred", "eduPrac", "languageEl", "eduChislenEl", "eduPriemEl", "eduPerevodEl", "eduOp", "opMain", "educationPlan", "educationRpd", "educationShedule", "eduPr", "methodology", "eduNir", "perechenNir", "napravNir", "resultNir", "baseNir", "graduateJob", "v1", "t1", "accreditationDocLink", "addRef"],
  eduStandarts: ["eduFedDoc", "eduStandartDoc", "eduFedTreb", "eduStandartTreb"],
  managers: ["rucovodstvo", "rucovodstvoZam", "rucovodstvoFil", "nameFil", "fio", "post", "telephone", "email"],
  employees: ["teachingStaff", "fio", "post", "teachingDiscipline", "teachingLevel", "degree", "academStat", "qualification", "profDevelopment", "specExperience", "teachingOp"],
  objects: ["purposeCab", "addressCab", "nameCab", "osnCab", "ovzCab", "purposePrac", "addressPrac", "namePrac", "osnPrac", "ovzPrac", "purposeLibr", "purposeSport", "objName", "objAddress", "objOvz", "ovz", "purposeFacil", "purposeFacilOvz", "comNet", "comNetOvz", "erList", "erListOvz", "techOvz", "hostelInfo", "interInfo", "hostelNum", "hostelNumOvz", "hostelNumRooms", "interNum", "interNumOvz", "hostelInterOvz", "localActObSt", "localActObPred"],
  grants: ["grant", "support"],
  paid_edu: ["paidEdu", "paidDog", "paidSt", "paidParents"],
  budget: ["finBFVolume", "finBRVolume", "finBMVolume", "finPVolume", "volume", "finYear", "finPost", "finRas", "finPlanDocLink"],
  vacant: ["vacant", "eduCode", "eduName", "eduLevel", "eduProf", "eduCourse", "eduForm", "numberBFVacant", "numberBRVacant", "numberBMVacant", "numberPVacant"],
  inter: ["internationalDog", "stateName", "orgName", "dogReg"],
  catering: ["meals", "objName", "objAddress", "objOvz", "health"],
};

const requiredFiles = [
  "out/index.html",
  "out/404.html",
  "out/sveden/index.html",
  ...svedenSections.map(([, slug]) => `out/sveden/${slug}/index.html`),
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
assert.match(sveden, /itemProp="regDate" dateTime="2003-10-09"/);
for (const [id, slug] of svedenSections) {
  assert.match(sveden, new RegExp(`href="/sveden/${slug}/"`));
  assert.match(sveden, new RegExp(`id="${id}"`));
}
assert.match(sveden, /Программа не утверждена; подписанная редакция пока не опубликована/);
assert.doesNotMatch(sveden, /NO-GO|встречная подпись|01-dogovor-sintagma\.pdf/);
assert.match(sveden, /Выписка из ЕГРЮЛ от 20\.08\.2026/);
assert.match(sveden, /\/documents\/egrul-csz-2026-08-20\.pdf/);
assert.match(sveden, /Курс на 178 часов и электронная библиотека проходят подготовку и проверку/);
assert.match(sveden, /Общежитие/);
assert.match(sveden, /Интернат/);
assert.match(sveden, /значение 0 без документального основания не заявляется/);
assert.doesNotMatch(sveden, /количество мест — 0/);
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
assert.match(program, /Каждый из 11 модулей включает 14 часов теории и 2 часа практических занятий/);
assert.match(program, /десять самостоятельных документарных ситуационных заданий общей продолжительностью 20 часов/);
assert.match(program, /отдельное двухчасовое синхронное дистанционное наблюдение реального объекта/);
assert.match(program, /5 учебных недель по календарному графику проекта/);
assert.match(program, /Итого: 178 часов/);
assert.equal(program.match(/class=["']plan-row["']/g)?.length, 12);
assert.match(program, /Монтаж, техническое обслуживание и ремонт первичных средств пожаротушения/);
assert.match(program, /Курс на 178 часов и электронная библиотека на платформе «Синтагма» проходят подготовку и проверку/);
assert.match(program, /Проект программы повышения квалификации/);
assert.match(program, /наблюдение в реальном времени реального объекта с установленным противопожарным занавесом/);
assert.match(program, /только при наличии объекта, права на его показ, ответственного лица, расписания и работающей синхронной связи/);
assert.match(program, /до выполнения этих условий занятие переносится и не засчитывается/);
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

const sectionPages = [];
const sectionTitles = new Set();
const sectionHeadings = new Set();
const sectionCanonicals = new Set();
for (const [id, slug, title] of svedenSections) {
  const page = await readFile(`out/sveden/${slug}/index.html`, "utf8");
  sectionPages.push(page);
  const markup = visibleMarkup(page);
  const titleMatch = markup.match(/<title>([^<]+)<\/title>/u);
  const headingMatch = markup.match(/<h1>([^<]+)<\/h1>/u);
  const canonicalMatch = markup.match(/<link(?=[^>]*\brel="canonical")(?=[^>]*\bhref="([^"]+)")[^>]*>/u);
  assert.equal(titleMatch?.[1], `${title} — Центр средств защиты`, slug);
  assert.equal(headingMatch?.[1], title, slug);
  assert.equal(canonicalMatch?.[1], `https://xn-----8kcgjebtk6b7abmdihf9c1dzb.xn--p1ai/sveden/${slug}/`, slug);
  sectionTitles.add(titleMatch[1]);
  sectionHeadings.add(headingMatch[1]);
  sectionCanonicals.add(canonicalMatch[1]);
  assert.match(markup, new RegExp(`<section class="info-section" id="${id}"`));
  assert.equal(markup.match(/<section class="info-section"/g)?.length, 1);
  assert.match(markup, new RegExp(`<a(?=[^>]*href="/sveden/${slug}/")(?=[^>]*aria-current="page")[^>]*>`));
  assert.doesNotMatch(markup, /\bitcmprop\s*=|\bitemprop=["']copy["']/iu, slug);
  assert.doesNotMatch(markup, /Общепрофессиональный модуль и все десять видов работ/);

  const itemProps = new Set(collectItemPropRecords(markup).map(({ prop }) => prop));
  for (const itemProp of requiredItemPropsBySlug[slug]) {
    assert.ok(itemProps.has(itemProp), `${slug}: missing itemProp=${itemProp}`);
  }
  if (slug === "education") assert.ok(itemProps.has("accreditationDocLink"));
  else assert.ok(!itemProps.has("accreditationDocLink"), `${slug}: accreditationDocLink must be absent`);

  assertSectionNesting(slug, markup);

  if (slug === "education") {
    const project = markup.match(/<article(?=[^>]*data-program-status="unapproved-project")[^>]*>[\s\S]*?<\/article>/u)?.[0];
    assert.ok(project, "education: unapproved project marker missing");
    assert.doesNotMatch(project, /\bitemProp="(?:eduAccred|eduOp|eduNir|graduateJob)"/u);
    assert.match(project, /Проект дополнительной профессиональной программы/u);
    assert.match(project, /Программа не утверждена|неутверждённ/u);
  }
}

assert.equal(sectionTitles.size, svedenSections.length, "section titles must be unique");
assert.equal(sectionHeadings.size, svedenSections.length, "section h1 values must be unique");
assert.equal(sectionCanonicals.size, svedenSections.length, "section canonicals must be unique");
await assert.rejects(() => access("out/sveden/__missing__/index.html"));

assert.match(sectionPages[svedenSections.findIndex(([, slug]) => slug === "education")], /178 академических часов/);
assert.notEqual(sectionPages[0], home);

for (const page of [home, sveden, program]) {
  assert.doesNotMatch(page, /34(?:<\/strong>)?[^<]{0,30}(?:академических|час)|program-34h|35 уроков|67 вопросов|8 учебных элементов|22 вопроса/);
  assert.match(page, /[Пп]рограмма не утверждена/);
  assert.match(page, /набор закрыт до получения образовательной лицензии/i);
  assert.doesNotMatch(page, /примерная программа|28-ФЗ|ГОЧС|Институт Гипноза|Пыжив/iu);
}

for (const page of sectionPages) {
  assert.doesNotMatch(page, /34(?:<\/strong>)?[^<]{0,30}(?:академических|час)|program-34h|35 уроков|67 вопросов|8 учебных элементов|22 вопроса/);
  assert.doesNotMatch(page, /примерная программа|28-ФЗ|ГОЧС|Институт Гипноза|Пыжив/iu);
}

for (const slug of ["document", "education", "objects"]) {
  const page = sectionPages[svedenSections.findIndex(([, candidate]) => candidate === slug)];
  assert.match(page, /[Пп]рограмма не утверждена|Подписанная утверждённая редакция пока не опубликована/);
  assert.match(page, /набор закрыт до получения образовательной лицензии|До получения лицензии/iu);
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

console.log("Timeweb static export validated: CSZ178 project pages, 14 real /sveden/ subsection routes with v10 microdata, four approval PDFs and existing public downloads are present in out/.");

function visibleMarkup(document) {
  const marker = document.indexOf("<script>self.__next_f.push");
  return marker === -1 ? document : document.slice(0, marker);
}

function collectItemPropRecords(markup) {
  const records = [];
  const stack = [];
  const voidTags = new Set(["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"]);
  const tagPattern = /<(\/)?([a-z][\w:-]*)([^>]*)>/giu;
  for (const match of markup.matchAll(tagPattern)) {
    const [, closing, rawTag, attributes] = match;
    const tag = rawTag.toLowerCase();
    if (closing) {
      while (stack.length) {
        const current = stack.pop();
        if (current.tag === tag) break;
      }
      continue;
    }

    const ancestors = stack.flatMap(({ props }) => props);
    const props = [...attributes.matchAll(/\bitemprop=["']([^"']+)["']/giu)].flatMap((property) => property[1].trim().split(/\s+/u));
    for (const prop of props) records.push({ prop, ancestors });

    const selfClosing = /\/\s*$/u.test(attributes) || voidTags.has(tag);
    if (!selfClosing) stack.push({ tag, props });
  }
  return records;
}

function assertNestedItemProps(markup, parent, children, slug) {
  const records = collectItemPropRecords(markup);
  for (const child of children) {
    assert.ok(
      records.some(({ prop, ancestors }) => prop === child && ancestors.includes(parent)),
      `${slug}: itemProp=${child} must be inside itemProp=${parent}`,
    );
  }
}

function assertSectionNesting(slug, markup) {
  const relationships = {
    common: [["uchredLaw", ["nameUchred"]]],
    struct: [["structOrgUprav", ["name", "fio", "post", "addressStr", "site", "email", "divisionClauseDocLink"]]],
    education: [
      ["eduAccred", ["eduCode", "eduName", "eduProf", "eduLevel", "eduForm", "learningTerm", "eduPred", "eduPrac"]],
      ["eduOp", ["eduCode", "eduName", "eduLevel", "eduProf", "eduForm", "opMain", "educationPlan", "educationRpd", "educationShedule", "eduPr", "methodology"]],
      ["eduNir", ["eduCode", "eduName", "perechenNir", "eduProf", "eduLevel", "napravNir", "resultNir", "baseNir"]],
      ["graduateJob", ["eduCode", "eduName", "eduProf", "v1", "t1"]],
    ],
    managers: [
      ["rucovodstvo", ["fio", "post", "telephone", "email"]],
      ["rucovodstvoZam", ["fio", "post", "telephone", "email"]],
      ["rucovodstvoFil", ["nameFil", "fio", "post", "telephone", "email"]],
    ],
    employees: [["teachingStaff", ["fio", "post", "teachingDiscipline", "teachingLevel", "degree", "academStat", "qualification", "profDevelopment", "specExperience", "teachingOp"]]],
    objects: [
      ["purposeCab", ["addressCab", "nameCab", "osnCab", "ovzCab"]],
      ["purposePrac", ["addressPrac", "namePrac", "osnPrac", "ovzPrac"]],
      ["purposeLibr", ["objName", "objAddress", "objOvz"]],
      ["purposeSport", ["objName", "objAddress", "objOvz"]],
    ],
    budget: [["volume", ["finYear", "finPost", "finRas"]]],
    vacant: [["vacant", ["eduCode", "eduName", "eduLevel", "eduProf", "eduCourse", "eduForm", "numberBFVacant", "numberBRVacant", "numberBMVacant", "numberPVacant"]]],
    inter: [["internationalDog", ["stateName", "orgName", "dogReg"]]],
    catering: [["meals", ["objName", "objAddress", "objOvz"]]],
  };
  for (const [parent, children] of relationships[slug] ?? []) {
    assertNestedItemProps(markup, parent, children, slug);
  }
}
