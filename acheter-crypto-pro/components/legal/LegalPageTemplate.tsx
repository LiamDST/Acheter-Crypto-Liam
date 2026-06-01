import { ReactNode } from "react";

type LegalSection = {
  id: string;
  title: string;
  content: ReactNode;
};

export function LegalPageTemplate({
  title,
  intro,
  sections,
  updatedAt
}: {
  title: string;
  intro: string;
  sections: LegalSection[];
  updatedAt: string;
}) {
  return (
    <main className="page-section">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.28fr_0.72fr]">
        <aside className="rounded-xl border border-line bg-cream p-5">
          <p className="text-sm font-semibold">Sommaire</p>
          <div className="mt-3 grid gap-2 text-sm text-muted">
            {sections.map((section) => (
              <a key={section.id} href={`#${section.id}`} className="hover:text-ink">
                {section.title}
              </a>
            ))}
          </div>
          <p className="mt-5 text-xs text-muted">Mise à jour: {updatedAt}</p>
        </aside>

        <article className="rounded-xl border border-line bg-white p-6 md:p-8">
          <h1 className="text-4xl font-semibold">{title}</h1>
          <p className="mt-3 text-sm leading-7 text-muted">{intro}</p>
          <div className="mt-8 space-y-7">
            {sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-24">
                <h2 className="text-2xl font-semibold">{section.title}</h2>
                <div className="mt-2 text-sm leading-7 text-muted">{section.content}</div>
              </section>
            ))}
          </div>
        </article>
      </div>
    </main>
  );
}
