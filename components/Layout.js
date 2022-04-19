import  SideBar from '../components/SideBar';
import Player from '../components/Player';
import AccountHeader from '../components/AccountHeader';

function Layout({ children }) {
  const loginName = children.type.name;

  return (
    <div className='bg-black h-screen overflow-hidden'>
      { loginName === "Login" ?
        children :
        <main className='flex'>
          <AccountHeader /> 
          <SideBar />
          <Player />
          {children}
        </main>
      }
    </div>
  );
}

export default Layout;
