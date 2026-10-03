"use client";

import { createContext, useContext } from "react";

const LocaleContext = createContext({ locale: "en", dict: null });

export function LocaleProvider({ locale, dict, children }) {
  return (
    <LocaleContext.Provider value={{ locale, dict }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}
