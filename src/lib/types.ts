import { ReactNode } from 'react';

// Add common types for the application
export type ChildrenProps = {
  children: ReactNode;
};

export interface ServiceItem {
  icon: JSX.Element;
  title: string;
  description: string;
  delay: number;
}

export interface NavItem {
  name: string;
  href: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
} 