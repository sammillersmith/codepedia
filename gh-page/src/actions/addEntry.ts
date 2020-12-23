import { IEntry } from "models/entry";
import { Action } from "redux";

export const ADD_ENTRY = "ADD_ENTRY";
export type AddEntryAction = Action<typeof ADD_ENTRY> & IEntry;
