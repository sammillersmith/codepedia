import { ADD_ENTRY } from "../actions/addEntry";
import { IMap } from "../actions/mapLoaded";
import { Dispatch } from "redux";
import { URL_STARTER } from "./constants";
import { IStore } from "../models";
import { selectRelevantEntry } from "../selectors";

export const loadEntry = (concept: string, language?: string) => {
  const url = language
    ? `${URL_STARTER}/${concept}/${concept}.${language}.md`
    : `${URL_STARTER}/${concept}/${concept}.md`;

  return async (dispatch: Dispatch, getState: () => IStore) => {
    try {
      const resp = await fetch(`/codepedia/${url}`);
      const mdBody = await resp.text();

      if (resp.ok && mdBody) {
        const updatedMd = insertCodepediaTags(
          mdBody,
          getState(),
          concept,
          language
        );
        dispatch({ type: ADD_ENTRY, concept, language, mdBody: updatedMd });
      } else if (!resp.ok) {
        const resp = await fetch(`/${url}`);
        const mdBody = await resp.text();
        if (resp.ok && mdBody) {
          const updatedMd = insertCodepediaTags(
            mdBody,
            getState(),
            concept,
            language
          );
          dispatch({ type: ADD_ENTRY, concept, language, mdBody: updatedMd });
        }
      }
    } catch (e) {}
  };
};

export const loadAllEntries = (map: IMap) => {
  return async (dispatch: Dispatch) => {
    for (let keyword of Object.keys(map.concepts)) {
      for (let concept of map.concepts[keyword]) {
        dispatch(loadEntry(concept) as any);

        for (let languageName of Object.keys(map.languages)) {
          const language = map.languages[languageName];
          dispatch(loadEntry(concept, language) as any);
        }
      }
    }
  };
};

const insertCodepediaTags = (
  mdBody: string,
  state: IStore,
  rootConcept: string,
  rootLanguage?: string
) => {
  let out = mdBody;
  for (let c of Object.keys(state.concepts)) {
    if (state.concepts[c].indexOf(rootConcept) !== -1) {
      continue;
    }
    const concept = state.concepts[c][0];
    const entry = selectRelevantEntry(state, concept, rootLanguage);

    if (!entry) {
      continue;
    }

    const regex = new RegExp(`(${c})`, "i");

    const toReplace = `<Codepedia concept='${entry.concept}' language='${
      entry.language ? entry.language : ""
    }'>$1</Codepedia>`;

    out = out.replace(regex, toReplace);
  }
  return out;
};
