import { IEntry } from "models/entry";
import { Action } from "redux";

export const UPDATE_ENTRY = "UPDATE_ENTRY";
export type UpdateEntryAction = Action<typeof UPDATE_ENTRY> & IEntry;
