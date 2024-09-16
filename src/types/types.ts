export interface Client {
  id: string;
  givenName: string; // Client's name
  logo: string; // URL to the client's logo image
  createdAt: string; // Date when the client was created
  updatedAt: string; // Date when the client was last updated
  tags: string[]; // Array of tags associated with the client
}

// Interface for the address
export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

// Interface for an individual contact
export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  jobTitle: string;
  imageUrl?: string; // Optional URL for the contact's image
  address: Address;
}

// Interface for the contacts object containing a main contact
export interface Contacts {
  main: Contact;
}

// Interface for the site
export interface Site {
  id: string;
  clientId: string; // ID of the associated client
  title: string; // Title of the site
  address: Address; // Address of the site
  contacts?: Contacts; // Optional nested contacts for the site
  createdAt: string; // Date when the site was created
  updatedAt: string; // Date when the site was last updated
  images: string[]; // Array of image URLs associated with the site
  tags: string[]; // Array of tags associated with the site
}