import type { Metadata } from "next";
import Link from "next/link";
import BrandEmblem from "../brand-emblem";

export const metadata: Metadata = {
  title: "Сведения об образовательной организации — Центр средств защиты",
  description: "Официальный раздел сведений об образовательной организации ООО «Центр средств защиты».",
  alternates: { canonical: "/sveden/" },
};

const sections = [
  { id: "common", number: "01", title: "Основные сведения" },
  { id: "struct", number: "02", title: "Структура и органы управления образовательной организацией" },
  { id: "document", number: "03", title: "Документы" },
  { id: "education", number: "04", title: "Образование" },
  { id: "managers", number: "05", title: "Руководство" },
  { id: "employees", number: "06", title: "Педагогический состав" },
  { id: "objects", number: "07", title: "Материально-техническое обеспечение и оснащённость образовательного процесса. Доступная среда" },
  { id: "paid", number: "08", title: "Платные образовательные услуги" },
  { id: "budget", number: "09", title: "Финансово-хозяйственная деятельность" },
  { id: "vacant", number: "10", title: "Вакантные места для приёма (перевода) обучающихся" },
  { id: "grants", number: "11", title: "Стипендии и меры поддержки обучающихся" },
  { id: "inter", number: "12", title: "Международное сотрудничество" },
  { id: "catering", number: "13", title: "Организация питания в образовательной организации" },
];

const documentGroups = [
  {
    title: "Организационные документы",
    documents: [
      ["Приказ № 1-ОД и Положение об Учебном центре", "02-prikaz-1-OD-i-polozhenie-uchebnogo-centra.pdf"],
    ],
  },
] as const;

function InternalHeader() {
  return (
    <>
      <input className="vision-checkbox" type="checkbox" id="vision-toggle" />
      <header className="internal-header">
        <Link className="internal-brand" href="/">
          <BrandEmblem />
          <strong>Центр средств защиты</strong>
        </Link>
        <nav aria-label="Навигация по сайту">
          <Link href="/">Главная</Link>
          <Link href="/programmy/pozharnaya-bezopasnost">Программа</Link>
          <Link aria-current="page" href="/sveden">Сведения об организации</Link>
        </nav>
        <a className="internal-phone" href="tel:+74953363555">+7 495 336-35-55</a>
        <label className="vision-toggle" htmlFor="vision-toggle">◉ Версия для слабовидящих</label>
      </header>
    </>
  );
}

function DraftNotice({ children }: { children: React.ReactNode }) {
  return <div className="draft-notice"><strong>Готовится к публикации</strong><p>{children}</p></div>;
}

