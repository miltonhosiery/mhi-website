import Link from "next/link";

export default function CtaPanel({ heading, copy, buttonLabel, href = "/contact" }) {
  return (
    <div className="cta-panel">
      <h2>{heading}</h2>
      <p>{copy}</p>
      <Link href={href} className="btn btn-primary">
        {buttonLabel}
      </Link>
    </div>
  );
}
