import en from "./dictionaries/en.json";
import hi from "./dictionaries/hi.json";
import mr from "./dictionaries/mr.json";
import { defaultLocale } from "./config";

const dictionaries = { en, hi, mr };

export function getDictionary(locale) {
  return dictionaries[locale] || dictionaries[defaultLocale];
}
