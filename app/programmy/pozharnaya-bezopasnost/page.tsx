import type { Metadata } from "next";
import Link from "next/link";
import BrandEmblem from "../../brand-emblem";

export const metadata: Metadata = {
  title: "Повышение квалификации по пожарной безопасности — 178 часов",
  description: "Программа повышения квалификации по монтажу, обслуживанию и ремонту средств обеспечения пожарной безопасности.",
};

const plan = [
  ["1", "Общие вопросы организации обучения", "3"],
  ["2", "Организационные основы обеспечения пожарной безопасности в Российской Федерации", "4"],
  ["3", "Пожары: классификация и опасные факторы", "4"],
  ["4", "Охрана труда, техника безопасности и охрана окружающей среды", "4"],
  ["5", "Промежуточная аттестация", "1"],
  ["6", "Системы пожаротушения, диспетчеризация и пусконаладочные работы", "16"],
  ["7", "Пожарная и охранно-пожарная сигнализация", "16"],
  ["8", "Противопожарное водоснабжение", "16"],
  ["9", "Автоматические системы противодымной вентиляции", "16"],
  ["10", "Системы оповещения и управления эвакуацией", "16"],
  ["11", "Системы передачи извещений о пожаре", "16"],
  ["12", "Противопожарные занавесы и завесы", "16"],
  ["13", "Заполнения проёмов в противопожарных преградах", "16"],
  ["14", "Огнезащита материалов, изделий и конструкций", "16"],
  ["15", "Первичные средства пожаротушения", "16"],
  ["16", "Итоговая аттестация", "2"],
];

export default function ProgramPage() {
  return (
    <main className="internal-page">
      <header className="internal-header">
        <Link className="internal-brand" href="/">
          <BrandEmblem />
          <strong>Центр средств защиты</strong>
        </Link>
        <nav aria-label="Навигация по сайту"><Link href="/">Главная</Link><Link aria-current="page" href="/programmy/pozharnaya-bezopasnost">Программа</Link><Link href="/sveden">Сведения об организации</Link></nav>
        <a className="internal-phone" href="tel:+74953363555">+7 495 336-35-55</a>
      </header>
      <div className="breadcrumb"><Link href="/">Главная</Link><span>/</span><span>Программы</span><span>/</span><span>Пожарная безопасность</span></div>
      <section className="program-hero">
        <div>
          <p className="eyebrow">Программа повышения квалификации</p>
          <h1>Деятельность по монтажу, техническому обслуживанию и ремонту средств обеспечения пожарной безопасности зданий и сооружений</h1>
          <p>Для работников соискателей лицензии и лицензиатов, выполняющих работы с системами противопожарной защиты.</p>
        </div>
        <dl>
          <div><dt>Объём</dt><dd>178 академических часов</dd></div>
          <div><dt>Форма</dt><dd>Заочная с применением ДОТ</dd></div>
          <div><dt>Результат</dt><dd>Удостоверение о повышении квалификации</dd></div>
          <div><dt>Набор</dt><dd>После получения образовательной лицензии</dd></div>
        </dl>
      </section>

      <section className="program-body">
        <aside>
          <strong>К обучению допускаются</strong>
          <p>Лица, имеющие или получающие среднее профессиональное и (или) высшее образование.</p>
          <strong>Цель программы</strong>
          <p>Совершенствование компетенций, необходимых для выполнения лицензируемых работ в области пожарной безопасности.</p>
        </aside>
        <div>
          <p className="eyebrow">Учебный план</p>
          <h2>Структура программы</h2>
          <div className="plan-table" role="table" aria-label="Учебный план">
            <div className="plan-head" role="row"><span role="columnheader">№</span><span role="columnheader">Раздел</span><span role="columnheader">Часы</span></div>
            {plan.map((row) => <div className="plan-row" role="row" key={row[0]}><span role="cell">{row[0]}</span><span role="cell">{row[1]}</span><strong role="cell">{row[2]}</strong></div>)}
            <div className="plan-total"><span>Итого</span><strong>178 часов</strong></div>
          </div>
          <div className="legal-note"><strong>Статус программы</strong><p>Программа утверждена приказом генерального директора от 30.07.2026 № 2-ОД. Реализация и набор начнутся только после предоставления образовательной лицензии.</p></div>
        </div>
      </section>
    </main>
  );
}
