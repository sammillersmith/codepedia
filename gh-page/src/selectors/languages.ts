import { lookupValue } from "../helpers/lookupInDict";
import { IStore } from "../models";
import { selectEntriesForConcept } from "./entries";

export const selectLanguages = (s: IStore) => s.languages;

export const selectLanguageName = (s: IStore, languageId: string) => {
  const l = selectLanguages(s);
  if (languageId) {
    return lookupValue(l, languageId);
  } else {
    return "Multiple Languages";
  }
};

export const selectLanguagesForConcept = (s: IStore, concept: string) => {
  const languages: Record<string, string> = {};
  const entries = selectEntriesForConcept(s, concept);
  for (let e of entries) {
    const lName = selectLanguageName(s, e.language);
    languages[lName] = e.language;
  }
  return languages;
};
