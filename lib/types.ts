export type User = {
  id: string;
  email: string;
  name: string;
  imageUrl?: string;
  isInnovator: boolean;
  isInvestor: boolean;
  Innovator?: Innovator | null; // Optional, as not all Users are Innovators
  Investor?: Investor | null;  // Optional, if you have a similar Investor model
};

export type Innovator = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  imageUrl?: string;
  bio?: string;
  linkedInLink?: string;
  role?: string;
  user: User; // Relation back to User
};

  
  export interface Investor {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    imageUrl?: string;
    address?: string;
    companyName?: string;
    jobProfile?: string;
    linkedInLink?: string;
    industry?: string;
    taxNumber?: string;
    entity?: string;
    user: User; 
    investment?: Investment;
    hiringOption: HiringOption[];
  }
  
  export interface Investment {
    id: string;
    value: number; 
    description?: string;
    investor: Investor; 
    investorId: string; 
  }
  
  export interface HiringOption {
    id: string;
    title: string;
    price: number; 
    description?: string;
    deadline?: Date; 
    investor?: Investor; 
    investorId?: string; 
  }