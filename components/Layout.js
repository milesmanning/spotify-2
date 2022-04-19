import  SideBar from '../components/SideBar';
import Player from '../components/Player';

function Layout({ children }) {
  return (
    <div className='bg-black h-screen overflow-hidden'>
      <main className='flex'>
        <SideBar />
        {children}
      </main>
      <div className='sticky bottom-0'>
        <Player />
      </div>
    </div>
  );
}

export default Layout;
