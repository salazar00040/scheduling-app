
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { fetchSites } from './api/sitesApi';

jest.mock('./api/sitesApi');
const mockFetchSites = fetchSites as jest.MockedFunction<typeof fetchSites>;

test('renders App component with SitesList', async () => {
  const mockSites = [
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
  ];

  mockFetchSites.mockResolvedValueOnce(mockSites);

  render(<App />);

  await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());

  expect(screen.getByText('Scheduling')).toBeInTheDocument();
  expect(screen.getByText('Site One')).toBeInTheDocument();
});
