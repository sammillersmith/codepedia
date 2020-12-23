import { MapLoadedAction, MAP_LOADED } from "../actions/mapLoaded";
import type { Reducer, Action } from "redux";

export const languages: Reducer<Record<string, string>> = (
  state: Record<string, string> = {},
  action: Action<any>
) => {
  switch (action.type) {
    case MAP_LOADED:
      state = { ...state, ...(action as MapLoadedAction).map.languages };
  }
  return state;
};
