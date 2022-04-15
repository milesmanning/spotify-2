import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  HeartIcon,
  RssIcon
  } from '@heroicons/react/outline';
import CreatePlaylistIcon from '/public/images/create-playlist.svg';
import LikedSongsIcon from '/public/images/liked-songs.svg';
import YourEpisodesIcon from '/public/images/your-episodes.svg';
import Image from "next/image";
import { signOut, useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { playlistIdState, playlistState, selectedPlaylistState } from '../atoms/playlistAtom';
import useSpotify from '../hooks/useSpotify';

function SideBar() {

  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState([]);
  const [playlist, setPlaylist] = useRecoilState(playlistState);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);

  console.log('playlist ID:  ', playlistId);
  console.log('playlists:  ',  playlists);

  useEffect(() => {
    if(spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items);
      })
    }

    spotifyApi.setAccessToken(session?.user.accessToken);

  }, [session, spotifyApi]);

  return (
    <div className='text-gray-500 p-5 text-sm border-r border-gray-900
      overflow-y-scroll scrollbar-hide h-screen
    '>
      <div className='space-y-4'>
        <button 
          className='flex items-center space-x-2 hover:text-white'
          onClick={() => signOut()}
          >
          <p>Log out</p>
        </button>
        <button className='flex items-center space-x-2 hover:text-white'>
          <HomeIcon className='h-5 w-5' />
          <p>Home</p>
        </button>
        <button className='flex items-center space-x-2 hover:text-white'>
          <SearchIcon className='h-5 w-5' />
          <p>Search</p>
        </button>
        <button className='flex items-center space-x-2 hover:text-white'>
          <LibraryIcon className='h-5 w-5' />
          <p>Your Library</p>
        </button>
        <hr className='border-t-[0.1px] border-gray-900' />
        <button className='flex items-center space-x-2 hover:text-white'>
          <PlusCircleIcon className='h-5 w-5' />
          {/* <Image 
            src={CreatePlaylistIcon}
            className=''
            width={5}
            height={5}
          /> */}
          <p>Create Playlist</p>
        </button>
        <button className='flex items-center space-x-2 hover:text-white'>
          <HeartIcon className='h-5 w-5' />
          {/* <Image 
            src={LikedSongsIcon}
            className=''
            width={5}
            height={5}
          /> */}
          <p>Liked Songs</p>
        </button>
        <button className='flex items-center space-x-2 hover:text-white'>
          <RssIcon className='h-5 w-5' />
          {/* <Image 
            src={YourEpisodesIcon}
            className='bg-[#006450] object-contain h-5 w-5'
            width={20}
            height={20}
          /> */}
          <p>Your Episodes</p>
        </button>
        {
          playlists.map((playlist) => (
            <p key={playlist.id} 
              className='hover:text-white cursor-pointer'
              onClick={() =>
                setPlaylistId(playlist.id)
              }
            >
              {playlist.name}
            </p>
          ))
        }
      </div>
    </div>
  )
}

export default SideBar
