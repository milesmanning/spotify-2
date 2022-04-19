import { signOut, useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { shuffle } from 'lodash';
import { useRecoilState, useRecoilValue } from 'recoil';
import { playlistIdState, playlistState } from '../atoms/playlistAtom';
import useSpotify from '../hooks/useSpotify';
import Songs from '../components/Songs';

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
      setPlaylist(data.body);
      console.log('selected playlist  ', playlist);
    })
    .catch((error)=> {
      console.log('Error fetching playlist:   ', error)
    })
  }, [spotifyApi, playlistId]);

  return (
    <div className='flex-grow h-screen overflow-y-scroll scrollbar-hide'>
      <section className={`flex items-end space-x-7 bg-gradient-to-b
        to-black ${color} h-80 w-100 text-white p-8
      `}>
        <img 
          src={playlist?.images[0].url || session?.user.image}
          className='h-44 w-44 shadow-2xl'
        />
        <div>
          <p>PLAYLIST</p>
          <h1 className='text-2xl md:text-3xl xl:text-4xl font-bold'>{playlist?.name}</h1>
        </div>
      </section>
      <Songs 
        className='text-white'
      />
    </div>
  )
}

export default Center
