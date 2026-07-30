import BrandEmblem from "./brand-emblem";

const curriculum = [
  {
    number: "01",
    title: "Нормативные основы",
    text: "Требования пожарной безопасности и организация лицензируемой деятельности.",
  },
  {
    number: "02",
    title: "Системы пожаротушения",
    text: "Монтаж, техническое обслуживание, ремонт и пусконаладочные работы.",
  },
  {
    number: "03",
    title: "Сигнализация и оповещение",
    text: "Пожарная и охранно-пожарная сигнализация, СОУЭ и передача извещений.",
  },
  {
    number: "04",
    title: "Противодымная защита",
    text: "Автоматические системы противодымной вентиляции и диспетчеризация.",
  },
  {
    number: "05",
    title: "Противопожарные преграды",
    text: "Заполнения проёмов, занавесы, завесы и огнезащита материалов.",
  },
  {
    number: "06",
    title: "Итоговая аттестация",
    text: "Проверка освоения программы и готовности применять знания на практике.",
  },
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="16" cy="16" r="12" />
      <path d="M16 9v8h6" />
    </svg>
  );
}

function LaptopIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <rect x="6" y="6" width="20" height="15" rx="1" />
      <path d="M3 25h26M10 25l2-4h8l2 4" />
    </svg>
  );
}

function CertificateIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <rect x="6" y="4" width="20" height="20" rx="1" />
      <path d="M11 10h10M11 15h8M17 24l-2 5 4-2 4 2-2-5" />
    </svg>
  );
}

