import React from "react";
import { useHistory } from "react-router-dom";

import ItemCover from "../ItemCover";

import "./PlaylistsGrid.css";

function PlaylistsGrid({ playlists }) {
  const history = useHistory();

  return (
    <div className="playlistsGrid">
      {playlists?.map((playlist) => (
        <ItemCover
          key={playlist.id}
          item={playlist}
          onClick={() => history.push(`/playlist/${playlist.id}`)}
        />
      ))}
    </div>
  );
}

export default PlaylistsGrid;