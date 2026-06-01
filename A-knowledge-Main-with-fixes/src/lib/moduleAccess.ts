import { supabase } from './supabaseClient';

/**
 * Checks if a user has access to a specific module
 * @param moduleId The ID of the module to check access for
 * @returns Promise<boolean> True if the user has access, false otherwise
 */
export async function checkModuleAccess(moduleId: string): Promise<boolean> {
  try {
    // Check if user is authenticated
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      return false;
    }
    
    // If it's the free module, grant access to authenticated users
    if (moduleId === 'module-1') {
      return true;
    }
    
    // Check if user has an active subscription
    const now = new Date().toISOString();
    const { data: subscriptions, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', session.user.id)
      .eq('status', 'active')
      .lte('start_date', now)
      .gte('end_date', now)
      .limit(1);
      
    if (error) {
      console.error('Error checking subscription:', error);
      return false;
    }
    
    return subscriptions && subscriptions.length > 0;
  } catch (error) {
    console.error('Error checking module access:', error);
    return false;
  }
}

/**
 * Fetches module data if the user has access
 * @param moduleId The ID of the module to fetch
 * @returns Promise with the module data or null if no access
 */
export async function fetchModuleContent(moduleId: string) {
  try {
    // First check if user has access
    const hasAccess = await checkModuleAccess(moduleId);
    
    if (!hasAccess) {
      return null;
    }
    
    // Fetch module content
    const { data, error } = await supabase
      .from('module_content')
      .select('*')
      .eq('module_id', moduleId);
      
    if (error) {
      console.error('Error fetching module content:', error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Error in fetchModuleContent:', error);
    return null;
  }
}

/**
 * Checks if the current user has an active subscription
 * @returns Promise<boolean> True if the user has an active subscription
 */
export async function hasActiveSubscription(): Promise<boolean> {
  try {
    // Check if user is authenticated
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      return false;
    }
    
    // Check if user has an active subscription
    const { data: subscriptions, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', session.user.id)
      .eq('status', 'active')
      .lt('start_date', new Date().toISOString())
      .gt('end_date', new Date().toISOString())
      .limit(1);
      
    if (error) {
      console.error('Error checking subscription:', error);
      return false;
    }
    
    return subscriptions && subscriptions.length > 0;
  } catch (error) {
    console.error('Error in hasActiveSubscription:', error);
    return false;
  }
}