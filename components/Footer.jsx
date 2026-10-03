"use client";

import { useLocale } from "@/lib/i18n/LocaleContext";

export default function Footer() {
  const { dict } = useLocale();
  const copyright = dict.footer.copyright.replace("{year}", new Date().getFullYear());

  return (
    <footer>
      <div className="wrap footer-inner">
        <div className="name">Milton Hosiery Industries</div>
        <div className="muted">{dict.footer.tagline}</div>
        <div className="muted">{copyright}</div>
      </div>
    </footer>
  );
}
