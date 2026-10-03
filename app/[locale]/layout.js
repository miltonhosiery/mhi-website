import { Poppins, Inter } from "next/font/google";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LocaleProvider } from "@/lib/i18n/LocaleContext";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { locales } from "@/lib/i18n/config";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "Milton Hosiery Industries — Wholesale Apparel Brands",
  description:
    "Milton Hosiery Industries designs and owns Milton, ANICY, NICY and Avron. Family-run since 1973 in Mumbai. Wholesale, distribution and institutional enquiries welcome.",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({ children, params }) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  return (
    <html lang={locale} className={`${poppins.variable} ${inter.variable}`}>
      <body>
        <LocaleProvider locale={locale} dict={dict}>
          <Header />
          {children}
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
}
