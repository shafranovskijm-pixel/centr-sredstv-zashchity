const documents = [
  { title: "ДПП повышения квалификации — 178 часов", file: "dpp-178h-for-approval-20260913.pdf" },
  { title: "Рабочие программы 11 модулей", file: "module-programs-178h-for-approval-20260913.pdf" },
  { title: "Методические материалы самостоятельных практических работ", file: "assignments-178h-for-approval-20260913.pdf" },
  { title: "Порядок дистанционного контроля и аттестации", file: "assessment-procedure-178h-for-approval-20260913.pdf" },
] as const;

const pdfMetadata: Partial<Record<(typeof documents)[number]["file"], { pages: number; size: string }>> = {
  "dpp-178h-for-approval-20260913.pdf": { pages: 20, size: "449 КБ" },
  "module-programs-178h-for-approval-20260913.pdf": { pages: 17, size: "379 КБ" },
  "assignments-178h-for-approval-20260913.pdf": { pages: 28, size: "478 КБ" },
  "assessment-procedure-178h-for-approval-20260913.pdf": { pages: 3, size: "192 КБ" },
};

export default function ProgramDownloads() {
  return (
    <section className="program-downloads" id="program-files" aria-labelledby="program-files-title">
      <h3 id="program-files-title">Программа и учебные документы</h3>
      <p>Полные тексты доступны без регистрации. Редакция от 13 сентября 2026 года — для утверждения; программа не утверждена, подписанная утверждённая версия пока не опубликована.</p>
      <div className="program-file-list">
        {documents.map((document) => {
          const metadata = pdfMetadata[document.file];
          return (
            <article className="program-file" key={document.file}>
              <div>
                <h4>{document.title}</h4>
                <p>PDF{metadata ? ` · ${metadata.pages} стр. · ${metadata.size}` : ""} · для утверждения</p>
              </div>
              <div className="program-file-actions">
                <a href={`/documents/program-178h/${document.file}`} target="_blank" rel="noopener noreferrer" aria-label={`Открыть: ${document.title} (PDF)`}>Открыть PDF</a>
                <a href={`/documents/program-178h/${document.file}`} download={document.file} aria-label={`Скачать: ${document.title} (PDF)`}>Скачать PDF</a>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
