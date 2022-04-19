import { debounce } from 'lodash';
import useSpotify from '../hooks/useSpotify';
import useSongInfo from '../hooks/useSongInfo';
import { useSession } from 'next-auth/react';
import { useRecoilState } from 'recoil';
import { useState, useEffect, useCallback } from 'react';
import { currentTrackIdState, isPlayingState } from '../atoms/songAtom';
import {
  PlayIcon,
  PauseIcon,
  SwitchHorizontalIcon,
  VolumeUpIcon as VolumeDownIcon,
  VolumeOffIcon
  } from '@heroicons/react/outline';
import {
    ArrowCircleRightIcon,
    ArrowCircleLeftIcon,
    RewindIcon,
    FastForwardIcon,
    ReplyIcon,
    VolumeUpIcon
  } from '@heroicons/react/solid';

function Player() {
  const { data: session, status } = useSession();
  const spotifyApi = useSpotify();
  const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useState(50);
  const songInfo = useSongInfo();

  const fetchCurrentSong = () => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack()
      .then((data) => {
        {
          setCurrentTrackId(data.body?.item?.id);

          spotifyApi.getMyCurrentPlaybackState()
          .then((data) => {
            setIsPlaying(data?.body?.is_playing);
          })
      }});
    }
  };

  const handleTogglePlay = () => {
    if (songInfo) {
      spotifyApi.getMyCurrentPlaybackState().then((data) => {
        if (data.body.is_playing) {
          spotifyApi.pause();
          setIsPlaying(false);
        } else {
          spotifyApi.play();
          setIsPlaying(true);
        }
      })
    }
  };

  const handleNext = () => {
    if (songInfo) {
      spotifyApi.skipToNext();
    }
  };

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      fetchCurrentSong();
      setVolume(50);
    }
  }, [currentTrackId, spotifyApi, session]);

  useEffect(() => {
    if (volume > 0 && volume < 100) {
      debouncedAdjustVolume(volume);
    }
  }, [volume]);

  const debouncedAdjustVolume = useCallback(
    debounce((volume) => {
      spotifyApi.setVolume(volume)
      .catch((err) => {});
    },
    500),
    []
  );


  return (
    <div className='absolute bottom-0 w-screen z-10'>
    <div className='h-24 bg-gradient-to-b from-black to-gray-900 text-white
      grid grid-cols-3 text-xs md:text-base px-2 md:px-8
    '>
      {/* Left */}
      <div className='flex items-center space-x-4'> 
        <img 
          className='hidden md:inline h-10 w-10'
          src={songInfo?.album?.images?.[0]?.url}
        />
        <div>
          <h3>{songInfo?.name}</h3>
          <p>{songInfo?.artist?.[0]?.name}</p>
        </div>
      </div>
      {/* Center */}
      <div className='flex items-center justify-evenly'>
        <SwitchHorizontalIcon
          className='button'
        />
        <RewindIcon
          className='button'
        />
        {isPlaying ?
          <PauseIcon
            className='button h-10 w-10'
            onClick={handleTogglePlay}
          /> :
          <PlayIcon
            className='button h-10 w-10'
            onClick={handleTogglePlay}
          />
        }
        <FastForwardIcon
          className='button'
        />
        <ReplyIcon
          className='button'
        />
      </div>
      {/* Right */}
      <div className='flex items-center space-x-3 md:space-x-4 justify-end pr-5'>
        {
          volume === 0 ?
          <VolumeOffIcon
            className='button'
          /> :
          <VolumeDownIcon 
            className='button'
            onClick={() => {
              if (volume < 10) {
                setVolume(0);
              } else {
                setVolume(volume - 10);
              }
            }}
          />
        }
        <input
          className='w-14 md:w-28'
          type='range'
          min={0}
          max={100}
          onChange={(e) => { setVolume(Number(e.target.value)) }}
          value={volume}
        />
        <VolumeUpIcon
          className='button'
          onClick={() => {
            if(volume < 100) {
              setVolume(volume + 10);
            }
          }}
        />
      </div>
    </div>
    </div>
  )
}

export default Player
