import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from '../lib/stripeClient';

interface StripeProviderProps {
  children: React.ReactNode;
}

const stripeOptions = {
  appearance: {
    theme: 'stripe' as const,
    variables: {
      colorPrimary: '#3b82f6',
      colorBackground: '#ffffff',
      colorText: '#374151',
      colorDanger: '#ef4444',
      fontFamily: 'system-ui, sans-serif',
      spacingUnit: '4px',
      borderRadius: '8px',
    },
  },
};
export default function StripeProvider({ children }: StripeProviderProps) {
  return (
    <Elements stripe={stripePromise} options={stripeOptions}>
      {children}
    </Elements>
  );
}