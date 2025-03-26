import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './assets/styles/App.css';

// 懒加载组件
const LoginComponent = lazy(() => import('./components/LoginComponent'));
const RegisterComponent = lazy(() => import('./components/RegisterComponent'));
const HomeComponent = lazy(() => import('./components/HomeComponent'));
const PersonalTaskPage = lazy(() => import('./components/PersonalTaskPage'));
const TeamTaskPage = lazy(() => import('./components/TeamTaskPage'));
const ProfileComponent = lazy(() => import('./components/ProfileComponent'));

const App: React.FC = () => {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLogged(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLogged(true);
  };

  const handleLogout = () => {
    setIsLogged(false);
    localStorage.removeItem('token');
  };

  const token = localStorage.getItem('token');
  const isLoggedIn = !!token; // 直接根据 token 是否存在判断登录状态

  console.log(token);
  console.log(isLoggedIn);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route
          path="/"
          element={
            <HomeComponent onLogout={handleLogout} isLogged={isLogged} />
          }
        />
        <Route path="/register" element={<RegisterComponent />} />
        <Route
          path="/login"
          element={<LoginComponent onLogin={handleLogin} />}
        />
        <Route
          path="/myTasks"
          element={isLoggedIn ? <PersonalTaskPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/teamTasks"
          element={isLoggedIn ? <TeamTaskPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={isLoggedIn ? <ProfileComponent /> : <Navigate to="/login" />}
        />
      </Routes>
    </Suspense>
  );
};

export default App;
