import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import { fetchSiteDetails } from '../api/sitesApi';
import { Site } from '../types/types';
import '../styles/SitesDetails.css';

const SiteDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [site, setSite] = useState<Site | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getSiteDetails = async () => {
      try {
        const data = await fetchSiteDetails(id!);
        setSite(data);
      } catch (error) {
        console.error('Failed to fetch site details:', error);
      }
    };

    getSiteDetails();
  }, [id]);

  if (!site) return <p>Loading...</p>;

  const { title, contacts, address, images } = site;

  return (
    <div className="site-details">
      <button onClick={() => navigate('/')} className="back-button">
        ← Back
      </button>
      <div className="site-details-header">
        <img
          src={images?.[0] || 'https://via.placeholder.com/80'}
          alt={title}
          className="site-details-image"
        />
        <div className="site-header-info">
          <h1 className="site-details-title">{title}</h1>
          <p className="site-details-address">
            {address.street}, {address.city}, {address.state}, {address.country}, {address.zipCode}
          </p>
          <p className="site-details-contact">
            Main Contact: {contacts?.main.firstName} {contacts?.main.lastName}
          </p>
        </div>
      </div>
      <div className="site-contact-details">
        <div className="contact-item">
          <i className="fas fa-user-circle icon"></i>
          <div>
            <p className="contact-name">
              {contacts?.main.firstName} {contacts?.main.lastName}
            </p>
            <p className="contact-job-title">{contacts?.main.jobTitle}</p>
          </div>
        </div>
        <div className="contact-item">
          <i className="fas fa-phone icon"></i>
          <a href={`tel:${contacts?.main.phoneNumber}`} className="contact-link">
            {contacts?.main.phoneNumber}
          </a>
        </div>
        <div className="contact-item">
          <i className="fas fa-envelope icon"></i>
          <a href={`mailto:${contacts?.main.email}`} className="contact-link">
            {contacts?.main.email}
          </a>
        </div>
        <div className="contact-item">
          <i className="fas fa-map-marker-alt icon"></i>
          <p className="contact-address">
            {contacts?.main.address.street}, {contacts?.main.address.city},{' '}
            {contacts?.main.address.state}, {contacts?.main.address.country},{' '}
            {contacts?.main.address.zipCode}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SiteDetails;