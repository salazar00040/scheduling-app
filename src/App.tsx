// src/App.tsx
import React from 'react';
import './styles/App.css'; 
import AppBar from './components/AppBar'; 
import SitesList from './components/SitesList'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <AppBar /> {}
        <main className="content">
          <Routes>
            {}
            <Route path="/" element={<SitesList />} />
            {}
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
