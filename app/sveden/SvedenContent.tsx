import Link from "next/link";
import BrandEmblem from "../brand-emblem";
import ProgramDownloads, { ArchivedProgramDownloads } from "../program-downloads";
import { remoteWorkNotice } from "../program-data";

export const svedenSections = [
  { id: "common", slug: "common", number: "01", title: "Основные сведения" },
  { id: "struct", slug: "struct", number: "02", title: "Структура и органы управления образовательной организацией" },
  { id: "document", slug: "document", number: "03", title: "Документы" },
  { id: "education", slug: "education", number: "04", title: "Образование" },
  { id: "eduStandarts", slug: "eduStandarts", number: "05", title: "Образовательные стандарты и требования" },
  { id: "managers", slug: "managers", number: "06", title: "Руководство" },
  { id: "employees", slug: "employees", number: "07", title: "Педагогический состав" },
  { id: "objects", slug: "objects", number: "08", title: "Материально-техническое обеспечение и оснащённость образовательного процесса. Доступная среда" },
  { id: "grants", slug: "grants", number: "09", title: "Стипендии и меры поддержки обучающихся" },
  { id: "paid", slug: "paid_edu", number: "10", title: "Платные образовательные услуги" },
  { id: "budget", slug: "budget", number: "11", title: "Финансово-хозяйственная деятельность" },
  { id: "vacant", slug: "vacant", number: "12", title: "Вакантные места для приёма (перевода) обучающихся" },
  { id: "inter", slug: "inter", number: "13", title: "Международное сотрудничество" },
  { id: "catering", slug: "catering", number: "14", title: "Организация питания в образовательной организации" },
] as const;

export type SvedenSectionId = (typeof svedenSections)[number]["id"];

