import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://xn-----8kcgjebtk6b7abmdihf9c1dzb.xn--p1ai"),
  title: "Центр средств защиты — обучение пожарной безопасности",
  description:
    "Дополнительное профессиональное образование специалистов в области монтажа, обслуживания и ремонта средств обеспечения пожарной безопасности.",
  alternates: {
    canonical: "/",
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
