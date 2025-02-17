import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import TaskList from "./components/TaskList.tsx";
import TaskForm from "./components/TaskForm.tsx";
import LoginComponent from "./components/LoginComponent.tsx";
import RegisterComponent from "./components/RegisterComponent.tsx";
import HomeComponent from "./components/HomeComponent.tsx";
import "./assets/styles/App.css";

const TaskPage: React.FC = () => {
  return (
    <div>
      <TaskForm />
      <TaskList />
    </div>
  );
};

const App: React.FC = () => {
  const [isLogged, setIsLogged] = useState(false);

  const handleLogin = () => {
    setIsLogged(true);
  };

  const handleLogout = () => {
    setIsLogged(false);
    localStorage.removeItem("token");
  };

  return (
    <div>
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
          element={isLogged ? <TaskPage /> : <Navigate to="/login" />}
        ></Route>
      </Routes>
    </div>
  );
};

export default App;
