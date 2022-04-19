import { signOut, useSession } from 'next-auth/react';
import { ChevronDownIcon } from '@heroicons/react/outline';



function AccountHeader() {

  const { data: session, status } = useSession();

  return (
    <header className='absolute top-5 right-8 z-10'>
      <div className='flex items-center bg-black space-x-3 text-white bg-gray-800
        opacity-100 hover:opacity-80 cursor-pointer rounded-full p-1 p-r-2'
        onClick={() => signOut()}
        >
        <img 
          className='rounded-full w-10 h-10'
          src={session?.user.image} 
        />
        <h2>{session?.user.name}</h2>
        <ChevronDownIcon className='h-5 w-5' />
      </div>
    </header>
  )
}

export default AccountHeader;
