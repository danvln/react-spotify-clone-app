import React from "react";

import { useSpotifyWebPlaybackSDK } from "../../libs/spotify";
import { getToken } from "../../utils/localStorage";

import { useDataLayerValue } from "../../state/DataLayer";
import * as actions from "../../state/actions";

import "./SpotifyAudioPlayer.css";

import TrackPanel from "./TrackPanel";
import CentralPanel from "./CentralPanel";
import RightPanel from "./RightPanel";

function SpotifyAudioPlayer() {
  const { state, dispatch } = useDataLayerValue();
  const { currentplaybackState } = state;

  useSpotifyWebPlaybackSDK({
    token: getToken(),
    onPlayerStateChanged: (playbackState) => {
      //Normally, i would use the values of the `playbackState` object returned here, however, the Spotify Playback SDK is in BETA at this very moment, and the data is not consistent with the data provided through the Spotify Web API.  Therefore, I make here yet another request, just to get consistent data object types
      actions.getMyCurrentPlaybackStateAsync(dispatch);
    },
  });

  const currentTrackName = currentplaybackState?.item.name;
  const albumImage = currentplaybackState?.item.album.images[2].url;
  const albumName = currentplaybackState?.item.album?.name;
  const artists = currentplaybackState?.item.artists
    .reduce((prevVal, currVal) => {
      return [...prevVal, currVal.name];
    }, [])
    .join(", ");

  return (
    <div className="spotifyAudioPlayer">
      <div className="spotifyAudioPlayer__left">
        <TrackPanel
          shouldDisplay={currentplaybackState?.item}
          image={albumImage}
          title={currentTrackName}
          artists={artists}
          album={albumName}
        />
      </div>

      <div className="spotifyAudioPlayer__center">
        <CentralPanel
          isPlaying={currentplaybackState?.is_playing}
          shuffle={currentplaybackState?.shuffle_state}
          repeat={currentplaybackState?.repeat_state}
          onRepeatChange={(value) => actions.toggleRepeat(value)}
          onShuffleChange={(value) => actions.toggleShuffle(value)}
          onSkipPrevious={() => actions.skipToPrevious()}
          onSkipNext={() => actions.skipToNext()}
          onPlayPause={(value) => {
            actions.togglePlayPause(value);
          }}
        />
      </div>

      <div className="spotifyAudioPlayer__right">
        <RightPanel
          isPlaying={currentplaybackState?.is_playing}
          onMuteChange={(_value) => actions.setVolume(_value)}
          onVolumeChange={(_value) => actions.setVolume(_value)}
          volume={currentplaybackState?.device.volume_percent}
        />
      </div>
    </div>
  );
}

export default SpotifyAudioPlayer;
