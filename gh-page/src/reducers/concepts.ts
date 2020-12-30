import { MapLoadedAction, MAP_LOADED } from "../actions/mapLoaded";
import type { Reducer, Action } from "redux";

export const concepts: Reducer<Record<string, string[]>> = (
  state: Record<string, string[]> = {},
  action: Action<any>
) => {
  switch (action.type) {
    case MAP_LOADED:
      const nextState = { ...state };

      const map = (action as MapLoadedAction).map;

      for (let m of map) {
        const k = m.concept;
        if (nextState[k]) {
          nextState[k] = nextState[k].concat(k);
        } else {
          nextState[k] = [k];
        }
      }
      return nextState;
  }
  return state;
};
