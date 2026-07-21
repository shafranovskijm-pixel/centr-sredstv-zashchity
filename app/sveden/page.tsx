import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Сведения об образовательной организации — Центр средств защиты",
  description: "Официальный раздел сведений об образовательной организации ООО «Центр средств защиты».",
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

function InternalHeader() {
  return (
    <>
      <input className="vision-checkbox" type="checkbox" id="vision-toggle" />
      <header className="internal-header">
        <a className="internal-brand" href="/"><span>ЦСЗ</span><strong>Центр средств защиты</strong></a>
        <nav aria-label="Навигация по сайту">
          <a href="/">Главная</a>
          <a href="/programmy/pozharnaya-bezopasnost">Программа</a>
          <a aria-current="page" href="/sveden">Сведения об организации</a>
        </nav>
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
      <div className="breadcrumb"><a href="/">Главная</a><span>/</span><span>Сведения об образовательной организации</span></div>

      <section className="internal-hero">
        <p className="eyebrow">Официальный раздел</p>
        <h1>Сведения об образовательной организации</h1>
        <p>
          Структура раздела подготовлена с учётом требований Рособрнадзора. Сейчас сайт
          является рабочим проектом: сведения, которые требуют утверждённых документов
          или подтверждения заказчика, отмечены отдельно и не выдаются за действующие.
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
              <div><dt>ИНН / КПП / ОГРН</dt><dd>7728302867 / 772801001 / 1037728048819</dd></div>
              <div><dt>Язык образования</dt><dd>Русский</dd></div>
            </dl>
            <DraftNotice>Адрес места нахождения, адрес осуществления образовательной деятельности, режим работы, телефон и электронная почта будут внесены после сверки с клиентом и свежей выпиской ЕГРЮЛ.</DraftNotice>
          </section>

          <section className="info-section" id="struct">
            <div className="info-heading"><span>02</span><h2>Структура и органы управления образовательной организацией</h2></div>
            <p>Управление организацией осуществляет единоличный исполнительный орган — генеральный директор. Обособленные образовательные структурные подразделения и филиалы не заявлены.</p>
            <DraftNotice>Организационная структура и положение об образовательном подразделении будут опубликованы после утверждения локальных актов.</DraftNotice>
          </section>

          <section className="info-section" id="document">
            <div className="info-heading"><span>03</span><h2>Документы</h2></div>
            <div className="document-list">
              <div><strong>Устав организации</strong><span>Ожидается файл от заказчика</span></div>
              <div><strong>Правила внутреннего распорядка обучающихся</strong><span>Проект готовится</span></div>
              <div><strong>Правила внутреннего трудового распорядка</strong><span>Ожидается файл от заказчика</span></div>
              <div><strong>Отчёт о результатах самообследования</strong><span>Будет опубликован в установленный срок</span></div>
              <div><strong>Предписания органов контроля</strong><span>Отсутствуют</span></div>
              <div><strong>Лицензия на образовательную деятельность</strong><span>В процессе оформления</span></div>
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
                <div><dt>Форма обучения</dt><dd>Заочная, с применением электронного обучения и дистанционных образовательных технологий</dd></div>
                <div><dt>Язык</dt><dd>Русский</dd></div>
              </dl>
              <a className="text-link" href="/programmy/pozharnaya-bezopasnost">Описание программы и учебный план →</a>
            </article>
            <DraftNotice>Рабочая программа, календарный учебный график и методические материалы будут размещены после утверждения приказом руководителя.</DraftNotice>
          </section>

          <section className="info-section" id="managers">
            <div className="info-heading"><span>05</span><h2>Руководство</h2></div>
            <dl className="person-card"><div><dt>Ф.И.О.</dt><dd>Баранов Олег Павлович</dd></div><div><dt>Должность</dt><dd>Генеральный директор</dd></div><div><dt>Контакты</dt><dd>Будут внесены после подтверждения заказчиком</dd></div></dl>
          </section>

          <section className="info-section" id="employees">
            <div className="info-heading"><span>06</span><h2>Педагогический состав</h2></div>
            <DraftNotice>Персональный состав педагогических работников, сведения об образовании, квалификации, стаже и преподаваемых дисциплинах будут опубликованы после назначения преподавателей и проверки подтверждающих документов.</DraftNotice>
          </section>

          <section className="info-section" id="objects">
            <div className="info-heading"><span>07</span><h2>Материально-техническое обеспечение и оснащённость образовательного процесса. Доступная среда</h2></div>
            <p>Предусматривается использование электронной информационно-образовательной среды для размещения материалов, контроля освоения программы и взаимодействия со слушателями.</p>
            <DraftNotice>Точный перечень помещений, оборудования, средств обучения, электронных ресурсов и мер доступности будет перенесён сюда из справки о материально-техническом обеспечении после её подготовки и согласования.</DraftNotice>
          </section>

          <section className="info-section" id="paid">
            <div className="info-heading"><span>08</span><h2>Платные образовательные услуги</h2></div>
            <DraftNotice>Положение о платных образовательных услугах, форма договора, порядок оплаты и документ об утверждении стоимости будут опубликованы до начала приёма.</DraftNotice>
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
            <p>Стипендии, общежитие, интернат и иные меры социальной поддержки не предоставляются.</p>
          </section>

          <section className="info-section" id="inter">
            <div className="info-heading"><span>12</span><h2>Международное сотрудничество</h2></div>
            <p>Договоры с иностранными и международными организациями по вопросам образования и науки отсутствуют. Международная аккредитация образовательных программ отсутствует.</p>
          </section>

          <section className="info-section" id="catering">
            <div className="info-heading"><span>13</span><h2>Организация питания в образовательной организации</h2></div>
            <p>Питание обучающихся не организуется в связи с реализацией программы в заочной форме с применением дистанционных образовательных технологий. Объекты питания и охраны здоровья отсутствуют.</p>
          </section>
        </div>
      </div>
    </main>
  );
}
