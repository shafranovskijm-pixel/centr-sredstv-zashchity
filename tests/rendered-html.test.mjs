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

test("renders the production canonical and official IDN site", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  const html = await response.text();
  assert.doesNotMatch(html, developmentPreviewMeta);
  assert.match(html, productionCanonical);
  assert.match(html, officialSiteHref);
  assert.match(html, /центр-средств-защиты\.рф/u);
  assert.match(html, /<strong>178<\/strong> академических часов/u);
  assert.match(html, /14 часов теории и 2 часа самостоятельного документарного ситуационного задания/u);
  assert.match(html, /14 часов теории и 2 часа синхронного дистанционного наблюдения реального объекта с индивидуальным отчётом/u);
  assertSignedStatus(html);
  assert.match(html, /Деятельность по монтажу, техническому обслуживанию и ремонту\s+средств обеспечения пожарной безопасности зданий и сооружений/u);
});

test("renders the licensing-program structure and official canonical", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-program`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request("http://localhost/programmy/pozharnaya-bezopasnost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, programCanonical);
  assert.match(html, officialSiteHref);
  assert.match(html, /Заочная; исключительно с применением электронного обучения и дистанционных образовательных технологий/u);
  assert.match(html, /Общепрофессиональный модуль/u);
  assert.match(html, /154 часа теории \+ 22 часа практических работ \+ 2 часа итоговой аттестации/u);
  assert.match(html, /Итого: 178 часов/u);
  assert.match(html, /Промежуточная аттестация проводится по каждому из 11 модулей/u);
  assert.match(html, /Курс на 178 часов и электронные учебные материалы на платформе «Синтагма» доступны проверяющему после входа в СДО/u);
  assert.match(html, /Программа повышения квалификации/u);
  assert.match(html, /<dt>Вид образования<\/dt><dd>Дополнительное образование<\/dd>/u);
  assert.match(html, /<dt>Подвид образования<\/dt><dd>Дополнительное профессиональное образование<\/dd>/u);
  assert.match(html, /<dt>Вид ДПП<\/dt><dd>Программа повышения квалификации<\/dd>/u);
  assert.match(html, /№ 1156/u);
  assert.doesNotMatch(html, /№1156/u);
  assert.doesNotMatch(html, /NO-GO/u);
  assert.match(html, /отдельное синхронное дистанционное практическое занятие продолжительностью 2 академических часа/u);
  assert.match(html, /Занятие проводится только при наличии объекта, права на его показ, ответственного лица, расписания и работающей синхронной связи/u);
  assert.doesNotMatch(html, /30\.07\.2026 № 2-ОД/u);
  assert.match(html, /5 учебных недель по календарному учебному графику/u);
  assert.match(html, /Комплексный экзамен, 2 академических часа/u);
  assert.equal(html.match(/class=["']plan-row["']/g)?.length, 12);
  for (const title of expectedModuleTitles) assert.ok(html.includes(title), title);
  assertSignedStatus(html);
});

test("ships the synchronized 178-hour programme files", () => {
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
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-sveden`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request("http://localhost/sveden/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /178 академических часов · 11 модулей/u);
  assert.match(html, /<dt>Вид образования<\/dt><dd>Дополнительное образование<\/dd>/u);
  assert.match(html, /<dt>Подвид образования<\/dt><dd>Дополнительное профессиональное образование<\/dd>/u);
  assert.match(html, /<dt>Вид ДПП<\/dt><dd>Программа повышения квалификации<\/dd>/u);
  assert.match(html, /№ 1156/u);
  assert.doesNotMatch(html, /№1156/u);
  assert.match(html, /[Пп]одписанный экземпляр/u);
  assert.doesNotMatch(html, /NO-GO|встречная подпись|01-dogovor-sintagma\.pdf/u);
  assert.doesNotMatch(html, /№ 2-ОД|факсимил/iu);
  assert.match(html, /prikaz-3-od-signed-received-20260917\.pdf/u);
  assert.doesNotMatch(html, /Кравченко Вероника Юрьевна|проект назначения/iu);
  assert.match(html, /Кадровое обеспечение программы и подтверждающие документы требуют оформления/u);
  assert.match(html, /Курс на 178 часов и электронные учебные материалы доступны проверяющему после входа в СДО/u);
  assertSignedStatus(html);
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
  assert.match(html, /Для подготовки к обучению используется электронная образовательная среда «Синтагма»/u);
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
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-sveden-subsections`);
  const { default: worker } = await import(workerUrl.href);
  const titles = new Set();
  const headings = new Set();
  const canonicals = new Set();

  for (const [id, slug, title] of expectedSvedenSections) {
    const response = await worker.fetch(
      new Request(`http://localhost/sveden/${slug}/`, {
        headers: { accept: "text/html" },
      }),
      {
        ASSETS: {
          fetch: async () => new Response("Not found", { status: 404 }),
        },
      },
      {
        waitUntil() {},
        passThroughOnException() {},
      },
    );

    assert.equal(response.status, 200, slug);
    const html = await response.text();
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
      const project = markup.match(/<article(?=[^>]*data-program-status=["']signed-copy["'])[^>]*>[\s\S]*?<\/article>/u)?.[0];
      assert.ok(project, "education: signed copy marker missing");
      assert.doesNotMatch(project, /\bitemProp=["'](?:eduAccred|eduOp|eduNir|graduateJob)["']/u);
    }
    assert.doesNotMatch(markup, /Общепрофессиональный модуль и все десять видов работ/u, slug);
    assertSignedStatusOrCleanSubsection(html);
  }

  assert.equal(titles.size, expectedSvedenSections.length);
  assert.equal(headings.size, expectedSvedenSections.length);
  assert.equal(canonicals.size, expectedSvedenSections.length);

  const missingResponse = await worker.fetch(
    new Request("http://localhost/sveden/__missing__/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
  assert.equal(missingResponse.status, 404);
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
  "Монтаж, техническое обслуживание и ремонт противопожарных занавесов и завес, включая диспетчеризацию и проведение пусконаладочных работ",
  "Монтаж, техническое обслуживание и ремонт заполнений проемов в противопожарных преградах",
  "Выполнение работ по огнезащите материалов, изделий и конструкций",
  "Монтаж, техническое обслуживание и ремонт первичных средств пожаротушения"
];

function assertSignedStatus(html) {
  assert.match(html, /[Пп]одписанный экземпляр/u);
  assert.match(html, /набор закрыт до получения образовательной лицензии/iu);
  assert.doesNotMatch(html, /34(?:<\/strong>)?[^<]{0,25}(?:академических|час)|program-34h|35 уроков|67 вопросов|8 учебных элементов|22 вопроса/u);
  assert.doesNotMatch(html, /примерная программа|28-ФЗ|ГОЧС|Институт Гипноза|Пыжив/iu);
}

function assertSignedStatusOrCleanSubsection(html) {
  assert.doesNotMatch(html, /34(?:<\/strong>)?[^<]{0,25}(?:академических|час)|program-34h|35 уроков|67 вопросов|8 учебных элементов|22 вопроса/u);
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
