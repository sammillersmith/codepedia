import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { concepts, entries, languages } from "../reducers";
import { IEntry } from "./entry";

export interface IStore {
  concepts: Record<string, string[]>;
  languages: Record<string, string>;
  entries: IEntry[];
}

const rootReducer = combineReducers({
  concepts,
  entries,
  languages,
});

export const store = createStore<IStore, any, any, any>(
  rootReducer,
  applyMiddleware(thunk)
);
