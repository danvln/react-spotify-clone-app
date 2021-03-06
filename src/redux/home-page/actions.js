import { homePageActionTypes as actionTypes } from "./types";

export const fetchHomePageDataStart = () => ({
  type: actionTypes.FETCH_HOME_PAGE_DATA_START,
});

export const setMySavedTracks = (tracks) => ({
  type: actionTypes.SET_MY_SAVED_TRACKS,
  payload: tracks,
});

export const setRecentTracks = (tracks) => ({
  type: actionTypes.SET_MY_RECENT_TRACKS,
  payload: tracks,
});

export const setTopTracks = (tracks) => ({
  type: actionTypes.SET_MY_TOP_TRACKS,
  payload: tracks,
});
