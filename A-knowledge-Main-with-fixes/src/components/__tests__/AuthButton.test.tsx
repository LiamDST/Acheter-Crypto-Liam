import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AuthButton from '../AuthButton';

// Mock Supabase
vi.mock('../../lib/supabaseClient', () => ({
  supabase: {
    auth: {
      getSession: vi.fn(() => Promise.resolve({ data: { session: null }, error: null })),
      onAuthStateChange: vi.fn(() => ({
        data: { subscription: { unsubscribe: vi.fn() } }
      })),
      signOut: vi.fn(() => Promise.resolve({ error: null }))
    }
  }
}));

// Mock EmailJS
vi.mock('@emailjs/browser', () => ({
  default: {
    send: vi.fn(() => Promise.resolve())
  }
}));

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('AuthButton', () => {
  const mockOnClick = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders login button when user is not authenticated', () => {
    renderWithRouter(<AuthButton onClick={mockOnClick} />);
    
    expect(screen.getByLabelText('Se connecter')).toBeInTheDocument();
    expect(screen.getByText('profile')).toBeInTheDocument();
  });

  it('calls onClick when login button is clicked', () => {
    renderWithRouter(<AuthButton onClick={mockOnClick} />);
    
    const loginButton = screen.getByLabelText('Se connecter');
    fireEvent.click(loginButton);
    
    expect(mockOnClick).toHaveBeenCalledOnce();
  });

  it('renders user menu when authenticated', async () => {
    // Mock authenticated user
    const mockUser = {
      id: '123',
      user_metadata: { first_name: 'John', last_name: 'Doe' }
    };

    const { supabase } = await import('../../lib/supabaseClient');
    vi.mocked(supabase.auth.getSession).mockResolvedValueOnce({
      data: { session: { user: mockUser } },
      error: null
    });

    renderWithRouter(<AuthButton onClick={mockOnClick} />);
    
    // Wait for the component to update with user state
    await vi.waitFor(() => {
      expect(screen.getByLabelText(/Menu de/)).toBeInTheDocument();
    });
  });
});