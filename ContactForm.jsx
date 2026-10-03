"use client";

import { useState } from "react";
import { useLocale } from "@/lib/i18n/LocaleContext";

const initialState = {
  name: "",
  company: "",
  email: "",
  phone: "",
  brand: "",
  message: "",
};

export default function ContactForm() {
  const { dict } = useLocale();
  const brandOptions = dict.form.brandOptions;
  const [form, setForm] = useState({ ...initialState, brand: brandOptions[0] });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      setForm({ ...initialState, brand: brandOptions[0] });
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="field-row">
        <div className="field">
          <label htmlFor="f-name">{dict.form.fullName}</label>
          <input
            id="f-name"
            type="text"
            required
            placeholder={dict.form.fullNamePlaceholder}
            value={form.name}
            onChange={update("name")}
          />
        </div>
        <div className="field">
          <label htmlFor="f-company">{dict.form.companyName}</label>
          <input
            id="f-company"
            type="text"
            required
            placeholder={dict.form.companyNamePlaceholder}
            value={form.company}
            onChange={update("company")}
          />
        </div>
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="f-email">{dict.form.email}</label>
          <input
            id="f-email"
            type="email"
            required
            placeholder={dict.form.emailPlaceholder}
            value={form.email}
            onChange={update("email")}
          />
        </div>
        <div className="field">
          <label htmlFor="f-phone">{dict.form.phone}</label>
          <input
            id="f-phone"
            type="tel"
            required
            placeholder={dict.form.phonePlaceholder}
            value={form.phone}
            onChange={update("phone")}
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor="f-brand">{dict.form.brandInterest}</label>
        <select id="f-brand" value={form.brand} onChange={update("brand")}>
          {brandOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="f-message">{dict.form.message}</label>
        <textarea
          id="f-message"
          rows={3}
          required
          placeholder={dict.form.messagePlaceholder}
          value={form.message}
          onChange={update("message")}
        />
      </div>

      <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
        {status === "sending" ? dict.form.sending : dict.form.send}
      </button>

      {status === "success" && <p className="form-status success">{dict.form.success}</p>}
      {status === "error" && <p className="form-status error">{dict.form.error}</p>}
    </form>
  );
}
