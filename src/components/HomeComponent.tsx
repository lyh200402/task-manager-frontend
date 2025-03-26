import React from 'react';
import '../assets/styles/HomeComponent.css';
import { Link } from 'react-router-dom';

interface HomeComponentProps {
  onLogout: () => void;
  isLogged: boolean;
}

const HomeComponent: React.FC<HomeComponentProps> = ({
  onLogout,
  isLogged,
}) => {
  return (
    <>
      <header className="header">
        <div className="logo">任务管理应用</div>
        <div className="auth-buttons">
          {isLogged ? (
            <>
              <Link to={'/'} className="auth-btn" onClick={onLogout}>
                登出
              </Link>
              <Link to={'/profile'} className="auth-btn">
                个人资料
              </Link>
            </>
          ) : (
            <>
              <Link to={'/register'} className="auth-btn">
                注册
              </Link>
              <Link to={'/login'} className="auth-btn">
                登录
              </Link>
            </>
          )}
        </div>
      </header>
      <div className="sections-container">
        <section className="section">
          <h2 className="section-title">我的任务</h2>
          <Link to={'/myTasks'} className="more-btn">
            进入
          </Link>
        </section>
        <section className="section">
          <h2 className="section-title">团队任务</h2>
          <Link to={'/teamTasks'} className="more-btn">
            进入
          </Link>
        </section>
      </div>
    </>
  );
};

export default HomeComponent;
