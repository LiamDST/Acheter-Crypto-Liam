import { supabase } from './supabaseClient';

/**
 * Service for managing user progress in the learning platform
 */
export const progressService = {
  /**
   * Fetches a user's progress across all modules
   * @param userId The user ID to fetch progress for
   * @returns Promise with the user's progress data
   */
  getUserProgress: async (userId?: string) => {
    try {
      // If no userId provided, get the current user
      if (!userId) {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) return null;
        userId = session.user.id;
      }
      
      // Fetch user progress data
      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', userId)
        .order('module_id', { ascending: true });
        
      if (error) throw error;
      
      return data;
    } catch (error) {
      console.error('Error fetching user progress:', error);
      throw error;
    }
  },
  
  /**
   * Fetches quiz completions for a user
   * @param userId The user ID to fetch quiz completions for
   * @returns Promise with the user's quiz completion data
   */
  getQuizCompletions: async (userId?: string) => {
    try {
      // If no userId provided, get the current user
      if (!userId) {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) return null;
        userId = session.user.id;
      }
      
      // Fetch quiz completions
      const { data, error } = await supabase
        .from('quiz_completions')
        .select('*')
        .eq('user_id', userId);
        
      if (error) throw error;
      
      return data;
    } catch (error) {
      console.error('Error fetching quiz completions:', error);
      throw error;
    }
  },
  
  /**
   * Updates a user's progress for a specific module
   * @param userId The user ID
   * @param moduleId The module ID
   * @param status The new status ('not_started', 'in_progress', 'completed')
   * @param progressPercentage The progress percentage (0-100)
   * @returns Promise with the update result
   */
  updateModuleProgress: async (
    userId: string, 
    moduleId: string, 
    status: 'not_started' | 'in_progress' | 'completed',
    progressPercentage: number
  ) => {
    try {
      // Get module name
      const { data: moduleData, error: moduleError } = await supabase
        .from('modules')
        .select('title')
        .eq('id', moduleId)
        .single();
        
      if (moduleError) throw moduleError;
      
      // Check if progress record exists
      const { data: existingProgress, error: checkError } = await supabase
        .from('user_progress')
        .select('id')
        .eq('user_id', userId)
        .eq('module_id', moduleId)
        .maybeSingle();
        
      if (checkError) throw checkError;
      
      if (existingProgress) {
        // Update existing record
        const { error: updateError } = await supabase
          .from('user_progress')
          .update({
            status,
            progress_percentage: progressPercentage,
            last_activity: new Date().toISOString()
          })
          .eq('id', existingProgress.id);
          
        if (updateError) throw updateError;
      } else {
        // Create new record
        const { error: insertError } = await supabase
          .from('user_progress')
          .insert({
            user_id: userId,
            module_id: moduleId,
            module_name: moduleData.title,
            status,
            progress_percentage: progressPercentage,
            last_activity: new Date().toISOString()
          });
          
        if (insertError) throw insertError;
      }
      
      return true;
    } catch (error) {
      console.error('Error updating module progress:', error);
      throw error;
    }
  },
  
  /**
   * Records a quiz completion
   * @param userId The user ID
   * @param moduleId The module ID
   * @param score The quiz score
   * @returns Promise with the update result
   */
  recordQuizCompletion: async (userId: string, moduleId: string, score: number) => {
    try {
      const { error } = await supabase
        .from('quiz_completions')
        .upsert({
          user_id: userId,
          module_id: moduleId,
          score,
          completed_at: new Date().toISOString()
        }, {
          onConflict: 'user_id,module_id',
          update: ['score', 'completed_at']
        });
        
      if (error) throw error;
      
      return true;
    } catch (error) {
      console.error('Error recording quiz completion:', error);
      throw error;
    }
  },
  
  /**
   * Gets the next module to study based on current progress
   * @param userId The user ID
   * @returns Promise with the next module information
   */
  getNextModule: async (userId?: string) => {
    try {
      // If no userId provided, get the current user
      if (!userId) {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) return null;
        userId = session.user.id;
      }
      
      // Get user progress
      const { data: progress, error: progressError } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', userId)
        .order('module_id', { ascending: true });
        
      if (progressError) throw progressError;
      
      // Find in-progress module
      const inProgressModule = progress?.find(p => p.status === 'in_progress');
      if (inProgressModule) return inProgressModule;
      
      // Find first not-started module
      const notStartedModule = progress?.find(p => p.status === 'not_started');
      if (notStartedModule) return notStartedModule;
      
      // If all modules are completed or no progress yet, get the first module
      const { data: firstModule, error: moduleError } = await supabase
        .from('modules')
        .select('*')
        .order('order', { ascending: true })
        .limit(1)
        .single();
        
      if (moduleError) throw moduleError;
      
      return {
        module_id: firstModule.id,
        module_name: firstModule.title,
        status: 'not_started',
        progress_percentage: 0
      };
    } catch (error) {
      console.error('Error getting next module:', error);
      throw error;
    }
  },
  
  /**
   * Gets overall course progress statistics
   * @param userId The user ID
   * @returns Promise with progress statistics
   */
  getProgressStats: async (userId?: string) => {
    try {
      // If no userId provided, get the current user
      if (!userId) {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) return null;
        userId = session.user.id;
      }
      
      // Get user progress
      const { data: progress, error: progressError } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', userId);
        
      if (progressError) throw progressError;
      
      // Get total modules count
      const { count: totalModules, error: countError } = await supabase
        .from('modules')
        .select('*', { count: 'exact', head: true });
        
      if (countError) throw countError;
      
      // Calculate statistics
      const completedModules = progress?.filter(p => p.status === 'completed').length || 0;
      const inProgressModules = progress?.filter(p => p.status === 'in_progress').length || 0;
      const notStartedModules = (totalModules || 20) - completedModules - inProgressModules;
      
      const overallPercentage = Math.round((completedModules / (totalModules || 20)) * 100);
      
      // Get last activity date
      let lastActivity = null;
      if (progress && progress.length > 0) {
        const sortedByActivity = [...progress].sort(
          (a, b) => new Date(b.last_activity).getTime() - new Date(a.last_activity).getTime()
        );
        
        if (sortedByActivity[0]) {
          lastActivity = sortedByActivity[0].last_activity;
        }
      }
      
      return {
        totalModules: totalModules || 20,
        completedModules,
        inProgressModules,
        notStartedModules,
        overallPercentage,
        lastActivity
      };
    } catch (error) {
      console.error('Error getting progress stats:', error);
      throw error;
    }
  },
  
  /**
   * Marks a module as started (in_progress)
   * @param userId The user ID
   * @param moduleId The module ID
   * @returns Promise with the update result
   */
  startModule: async (userId: string, moduleId: string) => {
    return progressService.updateModuleProgress(userId, moduleId, 'in_progress', 25);
  },
  
  /**
   * Marks a module as completed
   * @param userId The user ID
   * @param moduleId The module ID
   * @returns Promise with the update result
   */
  completeModule: async (userId: string, moduleId: string) => {
    return progressService.updateModuleProgress(userId, moduleId, 'completed', 100);
  }
};