import { ADD_ENTRY } from "../actions/addEntry";
import { IFile, IMap } from "../actions/mapLoaded";
import { Dispatch } from "redux";
import { URL_STARTER } from "./constants";
import { updateWithCodepediaTags } from "./updateWithCodepediaTags";
import { genUrl } from '../helpers/genUrl';

export const loadEntry = (concept: string, language?: string) => {
  const url = language
    ? `${URL_STARTER}/${concept}/${concept}.${language}.md`
    : `${URL_STARTER}/${concept}/${concept}.md`;

  return async (dispatch: Dispatch) => {
    try {
      const resp = await fetch(`/codepedia/${url}`);
      const mdBody = await resp.text();

      if (resp.ok && mdBody) {
        dispatch({ type: ADD_ENTRY, concept, language, mdBody });
        dispatch(updateWithCodepediaTags(mdBody, concept, language) as any);
      } else if (!resp.ok) {
        const resp = await fetch(`/${url}`);
        const mdBody = await resp.text();
        if (resp.ok && mdBody) {
          dispatch({ type: ADD_ENTRY, concept, language, mdBody });
          dispatch(updateWithCodepediaTags(mdBody, concept, language) as any);
        }
      }
    } catch (e) {}
  };
};

const loadEntryFromMap = (f: IFile) => {
  return async (dispatch: Dispatch) => {

    try {
    const resp = await fetch(genUrl(f.path));
    const mdBody = await resp.text();

    if (resp.ok && mdBody) {
      dispatch({ type: ADD_ENTRY, ...f, mdBody });
      dispatch(updateWithCodepediaTags(mdBody, f.concept, f.language) as any);
    }
  } catch (e) {

  }
  }
}

export const loadAllEntries = (map: IMap) => {
  return async (dispatch: Dispatch) => {
    for (let f of map) {
      console.log('loading', f.path)
      dispatch(loadEntryFromMap(f) as any);
    }
  };
};
