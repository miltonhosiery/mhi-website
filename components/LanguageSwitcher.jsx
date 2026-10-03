"use client";

import { usePathname, useRouter } from "next/navigation";
import { locales } from "@/lib/i18n/config";
import { useLocale } from "@/lib/i18n/LocaleContext";

const LABELS = { en: "EN", hi: "हि", mr: "मर" };

export default function LanguageSwitcher({ onNavigate }) {
  const pathname = usePathname();
  const router = useRouter();
  const { locale } = useLocale();

  const switchTo = (target) => {
    if (target === locale) return;
    document.cookie = `NEXT_LOCALE=${target}; path=/; max-age=31536000`;
    const segments = pathname.split("/");
    segments[1] = target;
    const newPath = segments.join("/") || `/${target}`;
    router.push(newPath);
    onNavigate?.();
  };

  return (
    <div className="lang-switch" role="group" aria-label="Language">
      {locales.map((loc) => (
        <button
          key={loc}
          className={`lang-btn${loc === locale ? " active" : ""}`}
          onClick={() => switchTo(loc)}
        >
          {LABELS[loc]}
        </button>
      ))}
    </div>
  );
}
