import React, { useState } from 'react';
import axios from 'axios';
import '../assets/styles/ProfileComponent.css';

const ProfileComponent: React.FC = () => {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const fileInput = document.querySelector<HTMLInputElement>('#avatar-file');
    const file = fileInput?.files?.[0];
    if (!file) {
      setMessage('请先选择文件');
      return;
    }

    const formData = new FormData();
    formData.append('avatar', file);

    try {
      const response = await axios.post(
        'http://localhost:5000/users/avatar',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: localStorage.getItem('token') || '',
          },
        },
      );
      setMessage('头像上传成功！');
    } catch (error) {
      console.error(error);
      setMessage('上传头像失败，请重试');
    }
  };

  return (
    <div className="avatar-container">
      <div
        className="avatar-img"
        style={{ backgroundImage: avatar ? `url(${avatar})` : 'none' }}
      >
        {!avatar && '上传头像'}
      </div>
      <input
        id="avatar-file"
        className="avatar-file"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />
      <div className="button-group">
        <label className="custom-file-label" htmlFor="avatar-file">
          选择文件
        </label>
        <button className="avatar-submit" onClick={handleSubmit}>
          提交
        </button>
      </div>
      {message && <p className="login-message">{message}</p>}
    </div>
  );
};

export default ProfileComponent;
