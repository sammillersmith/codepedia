import { IEntry } from "models/entry";
import { NavigateFn } from "@reach/router";
import { genUrl } from "./genUrl";

export const navigateToEntry = (navigate: NavigateFn, entry: IEntry) => {
  navigateToConceptAndLanguage(navigate, entry.concept, entry.language);
};

export const navigateToConceptAndLanguage = (
  navigate: NavigateFn,
  concept: string,
  language: string
) => {
  navigate(genUrl(`entries/${concept}/${language || ""}`));
  window.scrollTo(0, 0);
};

export const navigateToRoot = (navigate: NavigateFn) => {
  navigate(genUrl(""));
  window.scrollTo(0, 0);
};
