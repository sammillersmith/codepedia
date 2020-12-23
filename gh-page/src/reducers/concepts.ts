import { MapLoadedAction, MAP_LOADED } from "../actions/mapLoaded";
import type { Reducer, Action } from "redux";

export const concepts: Reducer<Record<string, string[]>> = (
  state: Record<string, string[]> = {},
  action: Action<any>
) => {
  switch (action.type) {
    case MAP_LOADED:
      const nextState = { ...state };
      const concepts = (action as MapLoadedAction).map.concepts;
      for (let k of Object.keys(concepts)) {
        if (nextState[k]) {
          nextState[k] = nextState[k].concat(concepts[k]);
        } else {
          nextState[k] = [...concepts[k]];
        }
      }
      return nextState;
  }
  return state;
};
