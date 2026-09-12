import type { Metadata } from "next";
import Link from "next/link";
import BrandEmblem from "../../brand-emblem";
import ProgramDownloads from "../../program-downloads";
import { module8Notice, programModules } from "../../program-data";

export const metadata: Metadata = {
  title: "Повышение квалификации по пожарной безопасности — проект 178 часов",
  description: "Проект ДПП повышения квалификации: монтаж, техническое обслуживание и ремонт средств обеспечения пожарной безопасности. 178 часов, 11 модулей, исключительно ЭО/ДОТ. Программа не утверждена; набор закрыт до лицензии.",
  alternates: {
    canonical: "/programmy/pozharnaya-bezopasnost/",
  },
};

const plan = [
  ...programModules.map((title, index) => [String(index + 1), title, "14", "2", "16"]),
  ["—", "Итоговая аттестация: комплексный экзамен", "—", "—", "2"],
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
          <p><strong>Выбранные виды работ:</strong> все десять профессиональных модулей приложения 3 к приказу МЧС России от 15.11.2022 № 1156. Общепрофессиональный модуль обязателен.</p>
          <p>Работники соискателей лицензии или лицензиатов — специалисты, осуществляющие включённые в программу виды работ.</p>
          <div className="page-download">
            <a href="/documents/program-178h/dpp-178h-for-approval-20260913.pdf" download="dpp-178h-for-approval-20260913.pdf">Скачать программу 178 часов (PDF, для утверждения)</a>
            <a href="/programmy/pozharnaya-bezopasnost/" download="proekt-programmy-csz.html">Скачать описание и учебный план (HTML)</a>
            <span>Текст и таблицы проекта доступны для поиска и копирования. Это не утверждённая программа.</span>
          </div>
        </div>
        <dl>
          <div><dt>Вид образования</dt><dd>Дополнительное образование</dd></div>
          <div><dt>Подвид образования</dt><dd>Дополнительное профессиональное образование</dd></div>
          <div><dt>Вид ДПП</dt><dd>Программа повышения квалификации</dd></div>
          <div><dt>Объём</dt><dd>178 академических часов</dd></div>
          <div><dt>Форма</dt><dd>Заочная; исключительно с применением электронного обучения и дистанционных образовательных технологий</dd></div>
          <div><dt>Срок освоения</dt><dd>5 учебных недель по календарному графику проекта</dd></div>
          <div><dt>Итоговая аттестация</dt><dd>Комплексный экзамен, 2 академических часа</dd></div>
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
          <p>Совершенствование и получение компетенций для монтажа, технического обслуживания и ремонта средств обеспечения пожарной безопасности в рамках имеющейся квалификации.</p>
        </aside>
        <div>
          <p className="eyebrow">Целевая структура проекта учебного плана</p>
          <h2>Структура программы</h2>
          <div className="plan-table" role="table" aria-label="Учебный план" tabIndex={0}>
            <div className="plan-head" role="row"><span role="columnheader">№</span><span role="columnheader">Модуль</span><span role="columnheader">Теория</span><span role="columnheader">Практические работы</span><span role="columnheader">Всего</span></div>
            {plan.map((row) => <div className="plan-row" role="row" key={row[0]}><span role="cell">{row[0]}</span><span role="cell">{row[1]}</span><strong role="cell">{row[2]}</strong><strong role="cell">{row[3]}</strong><strong role="cell">{row[4]}</strong></div>)}
            <div className="plan-total"><span>154 часа теории + 22 часа практических работ + 2 часа итоговой аттестации</span><strong>Итого: 178 часов</strong></div>
          </div>
          <div className="legal-note"><strong>Проект реализации в ЭИОС</strong><p>Каждый из 11 модулей включает 14 часов теории и 2 часа самостоятельной практической работы в моделируемой профессиональной ситуации. Задания выполняются дистанционно и проверяются преподавателем. Практические результаты сохраняются; эта работа не сводится к чтению лекций.</p><p>Промежуточная аттестация проводится по каждому из 11 модулей и входит в их нагрузку. Итоговая аттестация — комплексный экзамен продолжительностью 2 часа — оценивает теоретическую и практическую подготовленность. До успешного завершения промежуточной аттестации слушатель к экзамену не допускается.</p></div>
          <div className="legal-note"><strong>Условия модуля 8 уточняются</strong><p>{module8Notice}</p></div>
          <div className="legal-note"><strong>Статус программы и курса</strong><p>Программа не утверждена. Учебные документы представлены ниже для утверждения. Подписанная утверждённая редакция пока не опубликована. Курс на 178 часов и электронная библиотека на платформе «Синтагма» проходят подготовку и проверку. Доступ к обучению пока не открыт; набор закрыт до получения образовательной лицензии.</p></div>
          <ProgramDownloads />
        </div>
      </section>
    </main>
  );
}
