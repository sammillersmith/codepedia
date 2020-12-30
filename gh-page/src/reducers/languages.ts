import { MapLoadedAction, MAP_LOADED } from "../actions/mapLoaded";
import type { Reducer, Action } from "redux";

export const languages: Reducer<Record<string, string>> = (
  state: Record<string, string> = {},
  action: Action<any>
) => {
  switch (action.type) {
    case MAP_LOADED:
      const nextState = { ...state }
      const map = (action as MapLoadedAction).map;

      for (let m of map) {
        if (!m.language) { continue }
        nextState[m.language] = m.language
      }
      return nextState
  }
  return state;
};
