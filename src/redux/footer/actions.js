import { footerActionTypes as actionTypes } from "./types";

export const fetchMyCurrentPlaybackState = () => ({
  type: actionTypes.FETCH_CURRENT_PLAYBACK_STATE,
});

export const setCurrentPlaybackState = (payload) => ({
  type: actionTypes.SET_CURRENT_PLAYBACK_STATE,
  payload: payload,
});

export const caughtRemoteControlApiError = (error) => ({
  type: actionTypes.REMOTE_CONTROL_API_ERROR,
  payload: error,
});
