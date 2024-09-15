
export interface Client {
    id: string;
    name: string;
    address?: string; 
  }
  


export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Site {
  id: string;
  name: string;
  address: Address; 
  contact?: string;
}
