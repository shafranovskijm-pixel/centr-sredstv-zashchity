import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import test from "node:test";

const developmentPreviewMeta =
  /<meta(?=[^>]*\bname=["']codex-preview["'])(?=[^>]*\bcontent=["']development["'])[^>]*>/i;
const productionCanonical =
  /<link(?=[^>]*\brel=["']canonical["'])(?=[^>]*\bhref=["']https:\/\/xn-----8kcgjebtk6b7abmdihf9c1dzb\.xn--p1ai\/["'])[^>]*>/i;
const officialSiteHref =
  /href=["']https:\/\/xn-----8kcgjebtk6b7abmdihf9c1dzb\.xn--p1ai["']/i;
const programCanonical =
  /<link(?=[^>]*\brel=["']canonical["'])(?=[^>]*\bhref=["']https:\/\/xn-----8kcgjebtk6b7abmdihf9c1dzb\.xn--p1ai\/programmy\/pozharnaya-bezopasnost\/["'])[^>]*>/i;

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
  assertProjectStatus(html);
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
  assert.match(html, /Курс на 178 часов и электронная библиотека на платформе «Синтагма» проходят подготовку и проверку/u);
  assert.match(html, /Проект программы повышения квалификации/u);
  assert.doesNotMatch(html, /NO-GO/u);
  assert.match(html, /дистанционное документированное наблюдение по видео и технической документации/u);
  assert.match(html, /допустимость предлагаемого способа выполнения этого содержания ещё требует подтверждения/u);
  assert.doesNotMatch(html, /30\.07\.2026 № 2-ОД/u);
  assert.match(html, /5 учебных недель по календарному графику проекта/u);
  assert.match(html, /Комплексный экзамен, 2 академических часа/u);
  assert.equal(html.match(/class=["']plan-row["']/g)?.length, 12);
  for (const title of expectedModuleTitles) assert.ok(html.includes(title), title);
  assertProjectStatus(html);
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
  assert.match(html, /Программа не утверждена; подписанная редакция пока не опубликована/u);
  assert.doesNotMatch(html, /NO-GO|встречная подпись|01-dogovor-sintagma\.pdf/u);
  assert.doesNotMatch(html, /№ 2-ОД|№ 3-ОД|факсимил/iu);
  assert.doesNotMatch(html, /Кравченко Вероника Юрьевна|проект назначения/iu);
  assert.match(html, /Сведения о преподавателях и их квалификации будут размещены после оформления кадровых документов/u);
  assert.match(html, /Курс на 178 часов и электронная библиотека проходят подготовку и проверку/u);
  assertProjectStatus(html);
  const objects = html.slice(html.indexOf('id="objects"'), html.indexOf('id="paid"'));
  const grants = html.slice(html.indexOf('id="grants"'), html.indexOf('id="inter"'));
  assert.match(objects, /Общежитие/u);
  assert.match(objects, /Интернат/u);
  assert.match(objects, /количество мест — 0/u);
  assert.doesNotMatch(grants, /общежит|интернат/iu);
  assert.doesNotMatch(html, /18 документов PDF|komplekt-utverzhdennyh-pdf\.zip/u);
  assert.doesNotMatch(html, /03-prikaz-2-OD-ob-utverzhdenii-programmy\.pdf|04-programma-178-chasov\.pdf|05-prikaz-3-OD-ob-utverzhdenii-lokalnyh-aktov\.pdf|18-svedeniya-o-mto-i-eios\.pdf/u);
  assert.match(html, /Кравченко Владимир Антонович — доля 50%; доля, принадлежащая обществу, — 50%/u);
  assert.match(html, /Для обучения планируется использовать электронную образовательную среду «Синтагма»/u);
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

function assertProjectStatus(html) {
  assert.match(html, /[Пп]рограмма не утверждена/u);
  assert.match(html, /набор закрыт до получения образовательной лицензии/iu);
  assert.doesNotMatch(html, /34(?:<\/strong>)?[^<]{0,25}(?:академических|час)|program-34h|35 уроков|67 вопросов|8 учебных элементов|22 вопроса/u);
  assert.doesNotMatch(html, /примерная программа|28-ФЗ|ГОЧС|Институт Гипноза|Пыжив/iu);
}
