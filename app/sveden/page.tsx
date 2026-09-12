import type { Metadata } from "next";
import SvedenContent from "./SvedenContent";

export const metadata: Metadata = {
  title: "Сведения об образовательной организации — Центр средств защиты",
  description: "Официальный раздел сведений об образовательной организации ООО «Центр средств защиты».",
  alternates: { canonical: "/sveden/" },
};

export default function SvedenPage() {
  return <SvedenContent />;
}
