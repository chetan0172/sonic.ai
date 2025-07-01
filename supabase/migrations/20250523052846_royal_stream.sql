/*
  # Create wishlists table

  1. New Tables
    - `wishlists`
      - `id` (uuid, primary key)
      - `email` (text, not null)
      - `created_at` (timestamp with time zone)
      - `features` (jsonb)
      - `additional_features` (text)
      - `first_name` (text)
      - `last_name` (text)
      - `company_name` (text)
      - `role` (text)

  2. Security
    - Enable RLS on `wishlists` table
    - Add policy for public to insert data
*/

-- Create wishlists table
CREATE TABLE IF NOT EXISTS wishlists (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  created_at timestamptz DEFAULT now(),
  features jsonb DEFAULT '{}'::jsonb,
  additional_features text,
  first_name text,
  last_name text,
  company_name text,
  role text
);

-- Enable Row Level Security
ALTER TABLE wishlists ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public inserts
CREATE POLICY "Allow public to insert wishlists"
  ON wishlists
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Create policy to allow authenticated users to view their own entries
CREATE POLICY "Users can view their own wishlists"
  ON wishlists
  FOR SELECT
  TO authenticated
  USING (email = current_user);