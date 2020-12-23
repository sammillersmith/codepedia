import { lookupValue } from "../helpers/lookupInDict";
import { IStore } from "models";
import { selectEntriesForLanguage } from "./entries";

export const selectConcepts = (s: IStore) => {
  return s.concepts;
};

export const selectConceptName = (s: IStore, conceptId: string) => {
  const c = selectConcepts(s);
  return lookupValue(c, conceptId);
};

export const selectConceptsForLanguage = (s: IStore, language: string) => {
  const out: Record<string, string[]> = {};
  const entries = selectEntriesForLanguage(s, language);
  for (let e of entries) {
    const cName = selectConceptName(s, e.concept);
    out[cName] = [e.concept];
  }
  return out;
};
