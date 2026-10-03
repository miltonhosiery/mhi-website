import CtaPanel from "@/components/CtaPanel";
import { getDictionary } from "@/lib/i18n/getDictionary";

export const metadata = {
  title: "About — Milton Hosiery Industries",
};

export default async function AboutPage({ params }) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const a = dict.about;

  return (
    <div>
      <section className="wrap about-hero" style={{ paddingBottom: 0 }}>
        <div className="eyebrow-line">{a.eyebrow}</div>
        <h1>{a.title}</h1>
      </section>

      <section className="wrap">
        <div className="section-head" style={{ marginBottom: 0, maxWidth: "70ch" }}>
          <h2>{a.heritageHeading}</h2>
          <p>{a.heritageCopy}</p>
        </div>
      </section>

      <section className="section-alt">
        <div className="wrap">
          <div className="section-head">
            <h2>{a.brandsHeading}</h2>
          </div>
          <div className="about-brands">
            {a.brands.map((b) => (
              <div className="about-brand" key={b.name}>
                <h3>{b.name}</h3>
                <p>{b.desc}</p>
                {b.soon && <span className="about-soon">{a.comingSoon}</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap">
        <div className="split">
          <div>
            <h2>{a.manufacturingHeading}</h2>
            <p>{a.manufacturingCopy}</p>
            <div className="about-stats">
              {a.stats.map((s) => (
                <div className="about-stat" key={s.label}>
                  <div className="fig">{s.figure}</div>
                  <div className="lbl">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2>{a.qualityHeading}</h2>
            <p>{a.qualityCopy}</p>
          </div>
        </div>
      </section>

      <section className="section-alt">
        <div className="wrap">
          <div className="section-head">
            <h2>{a.partnerHeading}</h2>
          </div>
          <ul className="about-checks">
            {a.partnerPoints.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="wrap">
        <div className="split">
          <div>
            <h2>{a.visionHeading}</h2>
            <p>{a.visionCopy}</p>
          </div>
          <div>
            <h2>{a.customersHeading}</h2>
            <p>{a.customersCopy}</p>
          </div>
        </div>
      </section>

      <section className="wrap" style={{ paddingBottom: "110px" }}>
        <CtaPanel
          heading={a.ctaHeading}
          copy={a.ctaCopy}
          buttonLabel={a.ctaButton}
          href={`/${locale}/contact`}
        />
      </section>
    </div>
  );
}
