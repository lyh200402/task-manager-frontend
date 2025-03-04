import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginComponent from "./components/LoginComponent";
import RegisterComponent from "./components/RegisterComponent";
import HomeComponent from "./components/HomeComponent";
import PersonalTaskPage from "./components/PersonalTaskPage";
import TeamTaskPage from "./components/TeamTaskPage";
import "./assets/styles/App.css";

const App: React.FC = () => {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLogged(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLogged(true);
  };

  const handleLogout = () => {
    setIsLogged(false);
    localStorage.removeItem("token");
  };

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <HomeComponent onLogout={handleLogout} isLogged={isLogged} />
          }
        ></Route>
        <Route path="/register" element={<RegisterComponent />}></Route>
        <Route
          path="/login"
          element={<LoginComponent onLogin={handleLogin} />}
        ></Route>
        <Route
          path="/myTasks"
          element={isLogged ? <PersonalTaskPage /> : <Navigate to="/login" />}
        ></Route>
        <Route
          path="/teamTasks"
          element={isLogged ? <TeamTaskPage /> : <Navigate to="/login" />}
        ></Route>
      </Routes>
    </>
  );
};

export default App;
