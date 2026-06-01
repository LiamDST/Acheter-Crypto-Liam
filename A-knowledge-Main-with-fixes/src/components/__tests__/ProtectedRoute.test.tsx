import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute';

// Simple mock for Supabase
vi.mock('../../lib/supabaseClient', () => ({
  supabase: {
    auth: {
      getSession: vi.fn(() => Promise.resolve({ 
        data: { session: null }, 
        error: null 
      })),
      onAuthStateChange: vi.fn(() => ({
        data: { subscription: { unsubscribe: vi.fn() } }
      }))
    },
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn().mockReturnThis(),
        lt: vi.fn().mockReturnThis(),
        gt: vi.fn().mockReturnThis(),
        limit: vi.fn(() => Promise.resolve({ data: [], error: null }))
      }))
    }))
  }
}));

// Mock LessonAccessModal to avoid complex dependencies
vi.mock('../LessonAccessModal', () => ({
  default: ({ isOpen, lessonTitle }: { isOpen: boolean; lessonTitle: string }) => 
    isOpen ? <div data-testid="lesson-access-modal">{lessonTitle}</div> : null
}));

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('ProtectedRoute', () => {
  it('shows loading spinner initially', () => {
    renderWithRouter(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>
    );
    
    expect(document.querySelector('.animate-spin')).toBeInTheDocument();
  });

  it('shows lesson access modal when user is not authenticated', async () => {
    renderWithRouter(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>
    );
    
    await waitFor(() => {
      expect(screen.getByTestId('lesson-access-modal')).toBeInTheDocument();
    });
  });

  it('renders subscription required message for premium content', async () => {
    const { supabase } = await import('../../lib/supabaseClient');
    
    // Mock authenticated user without subscription
    vi.mocked(supabase.auth.getSession).mockResolvedValueOnce({
      data: { session: { user: { id: '123' } } },
      error: null
    } as any);
    
    renderWithRouter(
      <ProtectedRoute requireSubscription={true}>
        <div>Premium Content</div>
      </ProtectedRoute>
    );
    
    await waitFor(() => {
      expect(screen.getByText('Contenu Premium')).toBeInTheDocument();
    });
  });
});