import { Suspense } from "react";
import CtaPanel from "@/components/CtaPanel";
import ProductTabs from "@/components/ProductTabs";
import { getDictionary } from "@/lib/i18n/getDictionary";

export const metadata = {
  title: "Products — Milton Hosiery Industries",
};

export default async function ProductsPage({ params }) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  return (
    <div>
      <Suspense fallback={null}>
        <ProductTabs />
      </Suspense>

      <section className="wrap" style={{ paddingTop: "20px", paddingBottom: "110px" }}>
        <CtaPanel
          heading={dict.products.ctaHeading}
          copy={dict.products.ctaCopy}
          buttonLabel={dict.common.startEnquiry}
          href={`/${locale}/contact`}
        />
      </section>
    </div>
  );
}
