"use client";

import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { getBrands } from "@/lib/brands";
import { useLocale } from "@/lib/i18n/LocaleContext";
import ProductModal from "@/components/ProductModal";
import ProductCard from "@/components/ProductCard";

export default function ProductTabs() {
  const { locale, dict } = useLocale();
  const searchParams = useSearchParams();
  const initialBrand = searchParams.get("brand");

  // Products page shows only ANICY, NICY and Avron as tabs — Milton isn't a
  // standalone product line here. It still appears on the Home page brand strip.
  const TAB_BRANDS = useMemo(
    () => getBrands(locale).filter((b) => b.slug !== "milton"),
    [locale]
  );

  const [active, setActive] = useState(
    TAB_BRANDS.some((b) => b.slug === initialBrand) ? initialBrand : TAB_BRANDS[0].slug
  );
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("all");

  useEffect(() => {
    if (initialBrand && TAB_BRANDS.some((b) => b.slug === initialBrand)) {
      setActive(initialBrand);
    }
  }, [initialBrand, TAB_BRANDS]);

  const brand = TAB_BRANDS.find((b) => b.slug === active) || TAB_BRANDS[0];

  // Some brands (currently NICY) split products into sub-categories, e.g.
  // girls' vs ladies' wear. Only show filter chips when a brand actually has them.
  const categories = useMemo(() => {
    const found = new Set();
    brand.products.forEach((p) => p.category && found.add(p.category));
    return Array.from(found);
  }, [brand]);

  const CATEGORY_LABELS = {
    girls: dict.products.categoryGirls,
    ladies: dict.products.categoryLadies,
  };

  const visibleProducts =
    categoryFilter === "all"
      ? brand.products
      : brand.products.filter((p) => p.category === categoryFilter);

  return (
    <>
      <div className="segmented-nav-wrap">
        <div className="wrap">
          <div className="segmented-nav">
            {TAB_BRANDS.map((b) => (
              <button
                key={b.slug}
                className={`segment${b.slug === active ? " active" : ""}`}
                style={b.slug === active ? { "--brand-accent": b.accent } : undefined}
                onClick={() => {
                  setActive(b.slug);
                  setSelectedProduct(null);
                  setCategoryFilter("all");
                }}
              >
                {b.logo && (
                  <Image
                    src={b.logo}
                    alt=""
                    width={80}
                    height={30}
                    style={{ height: "30px", width: "auto" }}
                  />
                )}
                {b.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section
        className="brand-hero"
        style={{ "--brand-accent": brand.accent, "--brand-accent-soft": `${brand.accent}1A` }}
      >
        <div className="blob brand-hero-blob" />
        <div className="wrap brand-hero-inner">
          {brand.logo ? (
            <Image
              src={brand.logo}
              alt={brand.name}
              width={200}
              height={76}
              style={{ height: "72px", width: "auto" }}
            />
          ) : (
            <div className="wordmark-lg">{brand.name}</div>
          )}
          <div className="seg-tag">
            {brand.segment} &middot; {brand.statusDetail}
          </div>
          {brand.description && <p className="brand-hero-desc">{brand.description}</p>}
        </div>
      </section>

      <section className="wrap" style={{ paddingTop: "50px" }}>
        {brand.comingSoon ? (
          <div className="avron-teaser">
            <div className="tag">{brand.comingSoon.tag}</div>
            <h3>{brand.comingSoon.heading}</h3>
            <p>{brand.comingSoon.copy}</p>
          </div>
        ) : (
          <>
            {categories.length > 0 && (
              <div className="category-filter" style={{ "--brand-accent": brand.accent }}>
                <button
                  className={`category-chip${categoryFilter === "all" ? " active" : ""}`}
                  onClick={() => setCategoryFilter("all")}
                >
                  {dict.products.categoryAll}
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    className={`category-chip${categoryFilter === cat ? " active" : ""}`}
                    onClick={() => setCategoryFilter(cat)}
                  >
                    {CATEGORY_LABELS[cat] || cat}
                  </button>
                ))}
              </div>
            )}
            <div className="product-grid">
              {visibleProducts.map((product, idx) => (
                <ProductCard
                  key={`${product.category || "x"}-${product.images?.[0] || product.name}-${idx}`}
                  product={product}
                  accent={brand.accent}
                  onSelect={setSelectedProduct}
                />
              ))}
            </div>
          </>
        )}
      </section>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          brandName={brand.name}
          accent={brand.accent}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
}