const documentGroups = [
  {
    title: "Организационные документы",
    documents: [
      ["Приказ № 1-ОД от 30.07.2026 и Положение об Учебном центре", "prikaz-1-od-20260730-signed.pdf"],
      ["Приказ об утверждении локальных актов и образца договора — подписанный экземпляр (в документе: № 3-ОД от 31.07.2026)", "prikaz-3-od-signed-received-20260917.pdf"],
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

function LocalActStatus({ file, draft = false }: { file: string; draft?: boolean }) {
  return <span><a href={`/documents/local-acts/${file}`} download>{draft ? "Полный текст — проект для заполнения (PDF)" : "Полный текст — подписанный экземпляр (PDF)"}</a>{draft && <small>Подписанная окончательная редакция будет размещена после заполнения режима работы, дат выплаты заработной платы и сведений об учёте мнения работников.</small>}</span>;
}

export default function SvedenContent({ onlySection }: { onlySection?: SvedenSectionId }) {
  const activeSection = svedenSections.find((section) => section.id === onlySection);
  const sectionIsVisible = (id: SvedenSectionId) => !onlySection || onlySection === id;

  return (
    <main className="internal-page">
      <a className="skip-link" href={`#${onlySection ?? "common"}`}>Перейти к сведениям</a>
      <InternalHeader />
      <div className="breadcrumb"><Link href="/">Главная</Link><span>/</span><Link href="/sveden/">Сведения об образовательной организации</Link>{activeSection && <><span>/</span><span>{activeSection.title}</span></>}</div>

      <section className="internal-hero">
        <p className="eyebrow">Официальный раздел</p>
        <h1>{activeSection?.title ?? "Сведения об образовательной организации"}</h1>
        <p>
          Структура раздела подготовлена с учётом требований Рособрнадзора. До получения
          лицензии образовательная деятельность и приём обучающихся не осуществляются.
        </p>
        <div className="page-download">
          <a href="/sveden/" download="svedeniya-csz.html">Скачать текст и таблицы раздела (HTML)</a>
          <span>Поиск и копирование текста доступны в браузере. Приложения PDF скачиваются отдельно.</span>
        </div>
      </section>

      <div className="sveden-layout">
        <aside className="sveden-nav" aria-label="Подразделы сведений">
          <strong>Подразделы</strong>
          {svedenSections.map((section) => <Link aria-current={section.id === onlySection ? "page" : undefined} key={section.id} href={`/sveden/${section.slug}/`}><span>{section.number}</span>{section.title}</Link>)}
        </aside>

        <div className="sveden-content">
          {sectionIsVisible("common") && (
          <section className="info-section" id="common">
            <div className="info-heading"><span>01</span><h2>Основные сведения</h2></div>
            <dl className="info-table">
              <div><dt>Полное наименование</dt><dd itemProp="fullName">Общество с ограниченной ответственностью «Центр средств защиты»</dd></div>
              <div><dt>Сокращённое наименование</dt><dd itemProp="shortName">ООО «Центр средств защиты»</dd></div>
              <div><dt>Дата создания</dt><dd><time itemProp="regDate" dateTime="2003-10-09">9 октября 2003 года</time></dd></div>
              <div><dt>Руководитель</dt><dd>Генеральный директор Баранов Олег Павлович</dd></div>
              <div itemProp="uchredLaw"><dt>Учредители (участники)</dt><dd itemProp="nameUchred">Кравченко Владимир Антонович — доля 50%; доля, принадлежащая обществу, — 50%</dd></div>
              <div><dt>ИНН / КПП / ОГРН</dt><dd>7728302867 / 772801001 / 1037728048819</dd></div>
              <div><dt>Место нахождения</dt><dd itemProp="address">117279, г. Москва, вн. тер. г. муниципальный округ Коньково, ул. Профсоюзная, д. 93А, помещ. 1/Ц</dd></div>
              <div><dt>Режим и график работы</dt><dd itemProp="workTime">Требуют подтверждения руководителем перед окончательной публикацией.</dd></div>
              <div><dt>Телефон</dt><dd><a itemProp="telephone" href="tel:+74953363555">+7 495 336-35-55</a></dd></div>
              <div><dt>Дополнительные телефоны</dt><dd><a href="tel:+79933363555">+7 993 336-35-55</a><br /><a href="tel:+79933364555">+7 993 336-45-55</a></dd></div>
              <div><dt>Электронная почта</dt><dd><a itemProp="email" href="mailto:CSZDPO@YA.RU">CSZDPO@YA.RU</a></dd></div>
              <div><dt>Официальный сайт</dt><dd><a href="https://xn-----8kcgjebtk6b7abmdihf9c1dzb.xn--p1ai">центр-средств-защиты.рф</a></dd></div>
              <div><dt>Уставный капитал</dt><dd>10 000 рублей</dd></div>
              <div><dt>Основной вид деятельности</dt><dd>ОКВЭД 71.12.12 — разработка проектов промышленных процессов и производств, включая системотехнику и технику безопасности</dd></div>
              <div><dt>Образовательные виды деятельности</dt><dd>ОКВЭД 85.41, 85.41.9, 85.42 и 85.42.9</dd></div>
              <div><dt>Сведения сверены</dt><dd>По выписке ЕГРЮЛ от 20 августа 2026 года № ЮЭ9965-26-159179567</dd></div>
              <div><dt>Язык образования</dt><dd>Русский</dd></div>
              <div><dt>Лицензия на образовательную деятельность</dt><dd itemProp="licenseDocLink">Лицензия не предоставлена; выписка из реестра лицензий отсутствует</dd></div>
              <div><dt>Места осуществления образовательной деятельности при использовании сетевой формы</dt><dd itemProp="addressPlaceSet">Не применяется: сетевая форма реализации программы не предусмотрена.</dd></div>
              <div><dt>Места проведения практики</dt><dd itemProp="addressPlacePrac">В программе на 162 часа предусмотрены практические учебные работы с применением ЭО/ДОТ; выезд на объект и физические операции с оборудованием не предусмотрены.</dd></div>
              <div><dt>Места проведения практической подготовки</dt><dd itemProp="addressPlacePodg">Предусмотрены анализ документов и условных исходных данных с дистанционной проверкой. Занятия на реальном объекте в программу на 162 часа не включены.</dd></div>
              <div><dt>Места проведения государственной итоговой аттестации</dt><dd itemProp="addressPlaceGia">Не применяется: государственная итоговая аттестация по дополнительной профессиональной программе не проводится.</dd></div>
              <div><dt>Место осуществления дополнительного профессионального образования</dt><dd itemProp="addressPlaceDop">Образовательная деятельность по ДПП не осуществляется; место осуществления не определено до получения лицензии</dd></div>
              <div><dt>Места осуществления основных программ профессионального обучения</dt><dd itemProp="addressPlaceOppo">Не применяется: реализация основных программ профессионального обучения не заявлена.</dd></div>
            </dl>
            <p>Образовательная деятельность планируется в заочной форме с применением исключительно электронного обучения и дистанционных образовательных технологий.</p>
          </section>
          )}

          {sectionIsVisible("struct") && (
          <section className="info-section" id="struct">
            <div className="info-heading"><span>02</span><h2>Структура и органы управления образовательной организацией</h2></div>
            <dl className="info-table" itemProp="structOrgUprav">
              <div><dt>Наименование структурного подразделения</dt><dd itemProp="name">Специализированное структурное образовательное подразделение «Учебный центр»</dd></div>
              <div><dt>Руководитель</dt><dd itemProp="fio">Баранов Олег Павлович</dd></div>
              <div><dt>Должность руководителя</dt><dd itemProp="post">Генеральный директор; исполняет функции руководителя Учебного центра</dd></div>
              <div><dt>Место нахождения</dt><dd itemProp="addressStr">117279, г. Москва, вн. тер. г. муниципальный округ Коньково, ул. Профсоюзная, д. 93А, помещ. 1/Ц</dd></div>
              <div><dt>Электронная почта</dt><dd><a itemProp="email" href="mailto:CSZDPO@YA.RU">CSZDPO@YA.RU</a></dd></div>
              <div><dt>Сайт</dt><dd><a itemProp="site" href="https://xn-----8kcgjebtk6b7abmdihf9c1dzb.xn--p1ai">центр-средств-защиты.рф</a></dd></div>
              <div><dt>Положение о структурном подразделении</dt><dd><a className="text-link" itemProp="divisionClauseDocLink" href="/documents/organizational/prikaz-1-od-20260730-signed.pdf" download>Подписанный приказ о создании и Положение об Учебном центре (PDF)</a></dd></div>
            </dl>
            <p>Приказом от 30.07.2026 № 1-ОД создано специализированное структурное образовательное подразделение «Учебный центр».</p>
            <p itemProp="filInfo">По выписке ЕГРЮЛ от 20.08.2026 сведения о филиалах не отражены.</p>
            <p itemProp="repInfo">По выписке ЕГРЮЛ от 20.08.2026 сведения о представительствах не отражены.</p>
          </section>
          )}

          {sectionIsVisible("document") && (
          <section className="info-section" id="document">
            <div className="info-heading"><span>03</span><h2>Документы</h2></div>
            <div className="draft-notice"><strong>Статус учебных документов</strong><p>Новая программа на 162 часа подготовлена на утверждение. Единый документ размещён ниже; подписанные документы прежней программы на 178 часов сохранены в архиве. До получения лицензии образовательная деятельность не осуществляется.</p></div>
            <div className="download-pack">
              <div>
                <span>Программа повышения квалификации</span>
                <strong>162 академических часа · 10 модулей</strong>
                <p>Единый PDF содержит полный текст ДПП, учебный план, график, рабочие программы десяти модулей, оценочные и методические материалы. Подготовлена на утверждение; приём и обучение до получения лицензии не проводятся.</p>
                <a className="text-link" href="#program-files">Открыть и скачать документы →</a>
              </div>
            </div>
            <ProgramDownloads />
            <ArchivedProgramDownloads />
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
                      <a key={file} href={`/documents/organizational/${file}`} download>
                        <span><strong>{title}</strong><small>PDF · подписанный экземпляр</small></span>
                        <b aria-hidden="true">↓</b>
                      </a>
                    ))}
                  </div>
                </section>
              ))}
            </div>
            <p>Подписанные организационные документы и локальные акты сохранены с исходными реквизитами. Учебные документы прежней программы и её приказ доступны в архиве выше; они не утверждают новую программу на 162 часа.</p>
            <h3 className="official-documents-title">Статус официальных документов</h3>
            <p>Ниже доступны полные тексты восьми подписанных документов: семи локальных актов и образца договора. В них указан приказ № 3-ОД от 31.07.2026. Правила внутреннего трудового распорядка остаются проектом до заполнения фактических сведений.</p>
            <div className="document-list">
              <a className="egrul-download" itemProp="ustavDocLink" href="/documents/ustav-csz-public-20260907.pdf" download>
                <strong>Устав организации и изменения к нему</strong>
                <span>PDF · 21 страница · публичная копия; паспортные данные и домашние адреса скрыты</span>
              </a>
              <div itemProp="localActStud"><strong>Правила внутреннего распорядка обучающихся</strong><LocalActStatus file="student-rules-signed-received-20260917.pdf" /></div>
              <div itemProp="localActOrder"><strong>Правила внутреннего трудового распорядка</strong><LocalActStatus file="work-rules-for-approval-20260915.pdf" draft /></div>
              <div itemProp="priemDocLink"><strong>Правила приёма обучающихся</strong><LocalActStatus file="admission-rules-signed-received-20260917.pdf" /></div>
              <div itemProp="modeDocLink"><strong>Режим занятий обучающихся</strong><LocalActStatus file="class-schedule-rules-signed-received-20260917.pdf" /></div>
              <div itemProp="tekKontrolDocLink"><strong>Формы, периодичность и порядок текущего контроля и промежуточной аттестации</strong><LocalActStatus file="assessment-rules-signed-received-20260917.pdf" /></div>
              <div itemProp="perevodDocLink"><strong>Порядок и основания перевода, отчисления и восстановления обучающихся</strong><LocalActStatus file="transfer-expulsion-reinstatement-signed-received-20260917.pdf" /></div>
              <div itemProp="vozDocLink"><strong>Порядок оформления возникновения, приостановления и прекращения образовательных отношений</strong><LocalActStatus file="educational-relations-signed-received-20260917.pdf" /></div>
              <div><strong>Положение об оказании платных образовательных услуг</strong><LocalActStatus file="paid-education-rules-signed-received-20260917.pdf" /></div>
              <div itemProp="localActCollec"><strong>Коллективный договор</strong><span>Наличие или отсутствие требует подтверждения работодателя</span></div>
              <div itemProp="reportEduDocLink"><strong>Отчёт о результатах самообследования</strong><span>Электронный документ не размещён; статус и необходимость подготовки требуют подтверждения</span></div>
              <div itemProp="prescriptionDocLink"><strong>Предписания органов контроля</strong><span>Сведения уточняются перед публикацией окончательного комплекта документов</span></div>
              <div><strong>Образец договора на оказание платных образовательных услуг</strong><LocalActStatus file="education-contract-sample-signed-received-20260917.pdf" /></div>
              <div><strong>Лицензия на образовательную деятельность</strong><span>Не предоставлена; организация готовится к лицензированию</span></div>
            </div>
          </section>
          )}

          {sectionIsVisible("education") && (
          <section className="info-section" id="education">
            <div className="info-heading"><span>04</span><h2>Образование</h2></div>
            <div className="draft-notice"><strong>Реализуемые программы отсутствуют</strong><p>До получения лицензии приём и обучение не осуществляются. Ниже размещена программа на 162 часа, подготовленная на утверждение; программа ещё не реализуется.</p></div>
            <dl className="info-table" itemProp="eduAccred">
              <div><dt>Код или шифр реализуемой программы</dt><dd itemProp="eduCode">Не применяется: реализуемые образовательные программы отсутствуют.</dd></div>
              <div><dt>Наименование реализуемой программы</dt><dd itemProp="eduName">Не применяется: реализуемые образовательные программы отсутствуют.</dd></div>
              <div><dt>Профессия, специальность или направление подготовки</dt><dd itemProp="eduProf">Не применяется: реализуемые образовательные программы отсутствуют.</dd></div>
              <div><dt>Уровень образования</dt><dd itemProp="eduLevel">Не применяется: реализуемые образовательные программы отсутствуют.</dd></div>
              <div><dt>Форма обучения</dt><dd itemProp="eduForm">Не применяется: реализуемые образовательные программы отсутствуют.</dd></div>
              <div><dt>Нормативный срок обучения</dt><dd itemProp="learningTerm">Не применяется: реализуемые образовательные программы отсутствуют.</dd></div>
              <div><dt>Учебные предметы, курсы, дисциплины и модули</dt><dd itemProp="eduPred">Не применяется: реализуемые образовательные программы отсутствуют.</dd></div>
              <div><dt>Практика</dt><dd itemProp="eduPrac">Не применяется: реализуемые образовательные программы отсутствуют.</dd></div>
            </dl>
            <p itemProp="languageEl">Сведения о языке реализуемых программ отсутствуют; в размещённой программе предусмотрен русский язык.</p>
            <p itemProp="eduChislenEl">Обучающиеся по образовательным программам отсутствуют: лицензия не получена, приём закрыт.</p>
            <p itemProp="eduPriemEl">Результаты приёма отсутствуют: приём не проводился.</p>
            <p itemProp="eduPerevodEl">Результаты перевода, восстановления и отчисления отсутствуют: обучающиеся отсутствуют.</p>
            <dl className="info-table" itemProp="eduOp">
              <div><dt>Код или шифр реализуемой программы</dt><dd itemProp="eduCode">Не применяется: обучение ещё не начато, реализуемые программы отсутствуют.</dd></div>
              <div><dt>Наименование опубликованной программы</dt><dd itemProp="eduName">«Деятельность по монтажу, техническому обслуживанию и ремонту средств обеспечения пожарной безопасности зданий и сооружений». Программа на 162 часа подготовлена на утверждение; обучение ещё не начато.</dd></div>
              <div><dt>Вид образования</dt><dd itemProp="eduLevel">Дополнительное профессиональное образование — повышение квалификации.</dd></div>
              <div><dt>Профессия, специальность или направление подготовки</dt><dd itemProp="eduProf">Дополнительная профессиональная программа повышения квалификации объёмом 162 академических часа; включены общепрофессиональный модуль и девять профессиональных модулей, без противопожарных занавесов и завес.</dd></div>
              <div><dt>Форма обучения</dt><dd itemProp="eduForm">Заочная, исключительно с применением электронного обучения и дистанционных образовательных технологий.</dd></div>
              <div><dt>Описание образовательной программы</dt><dd itemProp="opMain"><a href="/documents/program-162h-20261008/dpp-162h-20261008.pdf" download>Полный текст программы на 162 часа — подготовлена на утверждение (PDF)</a>. Обучение до получения лицензии не проводится.</dd></div>
              <div><dt>Учебный план</dt><dd itemProp="educationPlan"><a href="/documents/program-162h-20261008/dpp-162h-20261008.pdf" download>Учебный план в составе единого документа программы (PDF)</a>.</dd></div>
              <div><dt>Рабочие программы</dt><dd itemProp="educationRpd"><a href="/documents/program-162h-20261008/dpp-162h-20261008.pdf" download>Рабочие программы десяти модулей в составе единого документа (PDF)</a>.</dd></div>
              <div><dt>Календарный учебный график</dt><dd itemProp="educationShedule"><a href="/documents/program-162h-20261008/dpp-162h-20261008.pdf" download>Календарный учебный график на 21 учебный день в составе единого документа (PDF)</a>. Обучение ещё не начато.</dd></div>
              <div><dt>Практика</dt><dd itemProp="eduPr">В программе предусмотрены 20 академических часов практических учебных работ по десяти модулям. <a href="/documents/program-162h-20261008/dpp-162h-20261008.pdf" download>Задания и критерии оценки в составе программы (PDF)</a>. Обучение ещё не начато.</dd></div>
              <div><dt>Методические и иные документы</dt><dd itemProp="methodology"><a href="/documents/program-162h-20261008/dpp-162h-20261008.pdf" download>Методические материалы (PDF)</a>; <a href="/documents/program-162h-20261008/dpp-162h-20261008.pdf" download>Порядок дистанционного контроля и аттестации в составе программы (PDF)</a>. Подготовлена на утверждение.</dd></div>
            </dl>
            <dl className="info-table" itemProp="eduNir">
              <div><dt>Код или шифр</dt><dd itemProp="eduCode">Не применяется: научно-исследовательская деятельность в рамках реализуемых программ отсутствует.</dd></div>
              <div><dt>Наименование программы</dt><dd itemProp="eduName">Не применяется: реализуемые образовательные программы отсутствуют.</dd></div>
              <div><dt>Перечень научных направлений</dt><dd itemProp="perechenNir">Не применяется: научно-исследовательская деятельность в рамках реализуемых программ отсутствует.</dd></div>
              <div><dt>Профессия, специальность или направление подготовки</dt><dd itemProp="eduProf">Не применяется: реализуемые образовательные программы отсутствуют.</dd></div>
              <div><dt>Уровень образования</dt><dd itemProp="eduLevel">Не применяется: реализуемые образовательные программы отсутствуют.</dd></div>
              <div><dt>Направления научной деятельности</dt><dd itemProp="napravNir">Не применяется: научно-исследовательская деятельность в рамках реализуемых программ отсутствует.</dd></div>
              <div><dt>Результаты научной деятельности</dt><dd itemProp="resultNir">Не применяется: научно-исследовательская деятельность в рамках реализуемых программ отсутствует.</dd></div>
              <div><dt>Научно-исследовательская база</dt><dd itemProp="baseNir">Не применяется: научно-исследовательская деятельность в рамках реализуемых программ отсутствует.</dd></div>
            </dl>
            <dl className="info-table" itemProp="graduateJob">
              <div><dt>Код или шифр</dt><dd itemProp="eduCode">Не применяется: выпускники отсутствуют.</dd></div>
              <div><dt>Наименование программы</dt><dd itemProp="eduName">Не применяется: выпускники отсутствуют.</dd></div>
              <div><dt>Профессия, специальность или направление подготовки</dt><dd itemProp="eduProf">Не применяется: выпускники отсутствуют.</dd></div>
              <div><dt>Численность выпускников</dt><dd itemProp="v1">Не применяется: выпускники отсутствуют.</dd></div>
              <div><dt>Трудоустроенные выпускники</dt><dd itemProp="t1">Не применяется: выпускники отсутствуют.</dd></div>
            </dl>
            <p itemProp="accreditationDocLink">Государственная аккредитация дополнительных профессиональных программ не проводится.</p>
            <article className="program-record" data-program-status="prepared-for-approval">
              <p className="eyebrow">Дополнительная профессиональная программа на 162 часа</p>
              <h3>«Деятельность по монтажу, техническому обслуживанию и ремонту средств обеспечения пожарной безопасности зданий и сооружений»</h3>
              <p><strong>Статус:</strong> Подготовлена на утверждение. Дата и номер нового приказа пока не присвоены. Приём и обучение до получения лицензии не проводятся.</p>
              <dl>
                <div><dt>Вид образования</dt><dd>Дополнительное образование</dd></div>
                <div><dt>Подвид образования</dt><dd>Дополнительное профессиональное образование</dd></div>
                <div><dt>Вид ДПП</dt><dd>Программа повышения квалификации</dd></div>
                <div><dt>Виды работ</dt><dd>Девять профессиональных модулей 2–7, 9–11 и общепрофессиональный модуль 1 приложения № 3 к приказу МЧС России от 15.11.2022 № 1156; модуль 8 исключён</dd></div>
                <div><dt>Объём</dt><dd>162 академических часа</dd></div>
                <div><dt>Срок освоения</dt><dd>21 учебный день; 5 учебных недель: 40, 40, 40, 40 и 2 академических часа</dd></div>
                <div><dt>Учебная нагрузка</dt><dd>140 часов теории, 20 часов практических учебных работ и 2 часа итоговой аттестации</dd></div>
                <div><dt>Форма обучения</dt><dd>Заочная; с применением исключительно электронного обучения и дистанционных образовательных технологий</dd></div>
                <div><dt>Язык</dt><dd>Русский</dd></div>
              </dl>
              <a className="text-link" itemProp="addRef" href="/programmy/pozharnaya-bezopasnost">Описание программы и учебный план →</a>
              <p><Link className="text-link" itemProp="addRef" href="/sveden/document/#program-files">Единый документ программы на 162 часа (PDF) →</Link></p>
            </article>
            <p>Размещены описание и единый документ программы на 162 часа со статусом «Подготовлена на утверждение». До получения лицензии реализация программы не начинается.</p>
          </section>
          )}

          {sectionIsVisible("eduStandarts") && (
          <section className="info-section" id="eduStandarts">
            <div className="info-heading"><span>05</span><h2>Образовательные стандарты и требования</h2></div>
            <dl className="info-table">
              <div><dt>Федеральные государственные образовательные стандарты</dt><dd itemProp="eduFedDoc">Не применяются к дополнительной профессиональной программе.</dd></div>
              <div><dt>Самостоятельно устанавливаемые образовательные стандарты</dt><dd itemProp="eduStandartDoc">Не применяются: организация не устанавливает собственные образовательные стандарты для ДПП.</dd></div>
              <div><dt>Федеральные государственные требования</dt><dd itemProp="eduFedTreb">Не применяются к дополнительной профессиональной программе.</dd></div>
              <div><dt>Самостоятельно устанавливаемые требования</dt><dd itemProp="eduStandartTreb">Не применяются: самостоятельно устанавливаемые требования для ДПП не используются.</dd></div>
            </dl>
            <p>Нормативной основой программы является типовая дополнительная профессиональная программа из приложения № 3 к приказу МЧС России от 15.11.2022 № 1156. Этот приказ не является ФГОС или ФГТ.</p>
          </section>
          )}

          {sectionIsVisible("managers") && (
          <section className="info-section" id="managers">
            <div className="info-heading"><span>06</span><h2>Руководство</h2></div>
            <dl className="person-card" itemProp="rucovodstvo"><div><dt>Ф.И.О.</dt><dd itemProp="fio">Баранов Олег Павлович</dd></div><div><dt>Должность</dt><dd itemProp="post">Генеральный директор</dd></div><div><dt>Телефон организации</dt><dd><a itemProp="telephone" href="tel:+74953363555">+7 495 336-35-55</a></dd></div><div><dt>Электронная почта организации</dt><dd><a itemProp="email" href="mailto:CSZDPO@YA.RU">CSZDPO@YA.RU</a></dd></div></dl>
            <dl className="person-card" itemProp="rucovodstvoZam"><div><dt>Ф.И.О.</dt><dd itemProp="fio">Требует подтверждения.</dd></div><div><dt>Должность</dt><dd itemProp="post">Сведения о наличии заместителей руководителя требуют подтверждения.</dd></div><div><dt>Телефон</dt><dd itemProp="telephone">Требует подтверждения.</dd></div><div><dt>Электронная почта</dt><dd itemProp="email">Требует подтверждения.</dd></div></dl>
            <p itemProp="rucovodstvoFil"><span itemProp="nameFil">По выписке ЕГРЮЛ от 20.08.2026 сведения о филиалах не отражены.</span></p>
          </section>
          )}

          {sectionIsVisible("employees") && (
          <section className="info-section" id="employees">
            <div className="info-heading"><span>07</span><h2>Педагогический состав</h2></div>
            <DraftNotice>Кадровое обеспечение программы: сведения о назначении преподавателей конкретных дисциплин пока не подтверждены. Имеющиеся сведения о методическом сопровождении приведены отдельно ниже и не заменяют сведения о преподавателях технических модулей.</DraftNotice>
            <h3>Методическое сопровождение</h3>
            <p>В пункте 4 приказа ООО «ЦЕНТР СРЕДСТВ ЗАЩИТЫ» от 30.07.2026 № 2-ОД предусмотрено участие Кравченко Вероники Юрьевны в методическом сопровождении и подготовке организационно-методических материалов. В приказе это участие отделено от преподавания профильных технических дисциплин.</p>
            <dl className="info-table">
              <div><dt>Ф.И.О.</dt><dd>Кравченко Вероника Юрьевна</dd></div>
              <div><dt>Образование</dt><dd>Высшее. Московский юридический институт МВД России, 1999 год.</dd></div>
              <div><dt>Специальность и квалификация</dt><dd>Юриспруденция; юрист.</dd></div>
              <div><dt>Повышение квалификации, 2018 год</dt><dd>Тюменский институт повышения квалификации сотрудников МВД России: программа повышения квалификации старших преподавателей-методистов (преподавателей-методистов) образовательных организаций системы МВД России, 76 часов. Удостоверение от 12.10.2018.</dd></div>
              <div><dt>Повышение квалификации, 2024 год</dt><dd>Академия управления МВД России: организация и обеспечение реализации основных и дополнительных профессиональных программ в образовательных организациях МВД России с применением дистанционных образовательных технологий, включая дистанционное проведение итоговой аттестации, 240 часов. Удостоверение от 01.03.2024.</dd></div>
            </dl>
            <p>Сведения об образовании и квалификации приведены по предоставленным документам. Должность в Учебном центре и назначение на конкретные дисциплины этими документами не устанавливаются.</p>
            <h3>Преподаватели дисциплин программы</h3>
            <dl className="info-table" itemProp="teachingStaff">
              <div><dt>Ф.И.О.</dt><dd itemProp="fio">Персональный состав требует подтверждения кадровыми документами.</dd></div>
              <div><dt>Должность</dt><dd itemProp="post">Требует подтверждения кадровыми документами.</dd></div>
              <div><dt>Преподаваемые дисциплины</dt><dd itemProp="teachingDiscipline">Распределение преподавателей по модулям программы требует оформления.</dd></div>
              <div><dt>Уровень образования</dt><dd itemProp="teachingLevel">Требует подтверждения документами об образовании.</dd></div>
              <div><dt>Учёная степень</dt><dd itemProp="degree">Требует подтверждения.</dd></div>
              <div><dt>Учёное звание</dt><dd itemProp="academStat">Требует подтверждения.</dd></div>
              <div><dt>Квалификация</dt><dd itemProp="qualification">Требует подтверждения документами об образовании и квалификации.</dd></div>
              <div><dt>Повышение квалификации и профессиональная переподготовка</dt><dd itemProp="profDevelopment">Требует подтверждения.</dd></div>
              <div><dt>Стаж работы по специальности</dt><dd itemProp="specExperience">Требует подтверждения.</dd></div>
              <div><dt>Образовательные программы</dt><dd itemProp="teachingOp">Распределение преподавателей по программе требует оформления; обучение до получения лицензии не проводится.</dd></div>
            </dl>
          </section>
          )}

          {sectionIsVisible("objects") && (
          <section className="info-section" id="objects">
            <div className="info-heading"><span>08</span><h2>Материально-техническое обеспечение и оснащённость образовательного процесса. Доступная среда</h2></div>
            <p>Для дистанционной реализации предусмотрена образовательная среда «СИНТАГМА». Новая программа на 162 часа включает десять модулей и десять практических учебных работ. Учебные материалы подготовлены; загрузка новой редакции и проверка доступа в СДО завершаются отдельно. Программа подготовлена на утверждение, набор до получения образовательной лицензии закрыт.</p>
            <p><a className="text-link" href="https://синтагма.рф" target="_blank" rel="noopener noreferrer">Вход в СДО «СИНТАГМА» →</a> Доступ предоставляется по индивидуальной учётной записи.</p>
            <p>Веб-интерфейс СДО СИНТАГМА размещён на хостинге Timeweb Cloud. Серверная часть — Global/Lovable Cloud.</p>
            <dl className="info-table" itemProp="purposeCab">
              <div><dt>Адрес оборудованного учебного кабинета</dt><dd itemProp="addressCab">Требует подтверждения с учётом исключительно дистанционной формы реализации.</dd></div>
              <div><dt>Наименование оборудованного учебного кабинета</dt><dd itemProp="nameCab">Требует подтверждения.</dd></div>
              <div><dt>Оснащённость кабинета</dt><dd itemProp="osnCab">Требует подтверждения.</dd></div>
              <div><dt>Приспособленность для использования инвалидами и лицами с ОВЗ</dt><dd itemProp="ovzCab">Требует фактической проверки и подтверждения.</dd></div>
            </dl>
            <dl className="info-table" itemProp="purposePrac">
              <div><dt>Адрес объекта для практических занятий</dt><dd itemProp="addressPrac">В программе на 162 часа выезд на объект не предусмотрен. Практические учебные работы выполняются по документам и условным данным с дистанционной проверкой.</dd></div>
              <div><dt>Наименование объекта для практических занятий</dt><dd itemProp="namePrac">Объект для физических операций программой на 162 часа не предусмотрен.</dd></div>
              <div><dt>Оснащённость объекта</dt><dd itemProp="osnPrac">Требует подтверждения.</dd></div>
              <div><dt>Приспособленность для использования инвалидами и лицами с ОВЗ</dt><dd itemProp="ovzPrac">Требует фактической проверки и подтверждения.</dd></div>
            </dl>
            <dl className="info-table" itemProp="purposeLibr">
              <div><dt>Наименование библиотеки</dt><dd itemProp="objName">Для программы подготовлены полные тексты десяти модулей, практические задания, оценочные материалы и нормативные ссылки. Материалы предназначены для библиотеки СДО «СИНТАГМА».</dd></div>
              <div><dt>Адрес</dt><dd itemProp="objAddress"><a href="https://синтагма.рф" target="_blank" rel="noopener noreferrer">синтагма.рф</a>. Доступ к новой редакции материалов будет проверен после их размещения; используется индивидуальная учётная запись.</dd></div>
              <div><dt>Доступность для инвалидов и лиц с ОВЗ</dt><dd itemProp="objOvz">Требует фактической проверки.</dd></div>
            </dl>
            <dl className="info-table" itemProp="purposeSport">
              <div><dt>Наименование объекта спорта</dt><dd itemProp="objName">Не применяется: программа не предусматривает занятия физической культурой и спортом.</dd></div>
              <div><dt>Адрес</dt><dd itemProp="objAddress">Не применяется.</dd></div>
              <div><dt>Доступность для инвалидов и лиц с ОВЗ</dt><dd itemProp="objOvz">Не применяется.</dd></div>
            </dl>
            <dl className="info-table">
              <div><dt>Обеспечение доступа в здания образовательной организации для инвалидов и лиц с ОВЗ</dt><dd itemProp="ovz">Требует фактической проверки и подтверждения с учётом исключительно дистанционной реализации.</dd></div>
              <div><dt>Средства обучения и воспитания</dt><dd itemProp="purposeFacil">Предусмотрены десять модулей, десять практических учебных работ, десять модульных тестов и итоговые тест и письменная работа. Результаты подлежат сохранению и проверке в СДО «СИНТАГМА».</dd></div>
              <div><dt>Средства обучения и воспитания, приспособленные для инвалидов и лиц с ОВЗ</dt><dd itemProp="purposeFacilOvz">Требуют фактической проверки.</dd></div>
              <div><dt>Доступ к информационным системам и информационно-телекоммуникационным сетям</dt><dd itemProp="comNet">Доступ к СДО «Синтагма» через Интернет по индивидуальной учётной записи. Доступ к новой редакции курса проверяется после размещения материалов; приём и обучение до получения лицензии не проводятся.</dd></div>
              <div><dt>Доступ к информационным системам для инвалидов и лиц с ОВЗ</dt><dd itemProp="comNetOvz">Требует фактической проверки доступности.</dd></div>
              <div><dt>Электронные образовательные ресурсы</dt><dd itemProp="erList">Для программы на 162 часа подготовлены полные тексты модулей, задания, тесты и нормативные ссылки. Размещение новой редакции в СДО и проверка доступа ещё завершаются.</dd></div>
              <div><dt>Электронные образовательные ресурсы для инвалидов и лиц с ОВЗ</dt><dd itemProp="erListOvz">Требуют фактической проверки доступности.</dd></div>
              <div><dt>Специальные технические средства обучения коллективного и индивидуального пользования</dt><dd itemProp="techOvz">Наличие и применимость требуют подтверждения.</dd></div>
              <div><dt>Общежитие</dt><dd itemProp="hostelInfo">Наличие или отсутствие требует подтверждения по документам организации.</dd></div>
              <div><dt>Интернат</dt><dd itemProp="interInfo">Наличие или отсутствие требует подтверждения по документам организации.</dd></div>
              <div><dt>Количество жилых помещений в общежитии для иногородних обучающихся</dt><dd itemProp="hostelNum">Требует подтверждения; значение 0 без документального основания не заявляется.</dd></div>
              <div><dt>Количество жилых помещений в общежитии, приспособленных для инвалидов и лиц с ОВЗ</dt><dd itemProp="hostelNumOvz">Требует подтверждения.</dd></div>
              <div><dt>Количество жилых помещений в интернате для иногородних обучающихся</dt><dd itemProp="interNum">Требует подтверждения; значение 0 без документального основания не заявляется.</dd></div>
              <div><dt>Количество жилых помещений в интернате, приспособленных для инвалидов и лиц с ОВЗ</dt><dd itemProp="interNumOvz">Требует подтверждения.</dd></div>
              <div><dt>Количество мест в общежитиях</dt><dd itemProp="hostelNumRooms">Не применяется: организация не является образовательной организацией высшего образования.</dd></div>
              <div><dt>Формирование платы за проживание в общежитии</dt><dd itemProp="hostelInterOvz">Требует подтверждения после проверки наличия общежития и интерната.</dd></div>
              <div><dt>Локальный нормативный акт о наличии и условиях предоставления обучающимся стипендий, мер социальной поддержки</dt><dd itemProp="localActObSt">Требует подтверждения.</dd></div>
              <div><dt>Локальный нормативный акт о размере платы за пользование жилым помещением и коммунальные услуги</dt><dd itemProp="localActObPred">Требует подтверждения после проверки наличия общежития и интерната.</dd></div>
            </dl>
            <p>Программа предусматривает заочную форму исключительно с применением электронного обучения и дистанционных образовательных технологий.</p>
            <p>{remoteWorkNotice}</p>
          </section>
          )}

          {sectionIsVisible("grants") && (
          <section className="info-section" id="grants">
            <div className="info-heading"><span>09</span><h2>Стипендии и меры поддержки обучающихся</h2></div>
            <p itemProp="grant">До получения лицензии и начала обучения стипендии не выплачиваются; порядок на период реализации требует подтверждения.</p>
            <p itemProp="support">До получения лицензии и начала обучения меры социальной поддержки не предоставляются; порядок на период реализации требует подтверждения.</p>
          </section>
          )}

          {sectionIsVisible("paid") && (
          <section className="info-section" id="paid">
            <div className="info-heading"><span>10</span><h2>Платные образовательные услуги</h2></div>
            <dl className="info-table">
              <div><dt>Порядок оказания платных образовательных услуг</dt><dd itemProp="paidEdu"><LocalActStatus file="paid-education-rules-signed-received-20260917.pdf" /></dd></div>
              <div><dt>Образец договора об оказании платных образовательных услуг</dt><dd itemProp="paidDog"><LocalActStatus file="education-contract-sample-signed-received-20260917.pdf" /></dd></div>
              <div><dt>Документ об утверждении стоимости обучения</dt><dd itemProp="paidSt">Не утверждён; требуется приказ до открытия набора и заключения первого договора.</dd></div>
              <div><dt>Плата, взимаемая с родителей (законных представителей)</dt><dd itemProp="paidParents">Не применяется к дополнительному профессиональному образованию.</dd></div>
            </dl>
          </section>
          )}

          {sectionIsVisible("budget") && (
          <section className="info-section" id="budget">
            <div className="info-heading"><span>11</span><h2>Финансово-хозяйственная деятельность</h2></div>
            <dl className="info-table">
              <div><dt>Объём образовательной деятельности за счёт федерального бюджета</dt><dd itemProp="finBFVolume">Требует подтверждения бухгалтерией за конкретный отчётный период.</dd></div>
              <div><dt>Объём образовательной деятельности за счёт бюджета субъекта Российской Федерации</dt><dd itemProp="finBRVolume">Требует подтверждения бухгалтерией за конкретный отчётный период.</dd></div>
              <div><dt>Объём образовательной деятельности за счёт местного бюджета</dt><dd itemProp="finBMVolume">Требует подтверждения бухгалтерией за конкретный отчётный период.</dd></div>
              <div><dt>Объём образовательной деятельности по договорам об оказании платных образовательных услуг</dt><dd itemProp="finPVolume">Требует подтверждения бухгалтерией за конкретный отчётный период.</dd></div>
            </dl>
            <dl className="info-table" itemProp="volume">
              <div><dt>Отчётный год</dt><dd itemProp="finYear">Требует подтверждения бухгалтерией.</dd></div>
              <div><dt>Поступление финансовых и материальных средств</dt><dd itemProp="finPost">Требует подтверждения бухгалтерией.</dd></div>
              <div><dt>Расходование финансовых и материальных средств</dt><dd itemProp="finRas">Требует подтверждения бухгалтерией.</dd></div>
            </dl>
            <p itemProp="finPlanDocLink">Наличие либо неприменимость плана финансово-хозяйственной деятельности или бюджетной сметы требует подтверждения бухгалтерией и юристом.</p>
          </section>
          )}

          {sectionIsVisible("vacant") && (
          <section className="info-section" id="vacant">
            <div className="info-heading"><span>12</span><h2>Вакантные места для приёма (перевода) обучающихся</h2></div>
            <dl className="info-table" itemProp="vacant">
              <div><dt>Код или шифр программы</dt><dd itemProp="eduCode">Не применяется: приём до получения лицензии не открыт.</dd></div>
              <div><dt>Наименование программы</dt><dd itemProp="eduName">Вакантные места не объявлены: приём до получения лицензии не открыт.</dd></div>
              <div><dt>Уровень образования</dt><dd itemProp="eduLevel">Не применяется: приём до получения лицензии не открыт.</dd></div>
              <div><dt>Профессия, специальность или направление подготовки</dt><dd itemProp="eduProf">Не применяется: приём до получения лицензии не открыт.</dd></div>
              <div><dt>Курс обучения</dt><dd itemProp="eduCourse">Не применяется: обучение не проводится.</dd></div>
              <div><dt>Форма обучения</dt><dd itemProp="eduForm">Не применяется: обучение не проводится.</dd></div>
              <div><dt>Места за счёт федерального бюджета</dt><dd itemProp="numberBFVacant">Не определены: приём до получения лицензии не открыт.</dd></div>
              <div><dt>Места за счёт бюджета субъекта Российской Федерации</dt><dd itemProp="numberBRVacant">Не определены: приём до получения лицензии не открыт.</dd></div>
              <div><dt>Места за счёт местного бюджета</dt><dd itemProp="numberBMVacant">Не определены: приём до получения лицензии не открыт.</dd></div>
              <div><dt>Места по договорам об оказании платных образовательных услуг</dt><dd itemProp="numberPVacant">Не определены: приём до получения лицензии не открыт.</dd></div>
            </dl>
          </section>
          )}

          {sectionIsVisible("inter") && (
          <section className="info-section" id="inter">
            <div className="info-heading"><span>13</span><h2>Международное сотрудничество</h2></div>
            <dl className="info-table" itemProp="internationalDog">
              <div><dt>Государство</dt><dd itemProp="stateName">Наличие заключённых или планируемых договоров требует подтверждения.</dd></div>
              <div><dt>Наименование иностранной или международной организации</dt><dd itemProp="orgName">Требует подтверждения.</dd></div>
              <div><dt>Реквизиты договора</dt><dd itemProp="dogReg">Требует подтверждения.</dd></div>
            </dl>
          </section>
          )}

          {sectionIsVisible("catering") && (
          <section className="info-section" id="catering">
            <div className="info-heading"><span>14</span><h2>Организация питания в образовательной организации</h2></div>
            <dl className="info-table" itemProp="meals">
              <div><dt>Наименование объекта питания</dt><dd itemProp="objName">Отсутствует: программа предусматривает исключительно дистанционное обучение без присутствия обучающихся в учебном центре.</dd></div>
              <div><dt>Адрес объекта питания</dt><dd itemProp="objAddress">Не применяется при исключительно дистанционной реализации программы.</dd></div>
              <div><dt>Доступность объекта питания для инвалидов и лиц с ОВЗ</dt><dd itemProp="objOvz">Не применяется при отсутствии объекта питания.</dd></div>
            </dl>
            <p itemProp="health">Порядок охраны здоровья обучающихся при дистанционной реализации требует утверждения и публикации до открытия приёма.</p>
          </section>
          )}
          <nav className="official-links" aria-label="Официальные образовательные ресурсы">
            <a href="https://www.minobrnauki.gov.ru/" target="_blank" rel="noopener noreferrer">Министерство науки и высшего образования Российской Федерации</a>
            <a href="https://edu.gov.ru/" target="_blank" rel="noopener noreferrer">Министерство просвещения Российской Федерации</a>
          </nav>
        </div>
      </div>
    </main>
  );
}
