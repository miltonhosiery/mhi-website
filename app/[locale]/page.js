import Link from "next/link";
import Image from "next/image";
import CtaPanel from "@/components/CtaPanel";
import { getBrands } from "@/lib/brands";
import { getDictionary } from "@/lib/i18n/getDictionary";

export default async function HomePage({ params }) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const brands = getBrands(locale);

  return (
    <div>
      <section className="hero">
        <div className="blob blob-a" />
        <div className="blob blob-b" />
        <div className="wrap">
          <div className="hero-grid">
            <div>
              <div className="eyebrow-line">{dict.home.eyebrow}</div>
              <h1 className="hero-title">{dict.home.title}</h1>
              <p className="hero-copy">{dict.home.copy}</p>
              <div className="hero-actions">
                <Link href={`/${locale}/contact`} className="btn btn-primary">
                  {dict.common.startEnquiry}
                </Link>
                <Link href={`/${locale}/products`} className="btn btn-outline">
                  {dict.common.seeOurBrands}
                </Link>
              </div>
            </div>
            <div className="hero-panel">
              <div className="label">{dict.home.panelLabel}</div>
              <div className="figure">{dict.home.panelFigure}</div>
              <p>{dict.home.panelCopy}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="wave" aria-hidden="true">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path
            d="M0,40 C 320,90 480,0 720,20 C 960,40 1120,90 1440,30 L1440,80 L0,80 Z"
            fill="#EEF4FC"
          />
        </svg>
      </div>

      <section className="section-alt">
        <div className="wrap">
          <div className="section-head">
            <h2>{dict.home.sectionHeading}</h2>
            <p>{dict.home.sectionCopy}</p>
          </div>
          <div className="swatch-strip">
            {brands.map((brand) => (
              <Link
                key={brand.slug}
                href={`/${locale}/products?brand=${brand.slug}`}
                className={`swatch${brand.slug === "avron" ? " muted" : ""}`}
              >
                <div className="logo-box">
                  {brand.logo ? (
                    <Image src={brand.logo} alt={brand.name} width={120} height={30} style={{ height: "30px", width: "auto" }} />
                  ) : (
                    <span className="wordmark">{brand.name}</span>
                  )}
                </div>
                <div className="seg">{brand.homeBlurb}</div>
                <div className="status">{brand.status}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="wave" style={{ transform: "rotate(180deg)" }} aria-hidden="true">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path
            d="M0,40 C 320,90 480,0 720,20 C 960,40 1120,90 1440,30 L1440,80 L0,80 Z"
            fill="#EEF4FC"
          />
        </svg>
      </div>

      <section className="wrap">
        <div className="split">
          <div>
            <h2>{dict.home.retailersHeading}</h2>
            <p>{dict.home.retailersCopy}</p>
          </div>
          <div>
            <h2>{dict.home.institutionalHeading}</h2>
            <p>{dict.home.institutionalCopy}</p>
          </div>
        </div>
      </section>

      <section className="wrap" style={{ paddingTop: 0, paddingBottom: "110px" }}>
        <CtaPanel
          heading={dict.home.ctaHeading}
          copy={dict.home.ctaCopy}
          buttonLabel={dict.common.startEnquiry}
          href={`/${locale}/contact`}
        />
      </section>
    </div>
  );
}
