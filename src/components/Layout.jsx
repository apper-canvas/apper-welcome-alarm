import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="min-h-screen max-w-full overflow-hidden">
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;