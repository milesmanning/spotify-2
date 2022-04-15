import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { shuffle } from 'lodash';
import { useRecoilState, useRecoilValue } from 'recoil';
import { playlistIdState, playlistState } from '../atoms/playlistAtom';
import useSpotify from '../hooks/useSpotify';

function Center() {

  const { data: session, status } = useSession();
  const spotifyApi = useSpotify();
  const [playlist, setPlaylist] = useRecoilState(playlistState);
  const playlistId = useRecoilValue(playlistIdState);

  const colors = [
    "from-indigo-500",
    "from-blue-500",
    "from-green-500",
    "from-red-500",
    "from-orange-500",
    "from-pink-500",
    "from-purple-500",
  ];

  const [color, setColor] = useState(null);

  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [playlistId]);

  useEffect(() => {
    spotifyApi
    .getPlaylist(playlistId)
    .then((data) => {
      setPlaylist(data.body)
    })
    .catch((error)=> {
      console.log('Error fetching playlist:   ', error)
    })
  }, [spotifyApi, playlistId]);

  return (
    <div className='flex-grow'>
      <header className='absolute top-5 right-8'>
        <div className='flex items-center bg-black space-x-3 
          opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 p-r-2'>
          <img 
            className='rounded-full w-10 h-10'
            src={session?.user.image} 
          />
          <h2>{session?.user.name}</h2>
        </div>
      </header>
      <section className={`flex-items-end space-x-7 bg-gradient-to-b
        to-black ${color} h-80 w-100 text-white p-8
      `}>
        {/* <img src=''/> */}
      </section>
    </div>
  )
}

export default Center
