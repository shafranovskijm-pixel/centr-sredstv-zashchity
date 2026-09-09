import type { Metadata } from "next";
import Link from "next/link";
import BrandEmblem from "../../brand-emblem";
import ProgramDownloads from "../../program-downloads";

export const metadata: Metadata = {
  title: "Повышение квалификации по пожарной безопасности — 34 часа",
  description: "Проект программы повышения квалификации по монтажу, техническому обслуживанию и ремонту первичных средств пожаротушения, 34 академических часа.",
  alternates: {
    canonical: "/programmy/pozharnaya-bezopasnost/",
  },
};

const plan = [
  ["1", "Общепрофессиональный модуль (модуль 1 Типовой программы)", "14", "2", "16"],
  ["2", "Монтаж, техническое обслуживание и ремонт первичных средств пожаротушения (модуль 11 Типовой программы)", "14", "2", "16"],
  ["—", "Итоговая аттестация: тест и комплексная письменная работа", "—", "—", "2"],
];

export default function ProgramPage() {
  return (
    <main className="internal-page">
      <a className="skip-link" href="#program-plan">Перейти к учебному плану</a>
      <input className="vision-checkbox" type="checkbox" id="vision-toggle" />
      <header className="internal-header">
        <Link className="internal-brand" href="/">
          <BrandEmblem />
          <strong>Центр средств защиты</strong>
        </Link>
        <nav aria-label="Навигация по сайту"><Link href="/">Главная</Link><Link aria-current="page" href="/programmy/pozharnaya-bezopasnost">Программа</Link><Link href="/sveden">Сведения об организации</Link></nav>
        <a className="internal-phone" href="tel:+74953363555">+7 495 336-35-55</a>
        <label className="vision-toggle" htmlFor="vision-toggle">◉ Версия для слабовидящих</label>
      </header>
      <div className="breadcrumb"><Link href="/">Главная</Link><span>/</span><span>Программы</span><span>/</span><span>Пожарная безопасность</span></div>
      <section className="program-hero">
        <div>
          <p className="eyebrow">Проект программы повышения квалификации</p>
          <h1>Деятельность по монтажу, техническому обслуживанию и ремонту средств обеспечения пожарной безопасности зданий и сооружений</h1>
          <p><strong>Выбранный вид работ:</strong> монтаж, техническое обслуживание и ремонт первичных средств пожаротушения.</p>
          <p>Работники соискателей лицензии или лицензиатов — специалисты, осуществляющие выбранный вид работ.</p>
          <div className="page-download">
            <a href="/documents/program-34h/dpp-34h-for-approval-20260909.pdf" download="dpp-34h-for-approval-20260909.pdf">Скачать программу 34 часа (PDF, для утверждения)</a>
            <a href="/programmy/pozharnaya-bezopasnost/" download="proekt-programmy-csz.html">Скачать описание и учебный план (HTML)</a>
            <span>Текст и таблицы проекта доступны для поиска и копирования. Это не утверждённая программа.</span>
          </div>
        </div>
        <dl>
          <div><dt>Объём</dt><dd>34 академических часа</dd></div>
          <div><dt>Форма</dt><dd>Заочная; исключительно с применением электронного обучения и дистанционных образовательных технологий</dd></div>
          <div><dt>Срок освоения</dt><dd>5 учебных дней по календарному графику проекта</dd></div>
          <div><dt>Итоговая аттестация</dt><dd>Тест и комплексная письменная работа, 2 академических часа</dd></div>
          <div><dt>Результат</dt><dd>Удостоверение о повышении квалификации установленного организацией образца</dd></div>
          <div><dt>Набор</dt><dd>После получения образовательной лицензии</dd></div>
          <div><dt>Официальный сайт</dt><dd><a href="https://xn-----8kcgjebtk6b7abmdihf9c1dzb.xn--p1ai">центр-средств-защиты.рф</a></dd></div>
        </dl>
      </section>

      <section className="program-body" id="program-plan">
        <aside>
          <strong>К обучению допускаются</strong>
          <p>Лица, имеющие или получающие среднее профессиональное и (или) высшее образование.</p>
          <strong>Цель программы</strong>
          <p>Совершенствование компетенций для организации и выполнения работ по монтажу, техническому обслуживанию и ремонту первичных средств пожаротушения.</p>
        </aside>
        <div>
          <p className="eyebrow">Целевая структура проекта учебного плана</p>
          <h2>Структура программы</h2>
          <div className="plan-table" role="table" aria-label="Учебный план" tabIndex={0}>
            <div className="plan-head" role="row"><span role="columnheader">№</span><span role="columnheader">Модуль</span><span role="columnheader">Теория</span><span role="columnheader">Самостоятельные задания</span><span role="columnheader">Всего</span></div>
            {plan.map((row) => <div className="plan-row" role="row" key={row[0]}><span role="cell">{row[0]}</span><span role="cell">{row[1]}</span><strong role="cell">{row[2]}</strong><strong role="cell">{row[3]}</strong><strong role="cell">{row[4]}</strong></div>)}
            <div className="plan-total"><span>28 часов теории + 4 часа самостоятельных профессиональных заданий + 2 часа итоговой аттестации</span><strong>Итого: 34 часа</strong></div>
          </div>
          <div className="legal-note"><strong>Проект реализации в ЭИОС</strong><p>Проект предусматривает 8 учебных элементов: 2 лекционных материала, 2 самостоятельных задания, 2 модульных теста, итоговый тест и комплексную письменную работу. В трёх тестах предусмотрены 22 вопроса: 5 в каждом модульном тесте и 12 в итоговом.</p><p>Каждый из двух модулей включает 14 часов теории и 2 часа самостоятельного профессионального задания. Модульный тест входит в теоретическую нагрузку и не добавляет часов. Итоговая аттестация — тест и комплексная письменная работа — проводится отдельно в объёме 2 часов.</p><p>Самостоятельные задания выполняются дистанционно в письменной форме, без выездов и физических действий с оборудованием. Эти 4 часа соответствуют практической нагрузке выбранных модулей Типовой программы. Контроль включает модульные тесты и проверку самостоятельных работ преподавателем.</p></div>
          <div className="legal-note"><strong>Статус программы и курса</strong><p>Полный текст программы и учебные документы доступны ниже для утверждения. Подписанная утверждённая редакция пока не опубликована. Курс и электронная библиотека на платформе «Синтагма» созданы; полный учебный сценарий проходит проверку, доступ к обучению пока не открыт. До получения образовательной лицензии реализация программы не начинается.</p></div>
          <ProgramDownloads />
        </div>
      </section>
    </main>
  );
}
