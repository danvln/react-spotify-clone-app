import React, { useEffect, useRef, useState } from "react";

import SearchIcon from "@material-ui/icons/Search";

import useDebounce from "../../../utils/useDebounce";

import { searchSpotifyAsync } from "../../../redux/search-page/async-actions";

import "./SearchField.css";

function SearchField({ dispatch, displaySearchBar }) {
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (displaySearchBar) searchInputRef.current.focus();
  }, [displaySearchBar]);

  const [searchTerm, setSearchTerm] = useState("");
  const handleChange = (e) => setSearchTerm(e.target.value);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(
    () => {
      debouncedSearchTerm && searchSpotifyAsync(debouncedSearchTerm, dispatch);
    },
    [dispatch, debouncedSearchTerm] // Only call effect if debounced search term changes
  );

  return (
    <div className="searchField">
      <SearchIcon />
      <input
        ref={searchInputRef}
        type="text"
        placeholder="Search for Artists, Albums and Playlists"
        value={searchTerm}
        onChange={handleChange}
      />
    </div>
  );
}

export default SearchField;
