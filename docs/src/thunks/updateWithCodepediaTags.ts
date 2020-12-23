import { IStore } from "../models";
import type { Dispatch } from "redux";
import { IEntry } from "../models/entry";
import { selectRelevantEntry } from "../selectors";
import { UPDATE_ENTRY } from "../actions/updateEntry";

export const updateWithCodepediaTags = (
  mdBody: string,
  rootConcept: string,
  rootLanguage?: string
) => {
  return async (dispatch: Dispatch, getState: () => IStore) => {
    const state = getState();

    let out: IEntry = {
      concept: rootConcept,
      language: rootLanguage || "",
      mdBody: mdBody,
    };

    // loop through each concept to try to find potential
    // matches with loaded concepts
    for (let c of Object.keys(state.concepts)) {
      if (state.concepts[c].indexOf(rootConcept) !== -1) {
        continue;
      }
      const concept = state.concepts[c][0];
      const entry = selectRelevantEntry(state, concept, rootLanguage);

      // TODO: allow for cases where the relevant entry doesn't load for a bit
      if (!entry) {
        continue;
      }

      const regex = new RegExp(`(${c})`, "i");

      const toReplace = `<Codepedia concept='${entry.concept}' language='${
        entry.language ? entry.language : ""
      }'>$1</Codepedia>`;

      if (regex.exec(out.mdBody)) {
        console.log(`${rootConcept}, ${rootLanguage} --> ${c}`);
      }

      out.mdBody = out.mdBody.replace(regex, toReplace);
    }

    dispatch({ type: UPDATE_ENTRY, ...out });
  };
};
