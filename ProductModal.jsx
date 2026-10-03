"use client";

import { useEffect, useState } from "react";
import { useLocale } from "@/lib/i18n/LocaleContext";

function GarmentMark({ accent }) {
  return (
    <svg
      className="garment-mark"
      viewBox="0 0 64 64"
      fill="none"
      style={{ "--mark-color": accent }}
      aria-hidden="true"
    >
      <path
        d="M22 8 L14 16 L18 22 L22 19 V54 H42 V19 L46 22 L50 16 L42 8 C42 12 38 15 32 15 C26 15 22 12 22 8Z"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ProductModal({ product, brandName, accent, onClose }) {
  const { dict } = useLocale();
  const hasPhotos = Array.isArray(product?.images) && product.images.length > 0;
  const [index, setIndex] = useState(0);

  const next = () => setIndex((i) => (i + 1) % product.images.length);
  const prev = () => setIndex((i) => (i - 1 + product.images.length) % product.images.length);

  useEffect(() => {
    setIndex(0);
  }, [product]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (hasPhotos && product.images.length > 1) {
        if (e.key === "ArrowRight") next();
        if (e.key === "ArrowLeft") prev();
      }
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onClose, hasPhotos, product]);

  if (!product) return null;

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
      onClick={onClose}
    >
      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" aria-label="Close" onClick={onClose}>
          &times;
        </button>

        {hasPhotos ? (
          <div className="modal-swatch modal-swatch-photo">
            <img src={product.images[index]} alt={product.name} />
            {product.images.length > 1 && (
              <>
                <button
                  className="modal-arrow modal-arrow-left"
                  onClick={prev}
                  aria-label="Previous image"
                >
                  &#8592;
                </button>
                <button
                  className="modal-arrow modal-arrow-right"
                  onClick={next}
                  aria-label="Next image"
                >
                  &#8594;
                </button>
                <div className="modal-dots">
                  {product.images.map((_, i) => (
                    <button
                      key={i}
                      className={`modal-dot${i === index ? " active" : ""}`}
                      onClick={() => setIndex(i)}
                      aria-label={`Show image ${i + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        ) : (
          <div
            className="modal-swatch"
            style={{ "--swatch-a": product.swatchA, "--swatch-b": product.swatchB }}
          >
            <GarmentMark accent={accent} />
            <span className="ph-label">{dict.common.photoPending}</span>
          </div>
        )}

        <div className="modal-body">
          <div className="modal-brand-tag" style={{ background: accent }}>
            {brandName}
          </div>
          <h3 id="product-modal-title">{product.name}</h3>
          {product.colors ? (
            <div className="modal-color-section">
              <div className="modal-color-label">
                {dict.products.colorOptions} ({product.colors.length})
              </div>
              <div className="modal-color-chips">
                {product.colors.map((c, i) => (
                  <span key={i} className="modal-color-chip">
                    <span className="modal-color-chip-swatch" style={{ background: c.hex }} />
                    {c.name}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            product.colorOptions && (
              <div className="modal-price">
                {dict.products.colorOptions}:{" "}
                <span className="modal-color-dots" aria-label={String(product.colorOptions)}>
                  {Array.from({ length: Math.min(product.colorOptions, 10) }).map((_, i) => (
                    <span key={i} className="modal-color-dot" style={{ background: accent }} />
                  ))}
                </span>
              </div>
            )
          )}
          {product.details && product.details.trim().startsWith(product.description?.trim()) ? (
            <p className="modal-details">{product.details}</p>
          ) : (
            <>
              <p className="modal-summary">{product.description}</p>
              <p className="modal-details">{product.details}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
