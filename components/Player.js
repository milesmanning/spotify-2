import useSpotify from '../hooks/useSpotify';
import { useSession } from 'next-auth/react';
import { useRecoilState } from 'recoil';
import { currentTrackIdState, isPlayingState } from '../atoms/songAtom';


function Player() {
  const { data: session, status } = useSession();
  const spotifyApi = useSpotify();
  const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);


  return (
    <div className=''>
      {/* Left */}
      <div>
        <img 
          src=''
        />
      </div>
    </div>
  )
}

export default Player
