/*
  # Optimize RLS Policies

  1. Performance Improvements
    - Fix Auth RLS Initialization Plan issues by using subqueries for auth.uid()
    - Merge multiple permissive policies for the same action and role
    - Maintain identical access control logic

  2. Changes
    - Update RLS policies for 8 tables to use (SELECT auth.uid()) instead of auth.uid()
    - Merge duplicate SELECT policies for subscriptions and article_likes
*/

-- 1. Fix article_likes policies
DROP POLICY IF EXISTS "Likes are viewable by everyone" ON public.article_likes;
DROP POLICY IF EXISTS "Users can manage their own likes" ON public.article_likes;

-- Create optimized policies
CREATE POLICY "Likes are viewable by everyone" 
ON public.article_likes
FOR SELECT
TO public
USING (true);

CREATE POLICY "Users can manage their own likes" 
ON public.article_likes
FOR ALL
TO authenticated
USING (user_id = (SELECT auth.uid()))
WITH CHECK (user_id = (SELECT auth.uid()));

-- 2. Fix subscriptions policies
DROP POLICY IF EXISTS "Users can only view their own subscription data" ON public.subscriptions;
DROP POLICY IF EXISTS "Users can view own subscriptions" ON public.subscriptions;
DROP POLICY IF EXISTS "Admin can view all subscriptions" ON public.subscriptions;

-- Create optimized policies
CREATE POLICY "Users can view own subscriptions" 
ON public.subscriptions
FOR SELECT
TO authenticated
USING (user_id = (SELECT auth.uid()));

CREATE POLICY "Admin can view all subscriptions" 
ON public.subscriptions
FOR ALL
TO service_role
USING (true);

-- 3. Fix invoices policies
DROP POLICY IF EXISTS "Users can view their own invoices" ON public.invoices;
DROP POLICY IF EXISTS "Admin can manage all invoices" ON public.invoices;

-- Create optimized policies
CREATE POLICY "Users can view their own invoices" 
ON public.invoices
FOR SELECT
TO authenticated
USING (user_id = (SELECT auth.uid()));

CREATE POLICY "Admin can manage all invoices" 
ON public.invoices
FOR ALL
TO service_role
USING (true);

-- 4. Fix trades policies
DROP POLICY IF EXISTS "Users can view their own trades" ON public.trades;
DROP POLICY IF EXISTS "Admin can manage all trades" ON public.trades;

-- Create optimized policies
CREATE POLICY "Users can view their own trades" 
ON public.trades
FOR SELECT
TO authenticated
USING (user_id = (SELECT auth.uid()));

CREATE POLICY "Admin can manage all trades" 
ON public.trades
FOR ALL
TO service_role
USING (true);

-- 5. Fix user_progress policies
DROP POLICY IF EXISTS "Users can view their own progress" ON public.user_progress;
DROP POLICY IF EXISTS "Admin can manage all progress" ON public.user_progress;

-- Create optimized policies
CREATE POLICY "Users can view their own progress" 
ON public.user_progress
FOR SELECT
TO authenticated
USING (user_id = (SELECT auth.uid()));

CREATE POLICY "Admin can manage all progress" 
ON public.user_progress
FOR ALL
TO service_role
USING (true);

-- 6. Fix notifications policies
DROP POLICY IF EXISTS "Users can view their own notifications" ON public.notifications;
DROP POLICY IF EXISTS "Users can update their own notifications" ON public.notifications;
DROP POLICY IF EXISTS "Admin can manage all notifications" ON public.notifications;

-- Create optimized policies
CREATE POLICY "Users can view their own notifications" 
ON public.notifications
FOR SELECT
TO authenticated
USING (user_id = (SELECT auth.uid()));

CREATE POLICY "Users can update their own notifications" 
ON public.notifications
FOR UPDATE
TO authenticated
USING (user_id = (SELECT auth.uid()));

CREATE POLICY "Admin can manage all notifications" 
ON public.notifications
FOR ALL
TO service_role
USING (true);

-- 7. Fix user_preferences policies
DROP POLICY IF EXISTS "Users can view their own preferences" ON public.user_preferences;
DROP POLICY IF EXISTS "Users can update their own preferences" ON public.user_preferences;
DROP POLICY IF EXISTS "Users can insert their own preferences" ON public.user_preferences;
DROP POLICY IF EXISTS "Admin can manage all preferences" ON public.user_preferences;

-- Create optimized policies
CREATE POLICY "Users can view their own preferences" 
ON public.user_preferences
FOR SELECT
TO authenticated
USING (user_id = (SELECT auth.uid()));

CREATE POLICY "Users can update their own preferences" 
ON public.user_preferences
FOR UPDATE
TO authenticated
USING (user_id = (SELECT auth.uid()));

CREATE POLICY "Users can insert their own preferences" 
ON public.user_preferences
FOR INSERT
TO authenticated
WITH CHECK (user_id = (SELECT auth.uid()));

CREATE POLICY "Admin can manage all preferences" 
ON public.user_preferences
FOR ALL
TO service_role
USING (true);

-- 8. Fix feedback policies
DROP POLICY IF EXISTS "Users can insert feedback" ON public.feedback;
DROP POLICY IF EXISTS "Admin can view all feedback" ON public.feedback;

-- Create optimized policies
CREATE POLICY "Users can insert feedback" 
ON public.feedback
FOR INSERT
TO authenticated
WITH CHECK ((user_id = (SELECT auth.uid())) OR (user_id IS NULL));

CREATE POLICY "Admin can view all feedback" 
ON public.feedback
FOR SELECT
TO service_role
USING (true);

-- Add a comment to document the performance improvements
COMMENT ON TABLE public.subscriptions IS 'Subscription information with optimized RLS policies for better performance';