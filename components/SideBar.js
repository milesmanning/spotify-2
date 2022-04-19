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
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { playlistIdState, playlistState, playlistArrayState } from '../atoms/playlistAtom';
import useSpotify from '../hooks/useSpotify';
import Link from 'next/link';

function SideBar() {

  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useRecoilState(playlistArrayState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);

  useEffect(() => {
    if(spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items);
      })
    }
    spotifyApi.setAccessToken(session?.user.accessToken);
  }, [session, spotifyApi]);

  const handleSearch = () => {
    spotifyApi.searchTracks('zac brown')
    .then(function(data) {
      console.log('data.body:  ', data.body);
    }, function(err) {
      console.log('Something went wrong!', err);
    });
  };

  return (
    <div className='text-gray-500 p-5 text-xs lg:text-sm border-r
      border-gray-900 overflow-y-scroll scrollbar-hide h-screen
      sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex pb-24
    '>
      <div className='space-y-4'>
        <Link href='/'>
          <button className='flex items-center space-x-2 hover:text-white'>
            <HomeIcon className='h-5 w-5' />
            <p>Home</p>
          </button>
        </Link>
        <Link href='/search'>
          <button
            className='flex items-center space-x-2 hover:text-white'
            onClick={handleSearch}
          >
            <SearchIcon 
              className='h-5 w-5'
            />
            <p>Search</p>
          </button>
        </Link>
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
            <Link key={playlist.id} href='/'>
              <p 
                className='hover:text-white cursor-pointer'
                onClick={() =>
                  setPlaylistId(playlist.id)
                }
              >
                {playlist.name}
              </p>
            </Link>
          ))
        }
      </div>
    </div>
  )
}

export default SideBar;
