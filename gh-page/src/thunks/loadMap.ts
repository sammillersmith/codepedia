import { MAP_LOADED } from "../actions/mapLoaded";
import { Dispatch } from "redux";
import { loadAllEntries } from "./loadEntry";
import { getMapUrl } from '../helpers/genUrl';

export const loadMap = () => {
  return async (dispatch: Dispatch) => {
    try {
      const resp = await fetch(getMapUrl());
      const map = await resp.json();
      onMapResponse(map, dispatch);
    } catch (e) {
    }
  };
};

const onMapResponse = (map: any, dispatch: Dispatch) => {
  dispatch({ type: MAP_LOADED, map });
  dispatch(loadAllEntries(map) as any);
};
