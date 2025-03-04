import React, { useState } from "react";
import axios from "axios";
import "../assets/styles/RegisterComponent.css";
import { Link, useNavigate } from "react-router-dom";

const RegisterComponent: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.post("https://lyh-task-manager-b.vercel.app/register", {
        username,
        email,
        password,
      });

      navigate("/login");
    } catch (error) {
      setMessage("注册失败，请重试。");
    }
  };

  return (
    <div className="register-login-container">
      <div className="register-container">
        <h2 className="register-title">注册</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="username">
              用户名
            </label>
            <input
              className="form-input"
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="email">
              电子邮箱
            </label>
            <input
              className="form-input"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="password">
              密码
            </label>
            <input
              className="form-input"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="submit-button" type="submit">
            注册
          </button>
        </form>
        {message && <p className="message-text">{message}</p>}
      </div>
      <p>
        已有账户？{" "}
        <Link className="switch-button" to={"/login"}>
          登录
        </Link>
      </p>
    </div>
  );
};

export default RegisterComponent;
