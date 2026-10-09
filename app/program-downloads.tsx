import { programDocumentUrl, programStatus } from "./program-data";

export default function ProgramDownloads() {
  return (
    <section className="program-downloads" id="program-files" aria-labelledby="program-files-title">
      <h3 id="program-files-title">Программа и учебные документы — 162 часа</h3>
      <p><strong>{programStatus}.</strong> Единый документ содержит ДПП, учебный план, календарный учебный график, рабочие программы десяти модулей, оценочные и методические материалы.</p>
      <div className="program-file-list">
        <article className="program-file">
          <div><h4>ДПП повышения квалификации — 162 академических часа</h4><p>PDF · редакция от 10 октября 2026 года</p></div>
          <div className="program-file-actions">
            <a href={programDocumentUrl} target="_blank" rel="noopener noreferrer" aria-label="Открыть программу на 162 часа (PDF)">Открыть PDF</a>
            <a href={programDocumentUrl} download="dpp-162h-20261008.pdf" aria-label="Скачать программу на 162 часа (PDF)">Скачать PDF</a>
          </div>
        </article>
        <article className="program-file">
          <div><h4>Учебный конфигуратор П3 — пожарная сигнализация</h4><p>Автономная модель для настройки привязок, запуска контрольных событий и сохранения отчёта. Не подключается к реальному оборудованию.</p></div>
          <div className="program-file-actions">
            <a href="/documents/program-162h-20261008/trainer-p3.html" target="_blank" rel="noopener noreferrer">Открыть конфигуратор</a>
            <a href="/documents/program-162h-20261008/trainer-p3.html" download="trainer-p3.html">Скачать для работы без Интернета</a>
          </div>
        </article>
      </div>
    </section>
  );
}

const archivedDocuments = [
  ["ДПП на 178 часов — прежняя версия", "/documents/program-178h/dpp-178h-signed-received-20260917.pdf"],
  ["Рабочие программы 11 модулей — прежняя версия", "/documents/program-178h/module-programs-178h-signed-received-20260917.pdf"],
  ["Методические материалы — прежняя версия", "/documents/program-178h/assignments-178h-signed-received-20260917.pdf"],
  ["Порядок контроля и аттестации — прежняя версия", "/documents/program-178h/assessment-procedure-178h-signed-received-20260917.pdf"],
  ["Приказ об утверждении прежней программы на 178 часов — № 4-ОД от 31.07.2026 по тексту документа", "/documents/organizational/prikaz-4-od-signed-received-20260917.pdf"],
] as const;

export function ArchivedProgramDownloads() {
  return (
    <details className="program-downloads" id="program-archive">
      <summary>Архив учебных документов: прежняя программа на 178 часов</summary>
      <p>Сохранены подписанные экземпляры, полученные 17 сентября 2026 года. Они относятся к прежней программе на 178 часов; её приказ и подписи не распространяются на новую редакцию на 162 часа.</p>
      <ul>{archivedDocuments.map(([title, href]) => <li key={href}><a href={href} download>{title} (PDF)</a></li>)}</ul>
    </details>
  );
}
