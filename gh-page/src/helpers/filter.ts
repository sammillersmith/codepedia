import { IEntry } from "models/entry";
import { lookupValue } from "./lookupInDict";

export const isValidForFilter = (
  entry: IEntry,
  filterTxt: string,
  languages: Record<string, string>,
  concepts: Record<string, string[]>
) => {
  if (!filterTxt) {
    return true;
  }

  // ==> Languages
  if (entry.language) {
    if (isContained(entry.language, filterTxt)) {
      return true;
    }
    const langName = lookupValue(languages, entry.language);
    if (isContained(langName, filterTxt)) {
      return true;
    }
  }

  // ==> Concepts
  if (isContained(entry.concept, filterTxt)) {
    return true;
  }
  const conceptName = lookupValue(concepts, entry.concept);
  if (isContained(conceptName, filterTxt)) {
    return true;
  }

  // ==> Body text (OPTIONAL)
  //   if (isContained(entry.mdBody, filterTxt)) {
  //     return true;
  //   }

  return false;
};

const isContained = (strA: string = "", strB: string = ""): boolean => {
  if (!strA || !strB) {
    return true;
  }
  const strANormalized = strA.toLowerCase();
  const strBNormalized = strB.toLowerCase();

  if (strANormalized.indexOf(strBNormalized) !== -1) {
    return true;
  }
  if (strBNormalized.indexOf(strANormalized) !== -1) {
    return true;
  }
  return false;
};
