const documents = [
  { title: "ДПП повышения квалификации — 34 часа", file: "dpp-34h-for-approval-20260909.pdf", pages: 8, size: "287 КБ" },
  { title: "Рабочие программы двух модулей", file: "module-programs-34h-for-approval-20260909.pdf", pages: 5, size: "242 КБ" },
  { title: "Методические материалы самостоятельных заданий", file: "assignments-34h-for-approval-20260909.pdf", pages: 6, size: "244 КБ" },
  { title: "Порядок дистанционного контроля", file: "assessment-procedure-34h-for-approval-20260909.pdf", pages: 3, size: "190 КБ" },
] as const;

export default function ProgramDownloads() {
  return (
    <section className="program-downloads" id="program-files" aria-labelledby="program-files-title">
      <h3 id="program-files-title">Программа и учебные документы</h3>
      <p>Полные тексты доступны без регистрации. Редакция от 9 сентября 2026 года — для утверждения; подписанная утверждённая версия пока не опубликована.</p>
      <div className="program-file-list">
        {documents.map((document) => (
          <article className="program-file" key={document.file}>
            <div>
              <h4>{document.title}</h4>
              <p>PDF · {document.pages} стр. · {document.size} · для утверждения</p>
            </div>
            <div className="program-file-actions">
              <a href={`/documents/program-34h/${document.file}`} target="_blank" rel="noopener noreferrer" aria-label={`Открыть: ${document.title} (PDF)`}>Открыть PDF</a>
              <a href={`/documents/program-34h/${document.file}`} download={document.file} aria-label={`Скачать: ${document.title} (PDF)`}>Скачать PDF</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
