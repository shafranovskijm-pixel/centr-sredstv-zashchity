import type { Metadata } from "next";
import Link from "next/link";
import BrandEmblem from "../../brand-emblem";
import ProgramDownloads from "../../program-downloads";
import { programDocumentUrl, programModules, sourceModuleNumbers, programStatus, remoteWorkNotice } from "../../program-data";

export const metadata: Metadata = {
  title: "Повышение квалификации по пожарной безопасности — 162 часа",
  description: "ДПП повышения квалификации: монтаж, техническое обслуживание и ремонт средств обеспечения пожарной безопасности. 162 часа, десять модулей, исключительно ЭО/ДОТ. Подготовлена на утверждение. Набор закрыт до получения образовательной лицензии.",
  alternates: {
    canonical: "/programmy/pozharnaya-bezopasnost/",
  },
};

const plan = [
  ...programModules.map((title, index) => [String(sourceModuleNumbers[index]), title, "14", "2", "16"]),
  ["—", "Итоговая аттестация: тест и письменная работа", "—", "—", "2"],
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
          <p className="eyebrow">Программа повышения квалификации</p>
          <h1>Деятельность по монтажу, техническому обслуживанию и ремонту средств обеспечения пожарной безопасности зданий и сооружений</h1>
          <p><strong>Выбранные виды работ:</strong> общепрофессиональный модуль 1 и девять профессиональных модулей 2–7, 9–11 приложения № 3 к приказу МЧС России от 15.11.2022 № 1156. Модуль о противопожарных занавесах и завесах исключён. Номера модулей сохранены по типовой основе.</p>
          <p>Работники соискателей лицензии или лицензиатов — специалисты, осуществляющие включённые в программу виды работ.</p>
          <div className="page-download">
            <a href={programDocumentUrl} download="dpp-162h-20261008.pdf">Скачать программу на 162 часа (PDF)</a>
            <a href="/programmy/pozharnaya-bezopasnost/" download="programma-csz.html">Скачать описание и учебный план (HTML)</a>
            <span>Подготовлена на утверждение. Единый PDF содержит программу, учебный план, график, рабочие программы модулей и оценочные материалы.</span>
          </div>
        </div>
        <dl>
          <div><dt>Вид образования</dt><dd>Дополнительное образование</dd></div>
          <div><dt>Подвид образования</dt><dd>Дополнительное профессиональное образование</dd></div>
          <div><dt>Вид ДПП</dt><dd>Программа повышения квалификации</dd></div>
          <div><dt>Объём</dt><dd>162 академических часа</dd></div>
          <div><dt>Форма</dt><dd>Заочная; исключительно с применением электронного обучения и дистанционных образовательных технологий</dd></div>
          <div><dt>Срок освоения</dt><dd>21 учебный день; 5 учебных недель: 40, 40, 40, 40 и 2 академических часа</dd></div>
          <div><dt>Итоговая аттестация</dt><dd>Тест — 30 минут и письменная работа — 60 минут; всего 2 академических часа</dd></div>
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
          <p className="eyebrow">Учебный план</p>
          <h2>Структура программы</h2>
          <div className="plan-table" role="table" aria-label="Учебный план" tabIndex={0}>
            <div className="plan-head" role="row"><span role="columnheader">№</span><span role="columnheader">Модуль</span><span role="columnheader">Теория</span><span role="columnheader">Практические работы</span><span role="columnheader">Всего</span></div>
            {plan.map((row) => <div className="plan-row" role="row" key={row[0]}><span role="cell">{row[0]}</span><span role="cell">{row[1]}</span><strong role="cell">{row[2]}</strong><strong role="cell">{row[3]}</strong><strong role="cell">{row[4]}</strong></div>)}
            <div className="plan-total"><span>140 часов теории + 20 часов практических учебных работ + 2 часа итоговой аттестации</span><strong>Итого: 162 часа</strong></div>
          </div>
          <div className="legal-note"><strong>Реализация в ЭИОС</strong><p>Каждый из десяти модулей включает 14 часов теории и 2 часа практической учебной работы с письменным результатом. Предусмотрены десять практических учебных работ, десять модульных тестов и итоговая аттестация. Учебный план и календарь связаны с конкретными материалами, заданиями и результатами в составе программы.</p><p>Модульный тест: не менее 4 верных ответов из 5. Итоговый тест: не менее 9 из 12. Для успешной итоговой аттестации также выполняются все критерии письменной работы: диагностика, решение, безопасность, обоснование и документация; критические ошибки исключают положительный результат.</p></div>
          <div className="legal-note"><strong>Дистанционная работа</strong><p>{remoteWorkNotice}</p></div>
          <div className="legal-note"><strong>Статус программы и курса</strong><p>{programStatus}. Учебные материалы новой редакции размещены в СДО «СИНТАГМА». Для работы с курсом и библиотекой используется индивидуальная учётная запись. Приём и обучение до получения образовательной лицензии не проводятся.</p></div>
          <ProgramDownloads />
        </div>
      </section>
    </main>
  );
}
