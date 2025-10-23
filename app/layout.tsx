import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans, fontBebas, fontNunito } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import SmoothScroll from "@/components/smoothScroll";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-nunito antialiased",
          fontSans.variable,
          fontBebas.variable,
          fontNunito.variable
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col h-screen">
            <Navbar />
            <SmoothScroll>
              <main className="w-full -mt-[100px]">{children}</main>
              <Footer />
            </SmoothScroll>
          </div>
        </Providers>
      </body>
    </html>
  );
}

// LoaderWrapper is now a client component in components/LoaderWrapper.tsx
