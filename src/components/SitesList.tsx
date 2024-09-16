// src/components/SitesList.tsx
import React, { useEffect, useState } from 'react';
import { fetchSites } from '../api/sitesApi';
import { Site } from '../types/types';
import AppBar from './AppBar'; 
import { useNavigate } from 'react-router-dom';
import '../styles/SitesList.css';

const SitesList: React.FC = () => {
  const [sites, setSites] = useState<Site[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const navigate = useNavigate();

  useEffect(() => {
    const getSites = async () => {
      setLoading(true);
      try {
        const data = await fetchSites(page);
        setSites(data);
      } catch (error) {
        setError('Failed to fetch sites');
      } finally {
        setLoading(false);
      }
    };

    getSites();
  }, [page]);

  const handleNextPage = () => setPage((prev) => prev + 1);
  const handlePreviousPage = () => setPage((prev) => Math.max(prev - 1, 1));

  const handleSiteClick = (id: string) => {
    navigate(`/site/${id}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (sites.length === 0) return <p>No sites found.</p>;

  return (
    <div className="site-list">
      <ul className="site-list-container">
        {sites.map((site) => (
          <li
            key={site.id}
            className="site-item"
            onClick={() => handleSiteClick(site.id)}
          >
            <div className="site-summary">
              <img
                src={site.images?.[0] || 'https://via.placeholder.com/50'}
                alt={site.title}
                className="site-image"
              />
              <div className="site-info">
                <h2 className="site-name">{site.title}</h2>
                <p className="site-address">
                  {site.address.street}, {site.address.city}, {site.address.state}
                </p>
                <p className="site-contact">
                  Main Contact: {site.contacts?.main.firstName}{' '}
                  {site.contacts?.main.lastName}
                </p>
                <p className="site-email">
                  <a href={`mailto:${site.contacts?.main.email}`} className="contact-link">
                    {site.contacts?.main.email}
                  </a>
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={page === 1}>
          Previous
        </button>
        <span>Page {page}</span>
        <button onClick={handleNextPage}>Next</button>
      </div>
    </div>
  );
};

export default SitesList;