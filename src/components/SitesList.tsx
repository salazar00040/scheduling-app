// src/components/SitesList.tsx
import React, { useEffect, useState } from 'react';
import { fetchSites } from '../api/sitesApi';
import { Site } from '../types/types';
import '../styles/SitesList.css';

const SitesList: React.FC = () => {
  const [sites, setSites] = useState<Site[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (sites.length === 0) return <p>No sites found.</p>;

  return (
    <div className="sites-list">
      <h2>Sites List</h2>
      <ul>
        {sites.map((site) => {
          // Safely access and format the address properties
          const { address } = site;
          const formattedAddress =
            address && typeof address === 'object'
              ? `${address.street}, ${address.city}, ${address.state}, ${address.zipCode}, ${address.country}`
              : 'Address not available';

          return (
            <li key={site.id} className="site-item">
              <div>
                <p>
                  <strong>{site.name}</strong>
                </p>
                <p>{formattedAddress}</p> {/* Render the formatted address */}
                {site.contact && <p><strong>Contact:</strong> {site.contact}</p>}
              </div>
            </li>
          );
        })}
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
