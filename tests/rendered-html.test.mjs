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
  assert.match(html, /Общие вопросы организации обучения/u);
  assert.match(html, /Программа утверждена приказом генерального директора от 30\.07\.2026 № 2-ОД/u);
  assert.doesNotMatch(html, /Проект учебного плана|рабочая версия программы/u);
  assert.match(html, /5 учебных недель по типовому календарному графику/u);
  assert.match(html, /Комплексный экзамен, 2 академических часа/u);
  assert.equal(html.match(/class=["']plan-row["']/g)?.length, 16);
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
  assert.match(html, /18 документов PDF/u);
  assert.match(html, /Кравченко Владимир Антонович — доля 50%; доля, принадлежащая обществу, — 50%/u);
  assert.match(html, /href=["']https:\/\/синтагма\.рф\/["']/u);
  assert.doesNotMatch(html, /19-svedeniya-dlya-oficialnogo-sayta\.pdf/u);
  assert.equal(existsSync(new URL("../public/documents/proekty-docx", import.meta.url)), false);
  assert.equal(existsSync(new URL("../public/documents/utverzhdennye-pdf/19-svedeniya-dlya-oficialnogo-sayta.pdf", import.meta.url)), false);
});
