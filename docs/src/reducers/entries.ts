import { IEntry } from "../models/entry";
import type { Reducer, Action } from "redux";
import { AddEntryAction, ADD_ENTRY } from "../actions/addEntry";
import { UpdateEntryAction, UPDATE_ENTRY } from "../actions/updateEntry";

export const entries: Reducer<IEntry[]> = (
  state: IEntry[] = [],
  action: Action<any>
) => {
  switch (action.type) {
    case ADD_ENTRY:
      return addEntry([...state], action as AddEntryAction);

    case UPDATE_ENTRY:
      return updateEntry([...state], action as UpdateEntryAction);
  }
  return state;
};

const addEntry = (state: IEntry[], action: AddEntryAction): IEntry[] => {
  const newEntry = action as IEntry;
  delete (newEntry as any)["type"];

  // TODO: really this should be a map so we don't have to do all this
  for (let e of state) {
    if (e.language !== action.language) {
      continue;
    }
    if (e.concept !== action.concept) {
      continue;
    }
    if (e.mdBody !== action.mdBody) {
      continue;
    }
    return state;
  }

  state.push(newEntry);
  return state;
};

const updateEntry = (state: IEntry[], action: UpdateEntryAction): IEntry[] => {
  for (let eIdx = 0; eIdx < state.length; eIdx += 1) {
    const e = state[eIdx];
    if (e.language == action.language) {
      if (e.concept == action.concept) {
        e.mdBody = action.mdBody;
      }
    }
    state[eIdx] = e;
  }
  return state;
};
