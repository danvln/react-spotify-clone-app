import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { getHashFromResponse } from "../../utils/http";
import { spotifyAPI } from "../../libs/spotify";
import * as ls from "../../utils/localStorage";
import { addMsToNow } from "../../utils/time";

import * as actions from "../../redux/auth/actions";
import { getMeAsync } from "../../redux/auth/async-actions";

const SpotifyLogin = ({ history }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const hash = getHashFromResponse(window.location.hash);

    /**
     * this one ("/access_token") has a "/", why ? Because of HashRouter.
     * why HashRouter instead of typical BrowserRouter ?
     *
     * => https://github.com/boostup/react-spotify-clone-app/pull/2
     */
    const _token = hash["/access_token"];

    if (_token) {
      dispatch(actions.setToken(_token));
      ls.setToken(_token);
      spotifyAPI.setAccessToken(_token);
      const expiryTime = addMsToNow(hash["expires_in"]);
      dispatch(actions.setTokenExpiry(expiryTime));
      ls.setTokenExpiry(expiryTime);

      getMeAsync(dispatch).then((user) => {
        ls.setUser(user);
        history.push("/");
      });
    }
  }, [dispatch, history]);

  return null;
};

export default SpotifyLogin;
