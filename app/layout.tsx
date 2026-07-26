import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Центр средств защиты — обучение пожарной безопасности",
  description:
    "Дополнительное профессиональное образование специалистов в области монтажа, обслуживания и ремонта средств обеспечения пожарной безопасности.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/images/centr-sredstv-zashchity-emblem.png",
    shortcut: "/images/centr-sredstv-zashchity-emblem.png",
    apple: "/images/centr-sredstv-zashchity-emblem.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
