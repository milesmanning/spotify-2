import { useRecoilState, useRecoilValue } from 'recoil';
import { playlistIdState, playlistState } from '../atoms/playlistAtom';
import SearchSong from './SearchSong';

function SearchSongs({ trackResults }) {

  return (
    <div className='px-8 flex flex-col space-y-1 pb-28 text-white
      overflow-y-scroll relative top-20
    '>
      {trackResults.map((track, index) => (
        <SearchSong
          key={track.id}
          track={track}
          index={index}
          name={track.name}
        />
      ))}
    </div>
  )
}

export default SearchSongs;