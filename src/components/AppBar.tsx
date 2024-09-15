import React from 'react';
import '../styles/AppBar.css'; 
const AppBar: React.FC = () => {
  return (
    <div className="app-bar">
      <div className="menu-icon">☰</div>
      <div className="logo">Scheduling</div>
      <div className="profile-icon">D</div>
    </div>
  );
};

export default AppBar;
