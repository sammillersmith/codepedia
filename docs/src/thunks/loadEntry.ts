import { ADD_ENTRY } from "../actions/addEntry";
import { IMap } from "../actions/mapLoaded";
import { Dispatch } from "redux";
import { URL_STARTER } from "./constants";

export const loadEntry = (concept: string, language?: string) => {
  const url = language
    ? `${URL_STARTER}/${concept}/${concept}.${language}.md`
    : `${URL_STARTER}/${concept}/${concept}.md`;

  return async (dispatch: Dispatch) => {
    try {
      const resp = await fetch(`/winter-hackathon-2020/${url}`);
      const mdBody = await resp.text();

      if (resp.ok && mdBody) {
        dispatch({ type: ADD_ENTRY, concept, language, mdBody });
      } else if (!resp.ok) {
        const resp = await fetch(`/${url}`);
        const mdBody = await resp.text();
        if (resp.ok && mdBody) {
          dispatch({ type: ADD_ENTRY, concept, language, mdBody });
        } 
      }

    } catch (e) { }
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
