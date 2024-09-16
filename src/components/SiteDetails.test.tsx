import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SiteDetails from './SitesDetails'; // Ensure the import path is correct
import { fetchSiteDetails } from '../api/sitesApi';
import { Site } from '../types/types';
import { BrowserRouter } from 'react-router-dom';

jest.mock('../api/sitesApi');
jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');
  return {
    __esModule: true,
    ...originalModule,
    useParams: jest.fn(),
    useNavigate: jest.fn(),
  };
});

const mockFetchSiteDetails = fetchSiteDetails as jest.MockedFunction<typeof fetchSiteDetails>;
const mockUseParams = require('react-router-dom').useParams as jest.Mock;
const mockUseNavigate = require('react-router-dom').useNavigate as jest.Mock;

describe('SiteDetails Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should display loading state initially', () => {
    mockUseParams.mockReturnValue({ id: 'site-1' });

    render(
      <BrowserRouter>
        <SiteDetails />
      </BrowserRouter>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should render site details when data is fetched successfully', async () => {
    const siteId = 'site-1';
    const mockSite: Site = {
      id: siteId,
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
    };

    mockUseParams.mockReturnValue({ id: siteId });
    mockFetchSiteDetails.mockResolvedValueOnce(mockSite);

    render(
      <BrowserRouter>
        <SiteDetails />
      </BrowserRouter>
    );

    // Wait for the component to render the site details
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: mockSite.title })).toBeInTheDocument();
    });

    // Check that the site title is displayed
    expect(screen.getByRole('heading', { name: mockSite.title })).toBeInTheDocument();

    
    // Check that the main contact is displayed
    const mainContactName = `${mockSite.contacts!.main.firstName} ${mockSite.contacts!.main.lastName}`;
    expect(screen.getByText(`Main Contact: ${mainContactName}`)).toBeInTheDocument();

    // Check that the contact details are displayed
    expect(screen.getByText(mainContactName)).toBeInTheDocument();
    expect(screen.getByText(mockSite.contacts!.main.jobTitle)).toBeInTheDocument();

    // Check the phone number link
    const phoneLink = screen.getByRole('link', { name: mockSite.contacts!.main.phoneNumber });
    expect(phoneLink).toHaveAttribute('href', `tel:${mockSite.contacts!.main.phoneNumber}`);

    // Check the email link
    const emailLink = screen.getByRole('link', { name: mockSite.contacts!.main.email });
    expect(emailLink).toHaveAttribute('href', `mailto:${mockSite.contacts!.main.email}`);

 
  });

  it('should navigate back when the back button is clicked', async () => {
    const siteId = 'site-1';
    const mockSite: Site = {
      // Same as above
      id: siteId,
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
    };

    mockUseParams.mockReturnValue({ id: siteId });
    mockFetchSiteDetails.mockResolvedValueOnce(mockSite);

    const navigateMock = jest.fn();
    mockUseNavigate.mockReturnValue(navigateMock);

    render(
      <BrowserRouter>
        <SiteDetails />
      </BrowserRouter>
    );

    // Wait for the component to render
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: mockSite.title })).toBeInTheDocument();
    });

    const backButton = screen.getByRole('button', { name: '← Back' });
    fireEvent.click(backButton);

    expect(navigateMock).toHaveBeenCalledWith('/');
  });
});
