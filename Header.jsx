"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import mhiLogo from "@/public/logos/mhi.png";
import { useLocale } from "@/lib/i18n/LocaleContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import BrandsMenu from "@/components/BrandsMenu";

export default function Header() {
  const pathname = usePathname();
  const { locale, dict } = useLocale();
  const [open, setOpen] = useState(false);

  const withLocale = (path) => `/${locale}${path}`;

  const NAV_ITEMS = [
    { href: withLocale(""), label: dict.nav.home },
    { href: withLocale("/about"), label: dict.nav.about },
  ];
  const contactHref = withLocale("/contact");
  const homeHref = withLocale("");
  const productsHref = withLocale("/products");
  const isProductsActive = pathname === productsHref;

  return (
    <header className="site-nav">
      <div className="wrap nav-inner">
        <Link href={homeHref} className="brand-mark" onClick={() => setOpen(false)}>
          <Image src={mhiLogo} alt="Milton Hosiery Industries" height={72} priority />
          <span className="name">
            Milton Hosiery Industries
            <span>{dict.nav.tagline}</span>
          </span>
        </Link>

        <button
          className="nav-toggle"
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
        >
          &#9776;
        </button>

        <nav className={`links${open ? " open" : ""}`}>
          <Link
            href={NAV_ITEMS[0].href}
            className={pathname === NAV_ITEMS[0].href ? "active" : ""}
            onClick={() => setOpen(false)}
          >
            {NAV_ITEMS[0].label}
          </Link>
          <Link
            href={NAV_ITEMS[1].href}
            className={pathname === NAV_ITEMS[1].href ? "active" : ""}
            onClick={() => setOpen(false)}
          >
            {NAV_ITEMS[1].label}
          </Link>

          <span className="brands-menu-desktop">
            <BrandsMenu active={isProductsActive} />
          </span>
          <BrandsMenu mobile onNavigate={() => setOpen(false)} />

          <LanguageSwitcher onNavigate={() => setOpen(false)} />
          <Link
            href={contactHref}
            className={`nav-cta${pathname === contactHref ? " active" : ""}`}
            onClick={() => setOpen(false)}
          >
            {dict.nav.contactUs}
          </Link>
        </nav>
      </div>
    </header>
  );
}
