import { useRecoilState, useRecoilValue } from 'recoil';
import { playlistIdState, playlistState } from '../atoms/playlistAtom';
import Song from './Song';


function Songs() {
const playlist = useRecoilValue(playlistState);

  return (
    <div className='px-8 flex flex-col space-y-1 pb-28 text-white
      overflow-y-scroll
    '>
      {playlist?.tracks.items.map((track, index) => (
        <Song
          key={track.track.id}
          track={track}
          index={index}
          name={track.track.name}
        />
      ))}
    </div>
  )
}

export default Songs;
