import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Layout from './components/Layout';
import HomePage from '@/components/pages/HomePage';
import NotFound from './pages/NotFound';
import { routeArray } from './config/routes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
<Route index element={<HomePage />} />
          {routeArray.map(route => (
            <Route
              key={route.id}
              path={route.path}
              element={<route.component />}
            />
          ))}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className="z-[9999]"
      />
    </BrowserRouter>
  );
}

export default App;