import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SvedenContent, { svedenSections } from "../SvedenContent";

type PageProps = {
  params: Promise<{ section: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return svedenSections.map(({ slug }) => ({ section: slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { section: slug } = await params;
  const section = svedenSections.find((candidate) => candidate.slug === slug);

  if (!section) return {};

  return {
    title: `${section.title} — Центр средств защиты`,
    description: `${section.title}. Официальный подраздел сведений об образовательной организации ООО «Центр средств защиты».`,
    alternates: { canonical: `/sveden/${section.slug}/` },
  };
}

export default async function SvedenSectionPage({ params }: PageProps) {
  const { section: slug } = await params;
  const section = svedenSections.find((candidate) => candidate.slug === slug);

  if (!section) notFound();

  return <SvedenContent onlySection={section.id} />;
}
