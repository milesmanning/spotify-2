import useSpotify from '../hooks/useSpotify';
import useSongInfo from '../hooks/useSongInfo';
import { useSession } from 'next-auth/react';
import { useRecoilState } from 'recoil';
import { useState, useEffect } from 'react';
import { currentTrackIdState, isPlayingState } from '../atoms/songAtom';
import {
  PlayIcon,
  PauseIcon,
  } from '@heroicons/react/outline';

function Player() {
  const { data: session, status } = useSession();
  const spotifyApi = useSpotify();
  const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useState(50);
  const songInfo = useSongInfo();
  console.log('songInfo:  ', songInfo);


  return (
    <div className='flex'>
      {/* Left */}
      <div>
        <img 
          className='hidden md:inline h-10 w-10'
          src={songInfo?.album?.images[0]?.url}
        />

        {isPlaying ?
        <PauseIcon
          className='h-5 w-5 text-gray-400'
          onClick={() => setIsPlaying(false)}
        /> :
        <PlayIcon
          className='h-5 w-5 text-gray-400'
          onClick={() => setIsPlaying(true)}
        />
        }
      </div>
    </div>
  )
}

export default Player