export default function Home() {
  return (
    <main>
      <a className="skip-link" href="#content">Перейти к содержанию</a>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Центр средств защиты — на главную">
          <BrandEmblem />
          <span>
            <strong>Центр средств защиты</strong>
            <small>Дополнительное профессиональное образование</small>
          </span>
        </a>

        <nav className="desktop-nav" aria-label="Основная навигация">
          <a href="/programmy/pozharnaya-bezopasnost">Программа</a>
          <a href="#education">Об обучении</a>
          <a href="/sveden">Сведения об организации</a>
          <a href="#contacts">Контакты</a>
        </nav>

        <a className="header-phone" href="tel:+74953363555" aria-label="Позвонить в Центр средств защиты">
          +7 495 336-35-55
        </a>

        <details className="mobile-nav">
          <summary aria-label="Открыть меню"><span /><span /><span /></summary>
          <nav aria-label="Мобильная навигация">
            <a href="/programmy/pozharnaya-bezopasnost">Программа</a>
            <a href="#education">Об обучении</a>
            <a href="/sveden">Сведения об организации</a>
            <a href="#contacts">Контакты</a>
            <a href="tel:+74953363555">+7 495 336-35-55</a>
            <a href="mailto:CSZDPO@YA.RU">CSZDPO@YA.RU</a>
          </nav>
        </details>
      </header>

      <section className="hero" id="top">
        <div className="hero-grid" id="content">
          <div className="hero-copy">
            <div className="status-pill">
              <span />
              Лицензия на образовательную деятельность — в процессе оформления
            </div>

            <p className="eyebrow">ООО «Центр средств защиты»</p>
            <h1>Дополнительное профессиональное образование по пожарной безопасности</h1>

            <div className="program-intro">
              <p>Программа повышения квалификации</p>
              <h2>
                Монтаж, техническое обслуживание и ремонт средств обеспечения
                пожарной безопасности
              </h2>
            </div>

            <div className="facts" aria-label="Основные параметры программы">
              <div className="fact-card">
                <ClockIcon />
                <span><strong>178</strong> академических часов</span>
              </div>
              <div className="fact-card">
                <LaptopIcon />
                <span><strong>Заочно</strong> с применением ДОТ</span>
              </div>
              <div className="fact-card">
                <CertificateIcon />
                <span><strong>Удостоверение</strong> о повышении квалификации</span>
              </div>
            </div>

            <div className="hero-actions">
              <a className="button button-primary" href="#contacts">
                Узнать о начале обучения <ArrowIcon />
              </a>
              <a className="button button-secondary" href="/sveden">
                Сведения об организации <ArrowIcon />
              </a>
            </div>

            <p className="audience-note">
              Для руководителей и специалистов организаций, работающих с системами
              противопожарной защиты
            </p>
          </div>

          <div className="hero-graphic" aria-hidden="true">
            <div className="technical-grid" />
            <div className="crest-display">
              <img
                className="hero-emblem"
                src="/images/centr-sredstv-zashchity-emblem.png"
                alt=""
                width="1254"
                height="1254"
              />
              <span>Центр средств защиты</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section course-section" id="program">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Содержание программы</p>
            <h2>Компетенции для работы с системами противопожарной защиты</h2>
          </div>
          <p>
            Программа разрабатывается на основе действующей типовой дополнительной
            профессиональной программы МЧС России. До начала набора учебный план и
            локальные документы будут утверждены приказом организации.
          </p>
        </div>

        <div className="curriculum-grid">
          {curriculum.map((item) => (
            <article className="curriculum-card" key={item.number}>
              <span>{item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
        <a className="text-link course-detail-link" href="/programmy/pozharnaya-bezopasnost">
          Открыть полное описание и учебный план <ArrowIcon />
        </a>
      </section>

      <section className="section process-section" id="education">
        <div className="process-copy">
          <p className="eyebrow">Как будет проходить обучение</p>
          <h2>Понятный образовательный процесс без отрыва от работы</h2>
          <p>
            Доступ к учебным материалам, промежуточный контроль и итоговая аттестация
            будут организованы в электронной образовательной среде.
          </p>
        </div>
        <ol className="steps">
          <li><span>1</span><div><strong>Зачисление</strong><p>Проверка документа об образовании и оформление обучения.</p></div></li>
          <li><span>2</span><div><strong>Освоение программы</strong><p>Материалы, практические задания и промежуточная аттестация.</p></div></li>
          <li><span>3</span><div><strong>Итоговая аттестация</strong><p>Оценка результатов и выдача документа после получения лицензии.</p></div></li>
        </ol>
      </section>

      <section className="section organization-section" id="sveden">
        <div className="organization-card">
          <div className="organization-title">
            <BrandEmblem decorative />
            <div>
              <p className="eyebrow">Официальная информация</p>
              <h2>Сведения об образовательной организации</h2>
            </div>
          </div>
          <p className="organization-lead">
            Раздел формируется в соответствии с требованиями к структуре официального
            сайта образовательной организации. Документы будут добавляться по мере
            утверждения и до начала образовательной деятельности.
          </p>
          <dl className="details-grid">
            <div><dt>Полное наименование</dt><dd>Общество с ограниченной ответственностью «Центр средств защиты»</dd></div>
            <div><dt>Руководитель</dt><dd>Генеральный директор Баранов Олег Павлович</dd></div>
            <div><dt>ИНН / КПП</dt><dd>7728302867 / 772801001</dd></div>
            <div><dt>ОГРН</dt><dd>1037728048819</dd></div>
            <div><dt>Место нахождения</dt><dd>117279, г. Москва, вн. тер. г. муниципальный округ Коньково, ул. Профсоюзная, д. 93А, помещ. 1/Ц</dd></div>
            <div><dt>Дата создания</dt><dd>9 октября 2003 года</dd></div>
          </dl>
          <a className="text-link" href="/sveden">Открыть обязательные подразделы <ArrowIcon /></a>
        </div>
      </section>

      <section className="section contact-section" id="contacts">
        <div>
          <p className="eyebrow">Контакты</p>
          <h2>Информация для будущих слушателей</h2>
        </div>
        <div className="contact-notice">
          <strong>Связаться с учебным центром</strong>
          <a className="contact-phone" href="tel:+74953363555">+7 495 336-35-55</a>
          <a href="tel:+79933363555">+7 993 336-35-55</a>
          <a href="tel:+79933364555">+7 993 336-45-55</a>
          <a href="mailto:CSZDPO@YA.RU">CSZDPO@YA.RU</a>
          <p>
            Приём заявок и обучение начнутся после получения образовательной лицензии.
            Обучение планируется исключительно с применением электронного обучения и
            дистанционных образовательных технологий.
          </p>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-brand"><BrandEmblem /><strong>ООО «Центр средств защиты»</strong></div>
        <a href="tel:+74953363555">+7 495 336-35-55</a>
        <a href="mailto:CSZDPO@YA.RU">CSZDPO@YA.RU</a>
        <p>ИНН 7728302867 · ОГРН 1037728048819</p>
        <p>© 2026 Центр средств защиты</p>
      </footer>
    </main>
  );
}
