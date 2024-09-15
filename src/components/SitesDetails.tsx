// src/components/SiteDetails.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // useNavigate for redirecting if ID is missing
import { fetchSiteDetails } from '../api/sitesApi';
import { Site } from '../types/types';
import '../styles/SitesDetails.css';

const SiteDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Ensure the param type is string
  const navigate = useNavigate(); // To handle navigation
  const [site, setSite] = useState<Site | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getSiteDetails = async (siteId: string) => {
      setLoading(true);
      try {
        const data = await fetchSiteDetails(siteId);
        setSite(data);
      } catch (error) {
        setError('Failed to load site details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      // Check if id is defined and call the function
      getSiteDetails(id);
    } else {
      // Redirect to another page or handle the missing ID case
      setError('Invalid Site ID');
      navigate('/sites'); // Redirect to the sites list page
    }
  }, [id, navigate]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!site) return <p>Site not found.</p>;

  const { address } = site;
  const formattedAddress = address
    ? `${address.street}, ${address.city}, ${address.state}, ${address.zipCode}, ${address.country}`
    : 'Address not available';

  return (
    <div className="site-details">
      <img src="placeholder-image.png" alt="Site" className="site-details-image" />
      <h1>{site.name}</h1>
      <p>
        <strong>Address:</strong> {formattedAddress}
      </p>
      {site.contact && (
        <p>
          <strong>Contact:</strong> {site.contact}
        </p>
      )}
    </div>
  );
};

export default SiteDetails;
