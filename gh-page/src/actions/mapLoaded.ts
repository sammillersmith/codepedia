import type { Action } from "redux";

export const MAP_LOADED = "MAP_LOADED";

export interface IMap {
  concepts: Record<string, string[]>;
  languages: Record<string, string>;
}

export type MapLoadedAction = Action<typeof MAP_LOADED> & {
  map: IMap;
};
