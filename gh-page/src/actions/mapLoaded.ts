import type { Action } from "redux";

export const MAP_LOADED = "MAP_LOADED";

export type IMap = IFile[];

export interface IFile {
  path: string;
  concept: string;
  title?: string;
  description?: string;
  language?: string;
  keywords: string[];
}

export type MapLoadedAction = Action<typeof MAP_LOADED> & {
  map: IMap;
};
