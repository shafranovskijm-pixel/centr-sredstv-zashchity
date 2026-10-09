import type { Metadata } from "next";
import Link from "next/link";
import UploadDocuments from "./UploadDocuments";
import { documentTypes } from "./upload-config";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "ЦСЗ — документы для повторной подачи",
  description: "Актуальные заявление, сведения о реализации образовательных программ и ДПП на 162 часа: скачать, подписать и вернуть документы.",
  alternates: { canonical: "/licenziya/" },
  robots: { index: false, follow: false },
};

const documentBase = "/documents/license-client-20261009-v2";
const checks = [
  {
    title: "Заявление и сведения, включая МТО",
    result: "Новые формы по приказу ДОНМ № Пр-792: заявление — 5 страниц, сведения о реализации программ (приложение 3) — 14 страниц. Подготовлены для подписания.",
    status: "На подпись",
    pending: true,
  },
  {
    title: "Программа ДПО",
    result: "Единая ДПП на 162 часа: дистанционное обучение, рабочие программы и связь с профстандартами 696н и 580н. Ожидаем утверждение и подписанную копию.",
    status: "На утверждение",
    pending: true,
  },
  {
    title: "Учебные материалы СИНТАГМЫ",
    result: "Материалы сопоставлены с ДПП на 162 часа: 32 элемента и 12 ресурсов библиотеки. До подачи завершаем внедрение и проверку исправлений допуска к итоговой аттестации и оформления результатов.",
    status: "Завершаем проверку",
    pending: true,
  },
];
const steps = [
  "Скачайте комплект. Укажите фактические даты и номера, подпишите документы и поставьте печать там, где предусмотрено поле.",
  "Отсканируйте все страницы каждого документа в один PDF и загрузите файлы на этой странице, выбрав соответствующий вид документа.",
  "Мы сверим подписанные файлы, разместим утверждённую программу на сайте и в СДО и завершим проверку исправлений платформы.",
  "После итоговой сверки подайте заявление и сведения через портал. Сохраните подтверждение подачи.",
];

function DownloadIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5" /></svg>;
}

export default function LicenseClientPage() {
  return (
    <div className={styles.page}>
      <a className="skip-link" href="#main">Перейти к содержанию</a>
      <header className={styles.header}>
        <Link href="/" className={styles.brand}>Центр средств защиты</Link>
        <span>Обновлено <time dateTime="2026-10-09">09.10.2026</time></span>
      </header>
      <main id="main" className={styles.main}>
        <div className={styles.intro}>
          <span className={styles.status}>На утверждение</span>
          <h1>Документы для<br className={styles.desktopBreak} /> повторной подачи</h1>
          <p>Обновлённый комплект по замечаниям от 7 октября. Скачайте документы, подпишите и загрузите их обратно на этой странице.</p>
          <nav className={styles.sectionNav} aria-label="Разделы страницы">
            <a href="#corrections">Что проверяем <span>01</span></a>
            <a href="#documents">Документы <span>02</span></a>
            <a href="#next-steps">Что осталось <span>03</span></a>
          </nav>
        </div>

        <section id="corrections" className={styles.section} aria-labelledby="corrections-title">
          <div className={styles.sectionHeading}>
            <div><span className={styles.sectionNumber}>01</span><h2 id="corrections-title">Что проверяем</h2></div>
          </div>
          <div className={styles.corrections}>
            {checks.map((item, index) => (
              <article className={styles.correction} key={item.title}>
                <span className={styles.rowNumber}>{index + 1}</span>
                <h3 className={styles.checkTitle}>{item.title}</h3>
                <div className={styles.correctionResult}>
                  <p>{item.result}</p>
                  <span className={item.pending ? styles.pendingBadge : styles.preparedBadge}>{item.status}</span>
                </div>
              </article>
            ))}
          </div>
          <details className={styles.remarkDetails}>
            <summary>Что учли из отказа</summary>
            <ul>
              <li>Добавили функции и результаты обучения; связь с квалификационными требованиями сверена.</li>
              <li>Включили рабочие программы в единую ДПП и уточнили принадлежность приложений.</li>
              <li>Связали план, календарь и материалы; добавили задания, вопросы и порядок контроля.</li>
            </ul>
          </details>
        </section>

        <section id="documents" className={styles.section} aria-labelledby="documents-title">
          <div className={styles.sectionHeading}>
            <div><span className={styles.sectionNumber}>02</span><h2 id="documents-title">Документы на подпись</h2></div>
            <a className={styles.zipLink} href={`${documentBase}/csz-signature-package.zip`} download><DownloadIcon />Весь комплект · ZIP</a>
          </div>
          <p className={styles.sectionNote}>Версия 2 от 09.10.2026. PDF — для просмотра и подписи. DOCX — для внесения реквизитов в ДПП, приказ и ФОС.</p>
          <ul className={styles.documents}>
            {documentTypes.map((document, index) => {
              const original = document.id === "application" || document.id === "appendix5" ? null : "docx";
              const filename = document.id === "appendix5" ? "information" : document.id;
              const title = document.id === "appendix5"
                ? "Сведения о реализации образовательных программ (приложение 3) — 14 страниц"
                : document.id === "application" ? "Заявление — 5 страниц" : document.title;
              return (
                <li className={styles.document} key={document.id}>
                  <span className={styles.documentNumber}>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{title}</h3>
                  <div className={styles.documentLinks}>
                    <a className={styles.pdfLink} href={`${documentBase}/${filename}.pdf`} download aria-label={`Скачать PDF: ${title}`}><DownloadIcon />PDF</a>
                    {original && <a href={`${documentBase}/${filename}.${original}`} download aria-label={`Скачать исходник ${original.toUpperCase()}: ${title}`}>{original.toUpperCase()}</a>}
                  </div>
                </li>
              );
            })}
          </ul>
          <details className={styles.remarkDetails}>
            <summary>Где поставить даты и подписи</summary>
            <ul>
              <li>ДПП, приказ и ФОС: внесите в DOCX одну фактическую дату утверждения и один номер приказа. Уберите пометку «НА УТВЕРЖДЕНИЕ», сохраните PDF и подпишите. Объём программы — 162 часа.</li>
              <li>Заявление: подписи на страницах 1, 3 и 5; дата заполнения — на странице 1.</li>
              <li>Сведения: подписи на страницах 12, 13 и 14; даты на листах продолжения 13–14. Верните все 14 страниц.</li>
              <li>Перед подписью сверьте реквизиты и фактическое оснащение. Печать — при наличии, в предусмотренных полях. Служебный ФОС предназначен для преподавателя.</li>
            </ul>
          </details>
          <UploadDocuments />
        </section>

        <section id="next-steps" className={styles.section} aria-labelledby="steps-title">
          <div className={styles.sectionHeading}>
            <div><span className={styles.sectionNumber}>03</span><h2 id="steps-title">Что осталось</h2></div>
          </div>
          <ol className={styles.steps}>
            {steps.map((step, index) => <li key={step}><span aria-hidden="true">{index + 1}</span><p>{step}</p></li>)}
          </ol>
          <p className={styles.submissionStatus}>Комплект подготовлен для подписания. Загрузка файлов означает их получение; готовность к подаче подтверждаем после итоговой сверки.</p>
        </section>
      </main>
      <footer className={styles.footer}>
        <span>ЦСЗ · ДПП, 162 часа</span>
        <Link href="/programmy/pozharnaya-bezopasnost/">Программа на сайте ↗</Link>
      </footer>
    </div>
  );
}
