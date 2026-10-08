import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const developmentPreviewMeta =
  /<meta(?=[^>]*\bname=["']codex-preview["'])(?=[^>]*\bcontent=["']development["'])[^>]*>/i;
const productionCanonical =
  /<link(?=[^>]*\brel=["']canonical["'])(?=[^>]*\bhref=["']https:\/\/xn-----8kcgjebtk6b7abmdihf9c1dzb\.xn--p1ai\/["'])[^>]*>/i;
const officialSiteHref =
  /href=["']https:\/\/xn-----8kcgjebtk6b7abmdihf9c1dzb\.xn--p1ai["']/i;
const programCanonical =
  /<link(?=[^>]*\brel=["']canonical["'])(?=[^>]*\bhref=["']https:\/\/xn-----8kcgjebtk6b7abmdihf9c1dzb\.xn--p1ai\/programmy\/pozharnaya-bezopasnost\/["'])[^>]*>/i;

const sha256 = (data) => createHash("sha256").update(data).digest("hex");

// Timeweb checks the real Next.js static export. The default runner still exercises Vinext.
const testTarget = process.env.CSZ_TEST_TARGET ?? "vinext";
assert.ok(["vinext", "timeweb"].includes(testTarget), "CSZ_TEST_TARGET must be vinext or timeweb");
console.info(`Rendered HTML test target: ${testTarget}`);
let workerSequence = 0;

async function fetchVinext(pathname) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${workerSequence++}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

async function loadRenderedHtml(pathname) {
  assert.match(pathname, /^\/(?:[a-zA-Z0-9_-]+\/)*$/, "Expected a static directory route");
  if (testTarget === "timeweb") {
    // A missing static file fails the test; no HTTP status or server build is simulated.
    return readFileSync(new URL(`../out/${pathname.slice(1)}index.html`, import.meta.url), "utf8");
  }
  const response = await fetchVinext(pathname);
  assert.equal(response.status, 200, pathname);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i, pathname);
  return response.text();
}

async function assertMissingRoute() {
  if (testTarget === "timeweb") {
    assert.equal(existsSync(new URL("../out/sveden/__missing__/index.html", import.meta.url)), false);
    const notFound = readFileSync(new URL("../out/404.html", import.meta.url), "utf8");
    assert.match(notFound, /<html\b/i, "The static 404 document must exist");
    return;
  }
  const response = await fetchVinext("/sveden/__missing__/");
  assert.equal(response.status, 404);
}


test("renders the production canonical and official IDN site", async () => {
  const html = await loadRenderedHtml("/");
  assert.doesNotMatch(html, developmentPreviewMeta);
  assert.match(html, productionCanonical);
  assert.match(html, officialSiteHref);
  assert.match(html, /центр-средств-защиты\.рф/u);
  assert.match(html, /<strong>162<\/strong> академических часа/u);
  assert.match(html, /14 часов теории и 2 часа практической учебной работы с письменным результатом с дистанционной проверкой/u);
  assert.equal(html.match(/class=["']curriculum-card["']/g)?.length, 10);
  assert.deepEqual([...html.matchAll(/class=["']curriculum-card["'][^>]*>\s*<span>(\d+)<\/span>/g)].map((match) => match[1]), ["01", "02", "03", "04", "05", "06", "07", "09", "10", "11"]);
  assertPreparedStatus(html);
  assert.match(html, /Деятельность по монтажу, техническому обслуживанию и ремонту\s+средств обеспечения пожарной безопасности зданий и сооружений/u);
});

test("renders the licensing-program structure and official canonical", async () => {
  const html = await loadRenderedHtml("/programmy/pozharnaya-bezopasnost/");
  assert.match(html, programCanonical);
  assert.match(html, officialSiteHref);
  assert.match(html, /Заочная; исключительно с применением электронного обучения и дистанционных образовательных технологий/u);
  assert.match(html, /Общепрофессиональный модуль/u);
  assert.match(html, /140 часов теории \+ 20 часов практических учебных работ \+ 2 часа итоговой аттестации/u);
  assert.match(html, /Итого: 162 часа/u);
  assert.match(html, /Модульный тест: не менее 4 верных ответов из 5/u);
  assert.ok(html.includes("Учебные материалы новой редакции размещены в СДО «СИНТАГМА»"), "Programme page must state that course materials are uploaded");
  assert.match(html, /Программа повышения квалификации/u);
  assert.match(html, /<dt>Вид образования<\/dt><dd>Дополнительное образование<\/dd>/u);
  assert.match(html, /<dt>Подвид образования<\/dt><dd>Дополнительное профессиональное образование<\/dd>/u);
  assert.match(html, /<dt>Вид ДПП<\/dt><dd>Программа повышения квалификации<\/dd>/u);
  assert.match(html, /№ 1156/u);
  assert.doesNotMatch(html, /№1156/u);
  assert.doesNotMatch(html, /NO-GO/u);
  assert.match(html, /Итоговый тест: не менее 9 из 12/u);
  assert.match(html, /Профессиональный модуль о противопожарных занавесах и завесах в программу не включён/u);
  assert.doesNotMatch(html, /30\.07\.2026 № 2-ОД/u);
  assert.match(html, /21 учебный день; 5 учебных недель: 40, 40, 40, 40 и 2 академических часа/u);
  assert.match(html, /Тест — 30 минут и письменная работа — 60 минут; всего 2 академических часа/u);
  assert.equal(html.match(/class=["']plan-row["']/g)?.length, 11);
  for (const title of expectedModuleTitles) assert.ok(html.includes(title), title);
  assert.ok(html.includes('href="/documents/program-162h-20261008/dpp-162h-20261008.pdf"'));
  assert.ok(html.includes('download="dpp-162h-20261008.pdf"'));
  assert.ok(html.includes('href="/documents/program-162h-20261008/trainer-p3.html"'));
  assert.ok(html.includes('download="trainer-p3.html"'));
  assert.doesNotMatch(html, /program-178h|№ 4-ОД|signed-copy/);
  assertPreparedStatus(html);
});

test("ships the current unified 162-hour programme PDF", () => {
  const current = readFileSync(new URL("../public/documents/program-162h-20261008/dpp-162h-20261008.pdf", import.meta.url));
  assert.equal(current.subarray(0, 5).toString("ascii"), "%PDF-");
  assert.ok(current.length > 10_000);
});

test("preserves the signed 178-hour archive without altering source documents", () => {
  const expected = {
    "dpp-178h-signed-received-20260917.pdf": [623080, "e80842ca4c5e78c98a299014d1fff58ed3ace90f8b0498e4ed33f5923f540f32"],
    "module-programs-178h-signed-received-20260917.pdf": [567414, "97656e33d1a3bb012297f58f5e6b7cd2c78544eac44cd2ff08d661f4d5be9e0b"],
    "assignments-178h-signed-received-20260917.pdf": [650635, "ccc8f4abdc8145937bf250ca001a28647e6f4b23cadb6dfe6f511ef20a9eb2b3"],
    "assessment-procedure-178h-signed-received-20260917.pdf": [420840, "b526eecc46a5a1a2ab06c2935f939a4b3764e221a807625085605b200633f8ef"],
  };
  for (const [file, [bytes, hash]] of Object.entries(expected)) {
    const data = readFileSync(new URL(`../public/documents/program-178h/${file}`, import.meta.url));
    assert.equal(data.length, bytes, file);
    assert.equal(sha256(data), hash, file);
  }

  const docx = readFileSync(new URL("../source/documents/proekty-docx/17-programma-povysheniya-kvalifikacii-178.docx", import.meta.url));
  assert.equal(docx.length, 64533);
  assert.equal(sha256(docx), "7d0a659ffbf0abbdfd14ce61ed4bd53e589b71e492d0ceba83129264a6d8aeeb");
});

test("keeps working documents out of the public education-information package", async () => {
  const html = await loadRenderedHtml("/sveden/");
  assert.match(html, /162 академических часа · 10 модулей/u);
  assert.match(html, /<dt>Вид образования<\/dt><dd>Дополнительное образование<\/dd>/u);
  assert.match(html, /<dt>Подвид образования<\/dt><dd>Дополнительное профессиональное образование<\/dd>/u);
  assert.match(html, /<dt>Вид ДПП<\/dt><dd>Программа повышения квалификации<\/dd>/u);
  assert.match(html, /№ 1156/u);
  assert.doesNotMatch(html, /№1156/u);
  assert.match(html, /[Пп]одписанный экземпляр/u);
  assert.doesNotMatch(html, /NO-GO|встречная подпись|01-dogovor-sintagma\.pdf/u);
  assert.doesNotMatch(html, /факсимил|проект назначения/iu);
  assert.match(html, /prikaz-3-od-signed-received-20260917\.pdf/u);
  const methodicalCard = html.match(/<h3>Методическое сопровождение<\/h3>([\s\S]*?)<h3>Преподаватели дисциплин программы<\/h3>/u)?.[1];
  assert.ok(methodicalCard, "Methodical support is kept separate from technical teachers");
  assert.match(methodicalCard, /В пункте 4 приказа[\s\S]*30\.07\.2026 № 2-ОД/u);
  assert.match(methodicalCard, /Кравченко Вероника Юрьевна/u);
  assert.match(methodicalCard, /Юриспруденция; юрист\./u);
  assert.match(methodicalCard, /76 часов[\s\S]*12\.10\.2018[\s\S]*240 часов[\s\S]*01\.03\.2024/u);
  assert.match(methodicalCard, /Должность в Учебном центре и назначение на конкретные дисциплины этими документами не устанавливаются\./u);
  assert.doesNotMatch(methodicalCard, /itemProp="(?:teachingStaff|post)"/u);
  const technicalStaff = html.match(/<dl[^>]*itemProp="teachingStaff"[^>]*>([\s\S]*?)<\/dl>/u)?.[1];
  assert.ok(technicalStaff, "Separate technical-teacher status remains present");
  assert.doesNotMatch(technicalStaff, /Кравченко Вероника Юрьевна|№ 2-ОД/iu);
  assert.match(html, /Кадровое обеспечение программы: сведения о назначении преподавателей конкретных дисциплин пока не подтверждены/u);
  assert.ok(html.includes("Учебные материалы новой редакции размещены в СДО"), "Sveden must state that course materials are uploaded");
  assertPreparedStatus(html);
  const archive = html.match(/<details(?=[^>]*id="program-archive")[^>]*>[\s\S]*?<\/details>/u)?.[0];
  assert.ok(archive, "Signed archive remains accessible");
  assert.match(archive, /прежняя программа на 178 часов/u);
  assert.match(archive, /prikaz-4-od-signed-received-20260917\.pdf/u);
  for (const file of ["dpp", "module-programs", "assignments", "assessment-procedure"]) {
    assert.ok(archive.includes(`/documents/program-178h/${file}-178h-signed-received-20260917.pdf`));
  }
  assert.ok(html.includes('href="/documents/program-162h-20261008/dpp-162h-20261008.pdf"'));
  const objects = html.slice(html.indexOf('id="objects"'), html.indexOf('id="grants"'));
  const grants = html.slice(html.indexOf('id="grants"'), html.indexOf('id="paid"'));
  assert.match(objects, /Общежитие/u);
  assert.match(objects, /Интернат/u);
  assert.match(objects, /значение 0 без документального основания не заявляется/u);
  assert.doesNotMatch(objects, /количество мест — 0/u);
  assert.doesNotMatch(grants, /общежит|интернат/iu);
  assert.doesNotMatch(html, /18 документов PDF|komplekt-utverzhdennyh-pdf\.zip/u);
  assert.doesNotMatch(html, /03-prikaz-2-OD-ob-utverzhdenii-programmy\.pdf|04-programma-178-chasov\.pdf|05-prikaz-3-OD-ob-utverzhdenii-lokalnyh-aktov\.pdf|18-svedeniya-o-mto-i-eios\.pdf/u);
  assert.match(html, /Кравченко Владимир Антонович — доля 50%; доля, принадлежащая обществу, — 50%/u);
  assert.match(html, /Для дистанционной реализации предусмотрена образовательная среда «СИНТАГМА»/u);
  assert.match(html, /Выписка из ЕГРЮЛ от 20\.08\.2026/u);
  assert.match(html, /\/documents\/egrul-csz-2026-08-20\.pdf/u);
  assert.doesNotMatch(html, /ul-1037728048819-20260722152711\.pdf/u);
  assert.doesNotMatch(html, /19-svedeniya-dlya-oficialnogo-sayta\.pdf/u);
  assert.equal(existsSync(new URL("../public/documents/proekty-docx", import.meta.url)), false);
  assert.equal(existsSync(new URL("../public/documents/program-34h", import.meta.url)), false);
  assert.equal(existsSync(new URL("../public/documents/komplekt-proektov-docx.zip", import.meta.url)), false);
  assert.equal(existsSync(new URL("../public/documents/komplekt-utverzhdennyh-pdf.zip", import.meta.url)), false);
  assert.equal(existsSync(new URL("../public/documents/utverzhdennye-pdf/03-prikaz-2-OD-ob-utverzhdenii-programmy.pdf", import.meta.url)), false);
  assert.equal(existsSync(new URL("../public/documents/utverzhdennye-pdf/04-programma-178-chasov.pdf", import.meta.url)), false);
  assert.equal(existsSync(new URL("../public/documents/utverzhdennye-pdf/05-prikaz-3-OD-ob-utverzhdenii-lokalnyh-aktov.pdf", import.meta.url)), false);
  assert.equal(existsSync(new URL("../public/documents/utverzhdennye-pdf/18-svedeniya-o-mto-i-eios.pdf", import.meta.url)), false);
  assert.equal(existsSync(new URL("../public/documents/utverzhdennye-pdf/19-svedeniya-dlya-oficialnogo-sayta.pdf", import.meta.url)), false);
  assert.equal(existsSync(new URL("../public/documents/ul-1037728048819-20260722152711.pdf", import.meta.url)), false);
  for (const file of [
    "06-polozhenie-ob-organizacii-dpo.pdf",
    "07-pravila-priema.pdf",
    "08-pravila-vnutrennego-rasporyadka.pdf",
    "09-polozhenie-o-rezhime-zanyatiy.pdf",
    "10-polozhenie-o-kontrole-i-attestacii.pdf",
    "11-poryadok-perevoda-otchisleniya.pdf",
    "12-poryadok-obrazovatelnyh-otnosheniy.pdf",
    "13-polozhenie-ob-elektronnom-obuchenii.pdf",
    "14-polozhenie-o-yazyke-obrazovaniya.pdf",
    "15-polozhenie-o-dokumentah-o-kvalifikacii.pdf",
    "16-polozhenie-o-platnyh-uslugah.pdf",
    "17-obrazec-dogovora-na-obuchenie.pdf",
  ]) {
    assert.equal(existsSync(new URL(`../public/documents/utverzhdennye-pdf/${file}`, import.meta.url)), false);
  }
  assert.equal(existsSync(new URL("../public/documents/egrul-csz-2026-08-20.pdf", import.meta.url)), true);
  assert.equal(existsSync(new URL("../public/documents/utverzhdennye-pdf/01-dogovor-sintagma.pdf", import.meta.url)), false);
});

test("renders all 14 v10 education-information subsection routes", async () => {
  const titles = new Set();
  const headings = new Set();
  const canonicals = new Set();

  for (const [id, slug, title] of expectedSvedenSections) {
    const html = await loadRenderedHtml(`/sveden/${slug}/`);
    const markup = visibleMarkup(html);
    const titleMatch = markup.match(/<title>([^<]+)<\/title>/u);
    const headingMatch = markup.match(/<h1>([^<]+)<\/h1>/u);
    const canonicalMatch = markup.match(/<link(?=[^>]*\brel=["']canonical["'])(?=[^>]*\bhref=["']([^"']+)["'])[^>]*>/u);
    assert.equal(titleMatch?.[1], `${title} — Центр средств защиты`, slug);
    assert.equal(headingMatch?.[1], title, slug);
    assert.equal(canonicalMatch?.[1], `https://xn-----8kcgjebtk6b7abmdihf9c1dzb.xn--p1ai/sveden/${slug}/`, slug);
    titles.add(titleMatch[1]);
    headings.add(headingMatch[1]);
    canonicals.add(canonicalMatch[1]);
    assert.match(markup, new RegExp(`<section class=["']info-section["'] id=["']${id}["']`), slug);
    assert.equal(markup.match(/class=["']info-section["']/g)?.length, 1, slug);
    assert.match(markup, new RegExp(`/sveden/${slug}/["']`), slug);
    assert.doesNotMatch(markup, /\bitcmprop\s*=|\bitemprop=["']copy["']/iu, slug);
    const itemProps = new Set(collectItemProps(markup));
    for (const itemProp of requiredRouteItemProps[slug]) {
      assert.ok(itemProps.has(itemProp), `${slug}: missing itemProp=${itemProp}`);
    }
    if (slug === "education") assert.ok(itemProps.has("accreditationDocLink"));
    else assert.ok(!itemProps.has("accreditationDocLink"), `${slug}: accreditationDocLink must be absent`);
    if (slug === "education") {
      const project = markup.match(/<article(?=[^>]*data-program-status=["']prepared-for-approval["'])[^>]*>[\s\S]*?<\/article>/u)?.[0];
      assert.ok(project, "education: prepared programme marker missing");
      assert.doesNotMatch(project, /\bitemProp=["'](?:eduAccred|eduOp|eduNir|graduateJob)["']/u);
    }
    assert.doesNotMatch(markup, /Общепрофессиональный модуль и все десять видов работ/u, slug);
    assertCleanSubsection(html);
  }

  assert.equal(titles.size, expectedSvedenSections.length);
  assert.equal(headings.size, expectedSvedenSections.length);
  assert.equal(canonicals.size, expectedSvedenSections.length);

  await assertMissingRoute();
});

const expectedSvedenSections = [
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

const requiredRouteItemProps = {
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

const expectedModuleTitles = [
  "Общепрофессиональный модуль",
  "Монтаж, техническое обслуживание и ремонт систем пожаротушения и их элементов, включая диспетчеризацию и проведение пусконаладочных работ",
  "Монтаж, техническое обслуживание и ремонт систем пожарной и охранно-пожарной сигнализации и их элементов, включая диспетчеризацию и проведение пусконаладочных работ",
  "Монтаж, техническое обслуживание и ремонт систем противопожарного водоснабжения и их элементов, включая диспетчеризацию и проведение пусконаладочных работ",
  "Монтаж, техническое обслуживание и ремонт автоматических систем (элементов автоматических систем) противодымной вентиляции, включая диспетчеризацию и проведение пусконаладочных работ",
  "Монтаж, техническое обслуживание и ремонт систем оповещения и эвакуации при пожаре и их элементов, включая диспетчеризацию и проведение пусконаладочных работ, в том числе фотолюминесцентных эвакуационных систем и их элементов",
  "Монтаж, техническое обслуживание и ремонт автоматических систем (элементов автоматических систем) передачи извещений о пожаре, включая диспетчеризацию и проведение пусконаладочных работ",
  "Монтаж, техническое обслуживание и ремонт заполнений проемов в противопожарных преградах",
  "Выполнение работ по огнезащите материалов, изделий и конструкций",
  "Монтаж, техническое обслуживание и ремонт первичных средств пожаротушения"
];

function assertPreparedStatus(html) {
  assert.match(html, /[Пп]одготовлена на утверждение/u);
  assert.match(html, /набор закрыт до получения образовательной лицензии|Приём и обучение до получения образовательной лицензии не проводятся|До получения лицензии образовательная деятельность не осуществляется/iu);
  assert.doesNotMatch(html, /35 уроков|67 вопросов|8 учебных элементов|модуля 8|модуле 8/u);
  assert.doesNotMatch(html, /примерная программа|28-ФЗ|ГОЧС|Институт Гипноза|Пыжив/iu);
}

function assertCleanSubsection(html) {
  assert.doesNotMatch(html, /35 уроков|67 вопросов|8 учебных элементов|модуля 8|модуле 8/u);
  assert.doesNotMatch(html, /примерная программа|28-ФЗ|ГОЧС|Институт Гипноза|Пыжив/iu);
}

function visibleMarkup(document) {
  const marker = document.indexOf("<script>self.__next_f.push");
  return marker === -1 ? document : document.slice(0, marker);
}

function collectItemProps(markup) {
  return [...markup.matchAll(/\bitemprop=["']([^"']+)["']/giu)]
    .flatMap((match) => match[1].trim().split(/\s+/u));
}
