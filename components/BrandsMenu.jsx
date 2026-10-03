"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { getBrands } from "@/lib/brands";
import { useLocale } from "@/lib/i18n/LocaleContext";

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ChevronIcon({ open }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.18s ease" }}
    >
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function BrandsMenu({ mobile = false, active, onNavigate }) {
  const { locale, dict } = useLocale();
  const brands = getBrands(locale).filter((b) => b.slug !== "milton");
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const closeTimer = useRef(null);

  const openNow = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const closeSoon = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 150);
  };

  useEffect(() => {
    if (mobile) return;
    const onClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [mobile]);

  const allHref = `/${locale}/products`;

  if (mobile) {
    return (
      <div className="brands-menu-mobile">
        <button className="brands-toggle-mobile" onClick={() => setOpen((v) => !v)}>
          {dict.nav.products}
          <ChevronIcon open={open} />
        </button>
        {open && (
          <div className="brands-sublist">
            {brands.map((b) => (
              <Link
                key={b.slug}
                href={`${allHref}?brand=${b.slug}`}
                className="brands-subitem"
                onClick={onNavigate}
              >
                {b.logo ? (
                  <Image src={b.logo} alt="" width={60} height={22} style={{ height: "18px", width: "auto" }} />
                ) : (
                  <span className="brands-subitem-word">{b.name}</span>
                )}
                <span>{b.name}</span>
              </Link>
            ))}
            <Link href={allHref} className="brands-subitem brands-subitem-all" onClick={onNavigate}>
              {dict.nav.viewAllBrands}
              <ArrowIcon />
            </Link>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className="brands-menu"
      ref={ref}
      onMouseEnter={openNow}
      onMouseLeave={closeSoon}
    >
      <button
        className={active ? "active" : ""}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        {dict.nav.products}
        <ChevronIcon open={open} />
      </button>

      {open && (
        <div className="brands-dropdown">
          <div className="brands-dropdown-inner">
            {brands.map((b) => (
              <Link
                key={b.slug}
                href={`${allHref}?brand=${b.slug}`}
                className="brands-row"
                onClick={() => setOpen(false)}
              >
                <span className="brands-row-logo">
                  {b.logo ? (
                    <Image src={b.logo} alt="" width={80} height={30} style={{ height: "24px", width: "auto", objectFit: "contain" }} />
                  ) : (
                    <span className="brands-row-word">{b.name}</span>
                  )}
                </span>
                <span className="brands-row-text">
                  <span className="brands-row-name">{b.name}</span>
                  <span className="brands-row-seg">{b.segment}</span>
                </span>
                <span className="brands-row-arrow">
                  <ArrowIcon />
                </span>
              </Link>
            ))}
            <Link href={allHref} className="brands-row brands-row-all" onClick={() => setOpen(false)}>
              <span className="brands-row-text">
                <span className="brands-row-name">{dict.nav.viewAllBrands}</span>
              </span>
              <span className="brands-row-arrow">
                <ArrowIcon />
              </span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
