import React, { useState } from 'react';
import axios from 'axios';
import '../assets/styles/LoginComponent.css';
import { Link, useNavigate } from 'react-router-dom';

interface LoginComponentProps {
  onLogin: () => void;
}

const LoginComponent: React.FC<LoginComponentProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/users/login', {
        email,
        password,
      });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', response.data.username);
      localStorage.setItem('email', email);
      localStorage.setItem('userId', response.data.userId);
      localStorage.setItem('avatar', response.data.avatar);
      onLogin();
      navigate('/');
    } catch (error) {
      console.log(error);
      setMessage('登录失败，请重试。');
    }
  };

  return (
    <div className="register-login-container">
      <div className="login-container">
        <h2 className="login-title">登录</h2>
        <form onSubmit={handleSubmit}>
          <div className="login-form-group">
            <label htmlFor="email" className="login-form-label">
              电子邮箱
            </label>
            <input
              type="email"
              id="email"
              className="login-form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="login-form-group">
            <label htmlFor="password" className="login-form-label">
              密码
            </label>
            <input
              type="password"
              id="password"
              className="login-form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-submit-button">
            登录
          </button>
        </form>
        {message && <p className="login-message">{message}</p>}
      </div>
      <p>
        还没有账户？{' '}
        <Link className="switch-button" to={'/register'}>
          注册
        </Link>
      </p>
    </div>
  );
};

export default LoginComponent;
