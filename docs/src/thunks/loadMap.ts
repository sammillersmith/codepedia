import { MAP_LOADED } from "../actions/mapLoaded";
import { Dispatch } from "redux";
import { URL_STARTER } from "./constants";
import { loadAllEntries } from './loadEntry';

export const loadMap = () => {
  return async (dispatch: Dispatch) => {

    try {
      const resp = await fetch(`/winter-hackathon-2020/${URL_STARTER}/map.json`);
      const map = await resp.json();
      onMapResponse(map, dispatch)
    } catch (e) {
      const resp = await fetch(`/${URL_STARTER}/map.json`);
      const map = await resp.json();
      onMapResponse(map, dispatch)
    }
  };
};

const onMapResponse = (map: any, dispatch: Dispatch) => {
  dispatch({ type: MAP_LOADED, map });
  dispatch(loadAllEntries(map) as any);
}
