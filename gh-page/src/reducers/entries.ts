import { IEntry } from "../models/entry";
import type { Reducer, Action } from "redux";
import { AddEntryAction, ADD_ENTRY } from "../actions/addEntry";
import { UpdateEntryAction, UPDATE_ENTRY } from "../actions/updateEntry";
import { MapLoadedAction, MAP_LOADED } from '../actions/mapLoaded';

export const entries: Reducer<IEntry[]> = (
  state: IEntry[] = [],
  action: Action<any>
) => {
  switch (action.type) {
    case ADD_ENTRY:
      return addEntry([...state], action as AddEntryAction);

    case UPDATE_ENTRY:
      return updateEntry([...state], action as UpdateEntryAction);

    case MAP_LOADED:
      return addEntries(action as MapLoadedAction);
  }
  return state;
};

const addEntry = (state: IEntry[], action: AddEntryAction): IEntry[] => {
  const newEntry = action as IEntry;
  delete (newEntry as any)["type"];

  // if there is an exact match, don't change anything
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

const addEntries = ( action: MapLoadedAction): IEntry[] => {
  const out: IEntry[] = [];
  for (let entry of action.map) {
    out.push({ ...entry, mdBody: "" })
  }
  return out;
}

const updateEntry = (state: IEntry[], action: UpdateEntryAction): IEntry[] => {
  const updatedState = [...state];

  for (let eIdx = 0; eIdx < updatedState.length; eIdx += 1) {
    const e = {...updatedState[eIdx]};
    if (e.language == action.language) {
      if (e.concept == action.concept) {
        e.mdBody = action.mdBody;
      }
    }
    updatedState[eIdx] = e;
  }

  return updatedState;
};
