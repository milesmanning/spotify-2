import useSpotify from '../hooks/useSpotify';
import { useState, useEffect } from 'react';
import SearchSongs from '../components/SearchSongs';
import SearchBar from '../components/SearchBar';
import { signOut, useSession } from 'next-auth/react';

function Search() {

  const spotifyApi=useSpotify();
  const [trackResults, setTrackResults] = useState([]);

  const handleSearchInput = (e) => {
    console.log('input e:  ', e.target.value);
    spotifyApi.searchTracks(e.target.value)
    .then(function(data) {
      setTrackResults(data.body.tracks.items);
      console.log('trackResults:  ', trackResults);
    }, function(err) {
      console.log('Something went wrong!', err);
    });
  }

  return (
    <div className='flex-grow h-screen overflow-y-scroll scrollbar-hide'>
      <SearchBar handleSearchInput={handleSearchInput}/>
      <SearchSongs
        trackResults={trackResults}
        className='text-white'
      />
    </div>
  )
}

export default Search;
