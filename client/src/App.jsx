import React, { useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Feed from './pages/Feed';
import Explore from './pages/Explore';
import Generate from './pages/Generate';
import Profile from './pages/Profile';
import PostDetail from './pages/PostDetail';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';

function App() {

  const { user } = useSelector(state => state.auth)

  const [isLoggedIn, setIsLoggedIn] = useState(user); // Mock auth
  const location = useLocation();

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/';

  // Layout wrapper component
  const AppLayout = ({ children }) => (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col relative overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
          {children}
        </main>
      </div>
    </div>
  );

  // Protected Route wrapper
  const ProtectedRoute = ({ children }) => {
    if (!isLoggedIn) return <Navigate to="/login" />;
    return <AppLayout>{children}</AppLayout>;
  };

  return (
    <>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate to="/feed" /> : <Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        <Route path="/feed" element={<ProtectedRoute><Feed /></ProtectedRoute>} />
        <Route path="/explore" element={<ProtectedRoute><Explore /></ProtectedRoute>} />
        <Route path="/generate" element={<ProtectedRoute><Generate /></ProtectedRoute>} />
        <Route path="/profile/:username" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/post/:id" element={<ProtectedRoute><PostDetail /></ProtectedRoute>} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
