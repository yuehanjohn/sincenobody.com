import { Fira_Code as FontMono, Inter as FontSans, Bebas_Neue as FontBebas, Nunito as FontNunito } from "next/font/google";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const fontBebas = FontBebas({
  subsets: ["latin"],
  variable: "--font-bebas",
  weight: "400",
});

export const fontNunito = FontNunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["200", "300", "400", "500", "600", "700", "800", "900", "1000"],
  style: ["normal", "italic"],
});
