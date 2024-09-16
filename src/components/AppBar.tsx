import React from 'react';
import '../styles/AppBar.css'; 
const AppBar: React.FC = () => {
  return (
    <header className="app-bar">
      <div className="app-bar-content">
        <button className="menu-button">☰</button>
        <h1>Scheduling</h1>
      </div>
    </header>
  );
};

export default AppBar;