import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/home/page';
import SignUp from './pages/signup/page';
import SignIn from './pages/signin/page';
import Settings from './pages/settings/page';
import Navbar from './components/Navbar';
import { useAuth } from './store/useAuth';
import { useEffect } from 'react';
import { TbLoader2 } from 'react-icons/tb';
import { Toaster } from 'react-hot-toast';
import Profile from './pages/profile/page';
import { useTheme } from './store/useTheme';

const App = () => {
  const { authUser, checkAuth, isCheckingAuth , onlineUsers } = useAuth();
  const { theme } = useTheme();
  console.log(onlineUsers);

  // Authentication check effect
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Theme handler effect
  useEffect(() => {
    const handleTheme = () => {
      const savedTheme = localStorage.getItem('chatty-theme') || theme;
      document.documentElement.setAttribute('data-theme', savedTheme);
    };
    handleTheme();
  }, [theme]);

  // Loading state
  if (isCheckingAuth) {
    return (
      <div className="h-screen flex items-center justify-center">
        <TbLoader2 className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={authUser ? <Home /> : <Navigate to={'/signin'} />} />
        <Route path="/signup" element={!authUser ? <SignUp /> : <Navigate to={'/'} />} />
        <Route path="/signin" element={!authUser ? <SignIn /> : <Navigate to={'/'} />} />
        <Route path="/settings" element={authUser ? <Settings /> : <Navigate to={'/signin'} />} />
        <Route path="/profile" element={authUser ? <Profile /> : <Navigate to={'/signin'} />} />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;