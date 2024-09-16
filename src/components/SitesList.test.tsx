// src/components/SitesList.test.tsx

import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import SitesList from './SitesList';
import { fetchSites } from '../api/sitesApi';
import { Site } from '../types/types';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('../api/sitesApi');

const mockFetchSites = fetchSites as jest.MockedFunction<typeof fetchSites>;

describe('SitesList Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render a list of sites', async () => {
    const mockSites: Site[] = [
      {
        id: 'site-1',
        clientId: 'client-1',
        title: 'Site One',
        address: {
          street: '123 Main St',
          city: 'Anytown',
          state: 'State',
          zipCode: '12345',
          country: 'Country',
        },
        contacts: {
          main: {
            id: 'contact-1',
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
            phoneNumber: '123-456-7890',
            jobTitle: 'Manager',
            imageUrl: 'https://example.com/image1.png',
            address: {
              street: '123 Main St',
              city: 'Anytown',
              state: 'State',
              zipCode: '12345',
              country: 'Country',
            },
          },
        },
        createdAt: '2023-10-01T00:00:00Z',
        updatedAt: '2023-10-02T00:00:00Z',
        images: ['https://example.com/site1-image1.png'],
        tags: ['tag1', 'tag2'],
      },
      // Add more sites if needed
    ];

    mockFetchSites.mockResolvedValueOnce(mockSites);

    render(
      <Router>
        <SitesList />
      </Router>
    );

    // Wait until "Loading..." is no longer in the document
    await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());


    // Check that site titles are rendered
    mockSites.forEach((site) => {
      expect(screen.getByText(site.title)).toBeInTheDocument();
    });
  });
});
