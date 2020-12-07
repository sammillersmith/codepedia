import { languages } from "reducers";
import { IStore } from "../models";

export const selectEntries = (s: IStore) => {
  return s.entries;
};

export const selectEntriesForConcept = (s: IStore, concept: string) =>
  s.entries.filter((e) => !!(e.concept === concept));

export const selectEntriesForConceptAndLanugage = (
  s: IStore,
  concept: string,
  language: string,
  forceLanguageMatch?: boolean
) => {
  if (!concept && !language) {
    return selectEntries(s);
  }

  if (!concept) {
    return selectEntriesForLanguage(s, language);
  }

  if (!language &&!forceLanguageMatch) {
    return selectEntriesForConcept(s, concept);
  } 

  return s.entries.filter(
    (e) => {
      return !!(e.concept === concept) && !!((e.language || "") === language)
    });
};

export const selectEntriesForLanguage = (s: IStore, language: string) =>
  s.entries.filter((e) => !!(e.language === language));

export const selectEntry = (s: IStore, concept: string, language: string) => {
  const entries = selectEntriesForConceptAndLanugage(s, concept, language, true);
  
  if (entries.length >= 1) {
    return entries[0];
  }
  return null;
};
