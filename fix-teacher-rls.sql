-- Fix Teacher RLS Policies for Name-Based Login
-- Run this in your Supabase SQL editor

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Teachers can view their own data" ON teachers;
DROP POLICY IF EXISTS "Teachers can update their own data" ON teachers;

-- Create new permissive policies for name-based login
CREATE POLICY "Teachers can be created"
  ON teachers FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Teachers are publicly readable"
  ON teachers FOR SELECT
  USING (true);

CREATE POLICY "Teachers can update their data"
  ON teachers FOR UPDATE
  USING (true);
