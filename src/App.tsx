import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppBar from './components/AppBar';
import SitesList from './components/SitesList';
import SiteDetails from './components/SitesDetails'
import './styles/App.css';

const App: React.FC = () => {
  return (
    <Router>
      <AppBar />
      <main>
        <Routes>
          <Route path="/" element={<SitesList />} />
          <Route path="/site/:id" element={<SiteDetails />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;