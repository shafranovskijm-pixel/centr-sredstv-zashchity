import type { Metadata } from "next";
import Link from "next/link";
import UploadDocuments from "./UploadDocuments";
import { documentTypes } from "./upload-config";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "ЦСЗ — документы для повторной подачи",
  description: "Заявление и справка МТО, программа ДПО, учебные материалы и документы для подписания.",
  alternates: { canonical: "/licenziya/" },
  robots: { index: false, follow: false },
};

const documentBase = "/documents/license-client-20261009";
const checks = [
  {
    title: "Заявление и справка МТО",
    result: "Формы, реквизиты, ссылки и объём 162 часа сведены в комплект. Ожидаем подпись.",
    status: "На подпись",
    pending: true,
  },
  {
    title: "Программа ДПО",
    result: "162 часа; полностью дистанционная модель; связь компетенций с профстандартами 696н и 580н. Изменений по итогам проверки не требуется. Осталось утверждение.",
    status: "Сверено 09.10",
    pending: false,
  },
  {
    title: "Учебные материалы СИНТАГМЫ",
    result: "Материалы сопоставлены с ДПП на 162 часа: 32 элемента и 12 ресурсов библиотеки. Доступ проверяющего работает.",
    status: "Сверено 09.10",
    pending: false,
  },
];
const steps = [
  "Утвердить ДПП, приказ и ФОС: указать фактические реквизиты и подписать документы.",
  "Подписать заявление и приложение 5 фактической датой. После подключения приёма файлов — загрузить их сюда.",
  "Заменить PDF программы на сайте и в СДО утверждённой подписанной копией.",
  "Подать новый комплект через портал и сохранить подтверждение подачи.",
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
          <p>Комплект по замечаниям от 7 октября. Скачайте документы, внесите фактические реквизиты и подпишите их.</p>
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
          <p className={styles.sectionNote}>PDF — для просмотра и подписи. Исходник — для заполнения реквизитов.</p>
          <ul className={styles.documents}>
            {documentTypes.map((document, index) => {
              const original = document.id === "application" || document.id === "appendix5" ? "xlsx" : "docx";
              return (
                <li className={styles.document} key={document.id}>
                  <span className={styles.documentNumber}>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{document.title}</h3>
                  <div className={styles.documentLinks}>
                    <a className={styles.pdfLink} href={`${documentBase}/${document.id}.pdf`} download aria-label={`Скачать PDF: ${document.title}`}><DownloadIcon />PDF</a>
                    <a href={`${documentBase}/${document.id}.${original}`} download aria-label={`Скачать исходник ${original.toUpperCase()}: ${document.title}`}>{original.toUpperCase()}</a>
                  </div>
                </li>
              );
            })}
          </ul>
          <UploadDocuments />
        </section>

        <section id="next-steps" className={styles.section} aria-labelledby="steps-title">
          <div className={styles.sectionHeading}>
            <div><span className={styles.sectionNumber}>03</span><h2 id="steps-title">Что осталось</h2></div>
          </div>
          <ol className={styles.steps}>
            {steps.map((step, index) => <li key={step}><span aria-hidden="true">{index + 1}</span><p>{step}</p></li>)}
          </ol>
          <p className={styles.submissionStatus}>Новая подача и решение ДОНМ пока не подтверждены.</p>
        </section>
      </main>
      <footer className={styles.footer}>
        <span>ЦСЗ · ДПП, 162 часа</span>
        <Link href="/programmy/pozharnaya-bezopasnost/">Программа на сайте ↗</Link>
      </footer>
    </div>
  );
}
