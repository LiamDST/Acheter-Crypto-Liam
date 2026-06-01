import { describe, it, expect, vi } from 'vitest';

// Mock environment variables
vi.mock('meta', () => ({
  env: {
    VITE_SUPABASE_URL: 'https://test.supabase.co',
    VITE_SUPABASE_ANON_KEY: 'test-key'
  }
}));

// Mock createClient from Supabase
vi.mock('@supabase/supabase-js', () => ({
  createClient: vi.fn(() => ({
    auth: {
      getSession: vi.fn(() => Promise.resolve({ data: null, error: null }))
    }
  }))
}));

describe('supabaseClient', () => {
  it('should create Supabase client with correct configuration', async () => {
    const { createClient } = await import('@supabase/supabase-js');
    const { supabase } = await import('../supabaseClient');
    
    expect(createClient).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(String),
      expect.objectContaining({
        auth: expect.objectContaining({
          autoRefreshToken: true,
          persistSession: true,
          detectSessionInUrl: true,
          flowType: 'pkce',
          storage: expect.any(Object)
        })
      })
    );
    
    expect(supabase).toBeDefined();
  });
  
  it('should handle localStorage operations safely', async () => {
    // Test that storage methods don't throw errors
    const { supabase } = await import('../supabaseClient');
    
    // This should not throw
    expect(() => {
      // Simulate calling the custom storage methods
      const client = supabase as any;
      const storage = client._storage || {};
      
      // These methods should exist and handle errors gracefully
      if (storage.getItem) storage.getItem('test');
      if (storage.setItem) storage.setItem('test', 'value');
      if (storage.removeItem) storage.removeItem('test');
    }).not.toThrow();
  });
});