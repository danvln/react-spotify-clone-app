import React from "react";

import { useDataLayerValue } from "../../state/DataLayer";
import ImageFader from "../ImageFader";

import "./PlaylistBanner.css";

function PlaylistBanner() {
  const { state } = useDataLayerValue();
  const { playlist } = state;

  return (
    <div className="playlistBanner">
      <div className="playlistBanner__info">
        <ImageFader src={playlist?.images[0].url} type="crossFade" />
        <div className="playlistBanner__infoText">
          <strong>Playlist</strong>
          <h2>{playlist?.name}</h2>
          <p>{playlist?.description}</p>
        </div>
      </div>
    </div>
  );
}

export default PlaylistBanner;