export default function SvedenPage() {
  return (
    <main className="internal-page">
      <InternalHeader />
      <div className="breadcrumb"><Link href="/">Главная</Link><span>/</span><span>Сведения об образовательной организации</span></div>

      <section className="internal-hero">
        <p className="eyebrow">Официальный раздел</p>
        <h1>Сведения об образовательной организации</h1>
        <p>
          Структура раздела подготовлена с учётом требований Рособрнадзора. До получения
          лицензии образовательная деятельность и приём обучающихся не осуществляются.
        </p>
      </section>

      <div className="sveden-layout">
        <aside className="sveden-nav" aria-label="Подразделы сведений">
          <strong>Подразделы</strong>
          {sections.map((section) => <a key={section.id} href={`#${section.id}`}><span>{section.number}</span>{section.title}</a>)}
        </aside>

        <div className="sveden-content">
          <section className="info-section" id="common" itemScope itemType="https://schema.org/EducationalOrganization">
            <div className="info-heading"><span>01</span><h2>Основные сведения</h2></div>
            <dl className="info-table">
              <div><dt>Полное наименование</dt><dd itemProp="name">Общество с ограниченной ответственностью «Центр средств защиты»</dd></div>
              <div><dt>Сокращённое наименование</dt><dd>ООО «Центр средств защиты»</dd></div>
              <div><dt>Дата создания</dt><dd>9 октября 2003 года</dd></div>
              <div><dt>Руководитель</dt><dd>Генеральный директор Баранов Олег Павлович</dd></div>
              <div><dt>Участники</dt><dd>Кравченко Владимир Антонович — доля 50%; доля, принадлежащая обществу, — 50%</dd></div>
              <div><dt>ИНН / КПП / ОГРН</dt><dd>7728302867 / 772801001 / 1037728048819</dd></div>
              <div><dt>Место нахождения</dt><dd itemProp="address">117279, г. Москва, вн. тер. г. муниципальный округ Коньково, ул. Профсоюзная, д. 93А, помещ. 1/Ц</dd></div>
              <div><dt>Телефон</dt><dd><a href="tel:+74953363555">+7 495 336-35-55</a></dd></div>
              <div><dt>Дополнительные телефоны</dt><dd><a href="tel:+79933363555">+7 993 336-35-55</a><br /><a href="tel:+79933364555">+7 993 336-45-55</a></dd></div>
              <div><dt>Электронная почта</dt><dd><a href="mailto:CSZDPO@YA.RU">CSZDPO@YA.RU</a></dd></div>
              <div><dt>Официальный сайт</dt><dd><a href="https://xn-----8kcgjebtk6b7abmdihf9c1dzb.xn--p1ai">центр-средств-защиты.рф</a></dd></div>
              <div><dt>Уставный капитал</dt><dd>10 000 рублей</dd></div>
              <div><dt>Основной вид деятельности</dt><dd>ОКВЭД 71.12.12 — разработка проектов промышленных процессов и производств, включая системотехнику и технику безопасности</dd></div>
              <div><dt>Образовательные виды деятельности</dt><dd>ОКВЭД 85.41, 85.41.9, 85.42 и 85.42.9</dd></div>
              <div><dt>Сведения сверены</dt><dd>По выписке ЕГРЮЛ от 20 августа 2026 года № ЮЭ9965-26-159179567</dd></div>
              <div><dt>Язык образования</dt><dd>Русский</dd></div>
            </dl>
            <p>Режим работы: понедельник–пятница, 09:00–18:00 по московскому времени. Образовательная деятельность планируется в заочной форме с применением исключительно электронного обучения и дистанционных образовательных технологий.</p>
          </section>

          <section className="info-section" id="struct">
            <div className="info-heading"><span>02</span><h2>Структура и органы управления образовательной организацией</h2></div>
            <p>Управление организацией осуществляет генеральный директор. Приказом от 30.07.2026 № 1-ОД создано специализированное структурное образовательное подразделение «Учебный центр». Функции его руководителя исполняет генеральный директор Баранов Олег Павлович. Филиалы отсутствуют.</p>
          </section>

          <section className="info-section" id="document">
            <div className="info-heading"><span>03</span><h2>Документы</h2></div>
            <div className="draft-notice"><strong>Обновление документов</strong><p>Учебно-методический комплект обновляется. Утверждённые редакции программы и связанных документов будут размещены после согласования. До получения лицензии образовательная деятельность не осуществляется.</p></div>
            <div className="download-pack">
              <div>
                <span>Программа повышения квалификации</span>
                <strong>178 часов · 11 модулей</strong>
                <p>Доступно описание проекта и учебного плана. Утверждённая редакция готовится к публикации.</p>
                <Link className="text-link" href="/programmy/pozharnaya-bezopasnost">Посмотреть проект учебного плана →</Link>
              </div>
            </div>
            <div className="document-list">
              <a className="egrul-download" href="/documents/egrul-csz-2026-08-20.pdf" download>
                <strong>Выписка из ЕГРЮЛ от 20.08.2026</strong>
                <span>PDF · 13 страниц · № ЮЭ9965-26-159179567 · сведения об организации по состоянию на 20 августа 2026 года</span>
              </a>
            </div>
            <div className="draft-document-groups">
              {documentGroups.map((group) => (
                <section className="draft-document-group" key={group.title}>
                  <h3>{group.title}</h3>
                  <div className="draft-document-list">
                    {group.documents.map(([title, file]) => (
                      <a key={file} href={`/documents/utverzhdennye-pdf/${file}`} download>
                        <span><strong>{title}</strong><small>PDF · версия для скачивания</small></span>
                        <b aria-hidden="true">↓</b>
                      </a>
                    ))}
                  </div>
                </section>
              ))}
            </div>
            <h3 className="official-documents-title">Статус официальных документов</h3>
            <div className="document-list">
              <div><strong>Устав организации</strong><span>Копия для размещения готовится</span></div>
              <div><strong>Локальные акты об образовательной деятельности</strong><span>Актуальные редакции готовятся к публикации</span></div>
              <div><strong>Образец договора на оказание платных образовательных услуг</strong><span>Актуальная редакция будет размещена до открытия набора</span></div>
              <div><strong>Правила внутреннего распорядка обучающихся</strong><span>Актуальная редакция готовится к публикации</span></div>
              <div><strong>Правила внутреннего трудового распорядка</strong><span>Копия для размещения готовится</span></div>
              <div><strong>Отчёт о результатах самообследования</strong><span>Образовательная деятельность ещё не начата; отчёт не опубликован</span></div>
              <div><strong>Предписания органов контроля</strong><span>Отсутствуют</span></div>
              <div><strong>Лицензия на образовательную деятельность</strong><span>Не получена. Организация готовится к лицензированию</span></div>
            </div>
          </section>

          <section className="info-section" id="education">
            <div className="info-heading"><span>04</span><h2>Образование</h2></div>
            <article className="program-record">
              <p className="eyebrow">Дополнительная профессиональная программа</p>
              <h3>«Деятельность по монтажу, техническому обслуживанию и ремонту средств обеспечения пожарной безопасности зданий и сооружений»</h3>
              <dl>
                <div><dt>Вид</dt><dd>Повышение квалификации</dd></div>
                <div><dt>Объём</dt><dd>178 академических часов</dd></div>
                <div><dt>Форма обучения</dt><dd>Заочная; с применением исключительно электронного обучения и дистанционных образовательных технологий</dd></div>
                <div><dt>Язык</dt><dd>Русский</dd></div>
              </dl>
              <a className="text-link" href="/programmy/pozharnaya-bezopasnost">Описание программы и учебный план →</a>
            </article>
            <p>Размещено описание проекта программы. Утверждённая редакция будет опубликована после согласования и проверки соответствующего электронного курса. До получения лицензии реализация программы не начинается.</p>
          </section>

          <section className="info-section" id="managers">
            <div className="info-heading"><span>05</span><h2>Руководство</h2></div>
            <dl className="person-card"><div><dt>Ф.И.О.</dt><dd>Баранов Олег Павлович</dd></div><div><dt>Должность</dt><dd>Генеральный директор</dd></div><div><dt>Телефон организации</dt><dd><a href="tel:+74953363555">+7 495 336-35-55</a></dd></div></dl>
          </section>

          <section className="info-section" id="employees">
            <div className="info-heading"><span>06</span><h2>Педагогический состав</h2></div>
            <DraftNotice>Сведения о преподавателях и их квалификации будут размещены после оформления кадровых документов, до начала обучения.</DraftNotice>
          </section>

          <section className="info-section" id="objects">
            <div className="info-heading"><span>07</span><h2>Материально-техническое обеспечение и оснащённость образовательного процесса. Доступная среда</h2></div>
            <p>Для обучения планируется использовать электронную образовательную среду «Синтагма». Учебный курс на 178 часов и электронная библиотека проходят подготовку и проверку; доступ к обучению пока не открыт.</p>
            <dl className="info-table"><div><dt>Общежитие</dt><dd>Не предоставляется; количество мест — 0; плата за проживание — не применимо.</dd></div><div><dt>Интернат</dt><dd>Не предоставляется; количество мест — 0; плата за проживание — не применимо.</dd></div></dl>
            <p>Специально оборудованные очные учебные помещения не используются, поскольку программа планируется исключительно с применением электронного обучения и дистанционных образовательных технологий.</p>
          </section>

          <section className="info-section" id="paid">
            <div className="info-heading"><span>08</span><h2>Платные образовательные услуги</h2></div>
            <p>Положение о платных образовательных услугах и образец договора подготовлены. Стоимость обучения будет утверждена отдельным приказом до открытия набора и заключения первого договора.</p>
          </section>

          <section className="info-section" id="budget">
            <div className="info-heading"><span>09</span><h2>Финансово-хозяйственная деятельность</h2></div>
            <p>Государственное или муниципальное задание отсутствует. Образовательная деятельность планируется за счёт средств физических и юридических лиц по договорам об оказании платных образовательных услуг.</p>
          </section>

          <section className="info-section" id="vacant">
            <div className="info-heading"><span>10</span><h2>Вакантные места для приёма (перевода) обучающихся</h2></div>
            <p>До получения лицензии и открытия набора вакантные места отсутствуют.</p>
          </section>

          <section className="info-section" id="grants">
            <div className="info-heading"><span>11</span><h2>Стипендии и меры поддержки обучающихся</h2></div>
            <p>Стипендии и иные меры социальной поддержки обучающихся не предоставляются.</p>
          </section>

          <section className="info-section" id="inter">
            <div className="info-heading"><span>12</span><h2>Международное сотрудничество</h2></div>
            <p>Договоры с иностранными и международными организациями по вопросам образования и науки отсутствуют. Международная аккредитация образовательных программ отсутствует.</p>
          </section>

          <section className="info-section" id="catering">
            <div className="info-heading"><span>13</span><h2>Организация питания в образовательной организации</h2></div>
            <p>Питание обучающихся не организуется в связи с реализацией программы в заочной форме с применением исключительно электронного обучения и дистанционных образовательных технологий. Объекты питания и охраны здоровья отсутствуют.</p>
          </section>
        </div>
      </div>
    </main>
  );
}
