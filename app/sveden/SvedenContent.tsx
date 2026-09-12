import Link from "next/link";
import BrandEmblem from "../brand-emblem";
import ProgramDownloads from "../program-downloads";
import { module8Notice } from "../program-data";

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
              <div><dt>Места осуществления образовательной деятельности при использовании сетевой формы</dt><dd itemProp="addressPlaceSet">Не применяется: сетевая форма реализации проекта программы не предусмотрена.</dd></div>
              <div><dt>Места проведения практики</dt><dd itemProp="addressPlacePrac">Не определены; необходимость и основания указания мест требуют подтверждения до утверждения программы.</dd></div>
              <div><dt>Места проведения практической подготовки</dt><dd itemProp="addressPlacePodg">Не определены; дистанционный способ выполнения практических работ, включая содержание модуля 8, требует подтверждения до утверждения программы.</dd></div>
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
              <div><dt>Положение о структурном подразделении</dt><dd><a className="text-link" itemProp="divisionClauseDocLink" href="/documents/utverzhdennye-pdf/02-prikaz-1-OD-i-polozhenie-uchebnogo-centra.pdf" download>Приказ о создании и Положение об Учебном центре (PDF)</a></dd></div>
            </dl>
            <p>Приказом от 30.07.2026 № 1-ОД создано специализированное структурное образовательное подразделение «Учебный центр».</p>
            <p itemProp="filInfo">По выписке ЕГРЮЛ от 20.08.2026 сведения о филиалах не отражены; окончательное подтверждение по уставу требуется перед публикацией.</p>
            <p itemProp="repInfo">Сведения о представительствах требуют подтверждения перед окончательной публикацией.</p>
          </section>
          )}

          {sectionIsVisible("document") && (
          <section className="info-section" id="document">
            <div className="info-heading"><span>03</span><h2>Документы</h2></div>
            <div className="draft-notice"><strong>Статус учебных документов</strong><p>Проект программы на 178 часов и учебные документы доступны ниже в PDF для ознакомления и утверждения. Утверждённые редакции будут размещены после оформления. До получения лицензии образовательная деятельность не осуществляется.</p></div>
            <div className="download-pack">
              <div>
                <span>Программа повышения квалификации</span>
                <strong>178 академических часов · 11 модулей</strong>
                <p>Доступны полный текст ДПП, рабочие программы, задания и порядок контроля. Программа не утверждена; подписанная редакция пока не опубликована.</p>
                <a className="text-link" href="#program-files">Открыть и скачать документы →</a>
              </div>
            </div>
            <ProgramDownloads />
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
              <a className="egrul-download" itemProp="ustavDocLink" href="/documents/ustav-csz-public-20260907.pdf" download>
                <strong>Устав организации и изменения к нему</strong>
                <span>PDF · 21 страница · публичная копия; паспортные данные и домашние адреса скрыты</span>
              </a>
              <div itemProp="localActStud"><strong>Правила внутреннего распорядка обучающихся</strong><span>Утверждённая электронная редакция отсутствует; проект подготовлен к подписанию</span></div>
              <div itemProp="localActOrder"><strong>Правила внутреннего трудового распорядка</strong><span>Электронная копия для размещения отсутствует</span></div>
              <div itemProp="priemDocLink"><strong>Правила приёма обучающихся</strong><span>Утверждённая электронная редакция отсутствует; проект подготовлен к подписанию</span></div>
              <div itemProp="modeDocLink"><strong>Режим занятий обучающихся</strong><span>Утверждённая электронная редакция отсутствует; проект подготовлен к подписанию</span></div>
              <div itemProp="tekKontrolDocLink"><strong>Формы, периодичность и порядок текущего контроля и промежуточной аттестации</strong><span>Утверждённая электронная редакция отсутствует; проект подготовлен к подписанию</span></div>
              <div itemProp="perevodDocLink"><strong>Порядок и основания перевода, отчисления и восстановления обучающихся</strong><span>Утверждённая электронная редакция отсутствует; проект подготовлен к подписанию</span></div>
              <div itemProp="vozDocLink"><strong>Порядок оформления возникновения, приостановления и прекращения образовательных отношений</strong><span>Утверждённая электронная редакция отсутствует; проект подготовлен к подписанию</span></div>
              <div itemProp="localActCollec"><strong>Коллективный договор</strong><span>Наличие или отсутствие требует подтверждения работодателя</span></div>
              <div itemProp="reportEduDocLink"><strong>Отчёт о результатах самообследования</strong><span>Электронный документ не размещён; статус и необходимость подготовки требуют подтверждения</span></div>
              <div itemProp="prescriptionDocLink"><strong>Предписания органов контроля</strong><span>Сведения уточняются перед публикацией окончательного комплекта документов</span></div>
              <div><strong>Образец договора на оказание платных образовательных услуг</strong><span>Утверждённая редакция отсутствует; проект подготовлен к подписанию</span></div>
              <div><strong>Лицензия на образовательную деятельность</strong><span>Не предоставлена; организация готовится к лицензированию</span></div>
            </div>
          </section>
          )}

          {sectionIsVisible("education") && (
          <section className="info-section" id="education">
            <div className="info-heading"><span>04</span><h2>Образование</h2></div>
            <div className="draft-notice"><strong>Реализуемые программы отсутствуют</strong><p>До получения лицензии приём и обучение не осуществляются. Приведённая ниже программа является неутверждённым проектом и не включена в сведения о реализуемых программах.</p></div>
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
            <p itemProp="languageEl">Сведения о языке реализуемых программ отсутствуют; для проекта программы предусмотрен русский язык.</p>
            <p itemProp="eduChislenEl">Обучающиеся по образовательным программам отсутствуют: лицензия не получена, приём закрыт.</p>
            <p itemProp="eduPriemEl">Результаты приёма отсутствуют: приём не проводился.</p>
            <p itemProp="eduPerevodEl">Результаты перевода, восстановления и отчисления отсутствуют: обучающиеся отсутствуют.</p>
            <dl className="info-table" itemProp="eduOp">
              <div><dt>Код или шифр программы</dt><dd itemProp="eduCode">Не применяется: утверждённые реализуемые программы отсутствуют.</dd></div>
              <div><dt>Наименование программы</dt><dd itemProp="eduName">Не применяется: утверждённые реализуемые программы отсутствуют.</dd></div>
              <div><dt>Уровень образования</dt><dd itemProp="eduLevel">Не применяется: утверждённые реализуемые программы отсутствуют.</dd></div>
              <div><dt>Профессия, специальность или направление подготовки</dt><dd itemProp="eduProf">Не применяется: утверждённые реализуемые программы отсутствуют.</dd></div>
              <div><dt>Форма обучения</dt><dd itemProp="eduForm">Не применяется: утверждённые реализуемые программы отсутствуют.</dd></div>
              <div><dt>Описание образовательной программы</dt><dd itemProp="opMain">Отсутствует: утверждённая реализуемая программа не размещена.</dd></div>
              <div><dt>Учебный план</dt><dd itemProp="educationPlan">Отсутствует: утверждённый учебный план не размещён.</dd></div>
              <div><dt>Рабочие программы</dt><dd itemProp="educationRpd">Отсутствуют: утверждённые рабочие программы не размещены.</dd></div>
              <div><dt>Календарный учебный график</dt><dd itemProp="educationShedule">Отсутствует: утверждённый календарный учебный график не размещён.</dd></div>
              <div><dt>Практика</dt><dd itemProp="eduPr">Не применяется: утверждённые реализуемые программы отсутствуют.</dd></div>
              <div><dt>Методические и иные документы</dt><dd itemProp="methodology">Отсутствуют: документы по утверждённой реализуемой программе не размещены.</dd></div>
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
            <article className="program-record" data-program-status="unapproved-project">
              <p className="eyebrow">Проект дополнительной профессиональной программы</p>
              <h3>«Деятельность по монтажу, техническому обслуживанию и ремонту средств обеспечения пожарной безопасности зданий и сооружений»</h3>
              <p><strong>Статус:</strong> Программа не утверждена, приём и обучение не проводятся.</p>
              <dl>
                <div><dt>Вид образования</dt><dd>Дополнительное образование</dd></div>
                <div><dt>Подвид образования</dt><dd>Дополнительное профессиональное образование</dd></div>
                <div><dt>Вид ДПП</dt><dd>Программа повышения квалификации</dd></div>
                <div><dt>Виды работ</dt><dd>Все десять профессиональных модулей приложения 3 к приказу МЧС России от 15.11.2022 № 1156; полный перечень приведён в учебном плане</dd></div>
                <div><dt>Объём</dt><dd>178 академических часов</dd></div>
                <div><dt>Срок освоения</dt><dd>5 учебных недель по календарному графику проекта</dd></div>
                <div><dt>Учебная нагрузка</dt><dd>154 часа теории, 22 часа самостоятельных практических работ и 2 часа итоговой аттестации</dd></div>
                <div><dt>Форма обучения</dt><dd>Заочная; с применением исключительно электронного обучения и дистанционных образовательных технологий</dd></div>
                <div><dt>Язык</dt><dd>Русский</dd></div>
              </dl>
              <a className="text-link" itemProp="addRef" href="/programmy/pozharnaya-bezopasnost">Описание проекта программы и проект учебного плана →</a>
              <p><Link className="text-link" itemProp="addRef" href="/sveden/document/#program-files">Проект программы и учебные документы для утверждения (PDF) →</Link></p>
            </article>
            <p>Размещены описание и полные учебные документы для утверждения. Подписанная утверждённая редакция пока не опубликована. До получения лицензии реализация программы не начинается.</p>
          </section>
          )}

          {sectionIsVisible("eduStandarts") && (
          <section className="info-section" id="eduStandarts">
            <div className="info-heading"><span>05</span><h2>Образовательные стандарты и требования</h2></div>
            <dl className="info-table">
              <div><dt>Федеральные государственные образовательные стандарты</dt><dd itemProp="eduFedDoc">Не применяются к проекту дополнительной профессиональной программы.</dd></div>
              <div><dt>Самостоятельно устанавливаемые образовательные стандарты</dt><dd itemProp="eduStandartDoc">Не применяются: организация не устанавливает собственные образовательные стандарты для проекта ДПП.</dd></div>
              <div><dt>Федеральные государственные требования</dt><dd itemProp="eduFedTreb">Не применяются к проекту дополнительной профессиональной программы.</dd></div>
              <div><dt>Самостоятельно устанавливаемые требования</dt><dd itemProp="eduStandartTreb">Не применяются: самостоятельно устанавливаемые требования для проекта ДПП не используются.</dd></div>
            </dl>
            <p>Нормативной основой проекта программы является типовая дополнительная профессиональная программа из приложения № 3 к приказу МЧС России от 15.11.2022 № 1156. Этот приказ не является ФГОС или ФГТ.</p>
          </section>
          )}

          {sectionIsVisible("managers") && (
          <section className="info-section" id="managers">
            <div className="info-heading"><span>06</span><h2>Руководство</h2></div>
            <dl className="person-card" itemProp="rucovodstvo"><div><dt>Ф.И.О.</dt><dd itemProp="fio">Баранов Олег Павлович</dd></div><div><dt>Должность</dt><dd itemProp="post">Генеральный директор</dd></div><div><dt>Телефон организации</dt><dd><a itemProp="telephone" href="tel:+74953363555">+7 495 336-35-55</a></dd></div><div><dt>Электронная почта организации</dt><dd><a itemProp="email" href="mailto:CSZDPO@YA.RU">CSZDPO@YA.RU</a></dd></div></dl>
            <dl className="person-card" itemProp="rucovodstvoZam"><div><dt>Ф.И.О.</dt><dd itemProp="fio">Требует подтверждения.</dd></div><div><dt>Должность</dt><dd itemProp="post">Сведения о наличии заместителей руководителя требуют подтверждения.</dd></div><div><dt>Телефон</dt><dd itemProp="telephone">Требует подтверждения.</dd></div><div><dt>Электронная почта</dt><dd itemProp="email">Требует подтверждения.</dd></div></dl>
            <dl className="person-card" itemProp="rucovodstvoFil"><div><dt>Наименование филиала</dt><dd itemProp="nameFil">Требует подтверждения по уставу и актуальной выписке ЕГРЮЛ.</dd></div><div><dt>Ф.И.О. руководителя филиала</dt><dd itemProp="fio">Требует подтверждения.</dd></div><div><dt>Должность</dt><dd itemProp="post">Требует подтверждения.</dd></div><div><dt>Телефон</dt><dd itemProp="telephone">Требует подтверждения.</dd></div><div><dt>Электронная почта</dt><dd itemProp="email">Требует подтверждения.</dd></div></dl>
          </section>
          )}

          {sectionIsVisible("employees") && (
          <section className="info-section" id="employees">
            <div className="info-heading"><span>07</span><h2>Педагогический состав</h2></div>
            <DraftNotice>Кадровое обеспечение проекта программы и подтверждающие документы требуют оформления до начала обучения.</DraftNotice>
            <dl className="info-table" itemProp="teachingStaff">
              <div><dt>Ф.И.О.</dt><dd itemProp="fio">Персональный состав требует подтверждения кадровыми документами.</dd></div>
              <div><dt>Должность</dt><dd itemProp="post">Требует подтверждения кадровыми документами.</dd></div>
              <div><dt>Преподаваемые дисциплины</dt><dd itemProp="teachingDiscipline">Распределение по модулям проекта программы не утверждено.</dd></div>
              <div><dt>Уровень образования</dt><dd itemProp="teachingLevel">Требует подтверждения документами об образовании.</dd></div>
              <div><dt>Учёная степень</dt><dd itemProp="degree">Требует подтверждения.</dd></div>
              <div><dt>Учёное звание</dt><dd itemProp="academStat">Требует подтверждения.</dd></div>
              <div><dt>Квалификация</dt><dd itemProp="qualification">Требует подтверждения документами об образовании и квалификации.</dd></div>
              <div><dt>Повышение квалификации и профессиональная переподготовка</dt><dd itemProp="profDevelopment">Требует подтверждения.</dd></div>
              <div><dt>Стаж работы по специальности</dt><dd itemProp="specExperience">Требует подтверждения.</dd></div>
              <div><dt>Образовательные программы</dt><dd itemProp="teachingOp">Не определены: программа не утверждена и не реализуется.</dd></div>
            </dl>
          </section>
          )}

          {sectionIsVisible("objects") && (
          <section className="info-section" id="objects">
            <div className="info-heading"><span>08</span><h2>Материально-техническое обеспечение и оснащённость образовательного процесса. Доступная среда</h2></div>
            <p>Для обучения планируется использовать электронную образовательную среду «Синтагма». Курс на 178 часов и электронная библиотека проходят подготовку и проверку. Предусмотрены 11 модулей и 22 часа самостоятельных практических работ в моделируемых профессиональных ситуациях с дистанционной проверкой. Программа не утверждена; набор закрыт до получения образовательной лицензии, доступ к обучению пока не открыт.</p>
            <dl className="info-table" itemProp="purposeCab">
              <div><dt>Адрес оборудованного учебного кабинета</dt><dd itemProp="addressCab">Требует подтверждения с учётом исключительно дистанционной формы реализации.</dd></div>
              <div><dt>Наименование оборудованного учебного кабинета</dt><dd itemProp="nameCab">Требует подтверждения.</dd></div>
              <div><dt>Оснащённость кабинета</dt><dd itemProp="osnCab">Требует подтверждения.</dd></div>
              <div><dt>Приспособленность для использования инвалидами и лицами с ОВЗ</dt><dd itemProp="ovzCab">Требует фактической проверки и подтверждения.</dd></div>
            </dl>
            <dl className="info-table" itemProp="purposePrac">
              <div><dt>Адрес объекта для практических занятий</dt><dd itemProp="addressPrac">Не определён; способ выполнения практических работ и содержание модуля 8 требуют подтверждения.</dd></div>
              <div><dt>Наименование объекта для практических занятий</dt><dd itemProp="namePrac">Не определено; требует подтверждения до утверждения программы.</dd></div>
              <div><dt>Оснащённость объекта</dt><dd itemProp="osnPrac">Требует подтверждения.</dd></div>
              <div><dt>Приспособленность для использования инвалидами и лицами с ОВЗ</dt><dd itemProp="ovzPrac">Требует фактической проверки и подтверждения.</dd></div>
            </dl>
            <dl className="info-table" itemProp="purposeLibr">
              <div><dt>Наименование библиотеки</dt><dd itemProp="objName">Электронная библиотека «Синтагма» готовится; завершённость требует проверки через реальный доступ пользователя.</dd></div>
              <div><dt>Адрес</dt><dd itemProp="objAddress">Адрес ресурса и основание доступа требуют окончательного подтверждения.</dd></div>
              <div><dt>Доступность для инвалидов и лиц с ОВЗ</dt><dd itemProp="objOvz">Требует фактической проверки.</dd></div>
            </dl>
            <dl className="info-table" itemProp="purposeSport">
              <div><dt>Наименование объекта спорта</dt><dd itemProp="objName">Не применяется: проект программы не предусматривает занятия физической культурой и спортом.</dd></div>
              <div><dt>Адрес</dt><dd itemProp="objAddress">Не применяется.</dd></div>
              <div><dt>Доступность для инвалидов и лиц с ОВЗ</dt><dd itemProp="objOvz">Не применяется.</dd></div>
            </dl>
            <dl className="info-table">
              <div><dt>Обеспечение доступа в здания образовательной организации для инвалидов и лиц с ОВЗ</dt><dd itemProp="ovz">Требует фактической проверки и подтверждения с учётом исключительно дистанционной реализации.</dd></div>
              <div><dt>Средства обучения и воспитания</dt><dd itemProp="purposeFacil">Состав и фактическая готовность требуют подтверждения.</dd></div>
              <div><dt>Средства обучения и воспитания, приспособленные для инвалидов и лиц с ОВЗ</dt><dd itemProp="purposeFacilOvz">Требуют фактической проверки.</dd></div>
              <div><dt>Доступ к информационным системам и информационно-телекоммуникационным сетям</dt><dd itemProp="comNet">Планируется доступ через «Синтагму»; готовность полного цикла обучения требует проверки.</dd></div>
              <div><dt>Доступ к информационным системам для инвалидов и лиц с ОВЗ</dt><dd itemProp="comNetOvz">Требует фактической проверки доступности.</dd></div>
              <div><dt>Электронные образовательные ресурсы</dt><dd itemProp="erList">Перечень и доступность ресурсов в «Синтагме» требуют окончательной проверки.</dd></div>
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
            <p>Проект предусматривает заочную форму исключительно с применением электронного обучения и дистанционных образовательных технологий.</p>
            <p>{module8Notice}</p>
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
              <div><dt>Порядок оказания платных образовательных услуг</dt><dd itemProp="paidEdu">Утверждённый электронный документ не размещён; проект подготовлен к подписанию.</dd></div>
              <div><dt>Образец договора об оказании платных образовательных услуг</dt><dd itemProp="paidDog">Утверждённая редакция не размещена; проект подготовлен к подписанию.</dd></div>
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
              <div><dt>Код или шифр программы</dt><dd itemProp="eduCode">Не применяется: утверждённая программа отсутствует.</dd></div>
              <div><dt>Наименование программы</dt><dd itemProp="eduName">Не применяется: утверждённая программа отсутствует.</dd></div>
              <div><dt>Уровень образования</dt><dd itemProp="eduLevel">Не применяется: утверждённая программа отсутствует.</dd></div>
              <div><dt>Профессия, специальность или направление подготовки</dt><dd itemProp="eduProf">Не применяется: утверждённая программа отсутствует.</dd></div>
              <div><dt>Курс обучения</dt><dd itemProp="eduCourse">Не применяется: обучение не проводится.</dd></div>
              <div><dt>Форма обучения</dt><dd itemProp="eduForm">Не применяется: обучение не проводится.</dd></div>
              <div><dt>Места за счёт федерального бюджета</dt><dd itemProp="numberBFVacant">Не определены: программа не утверждена, приём не открыт.</dd></div>
              <div><dt>Места за счёт бюджета субъекта Российской Федерации</dt><dd itemProp="numberBRVacant">Не определены: программа не утверждена, приём не открыт.</dd></div>
              <div><dt>Места за счёт местного бюджета</dt><dd itemProp="numberBMVacant">Не определены: программа не утверждена, приём не открыт.</dd></div>
              <div><dt>Места по договорам об оказании платных образовательных услуг</dt><dd itemProp="numberPVacant">Не определены: программа не утверждена, приём не открыт.</dd></div>
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
              <div><dt>Наименование объекта питания</dt><dd itemProp="objName">Отсутствует: проект предусматривает исключительно дистанционное обучение без присутствия обучающихся в учебном центре.</dd></div>
              <div><dt>Адрес объекта питания</dt><dd itemProp="objAddress">Не применяется при исключительно дистанционной реализации проекта программы.</dd></div>
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
