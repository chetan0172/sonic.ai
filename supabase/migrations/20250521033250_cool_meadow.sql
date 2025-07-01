/*
  # Initial Schema Setup for Zsonic.ai

  1. New Tables
    - users (managed by Supabase Auth)
    - content_items
      - Stores uploaded content metadata
      - Links to object storage for files
    - generated_posts
      - Stores AI-generated content variations
      - References original content
    - campaigns
      - Manages scheduled post campaigns
    - analytics_events
      - Tracks user interactions and content performance

  2. Security
    - Enable RLS on all tables
    - Add policies for user-specific access
*/

-- Content Items Table
CREATE TABLE IF NOT EXISTS content_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  title text NOT NULL,
  content_type text NOT NULL CHECK (content_type IN ('video', 'audio', 'blog')),
  storage_path text NOT NULL,
  original_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE content_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can CRUD their own content"
  ON content_items
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Generated Posts Table
CREATE TABLE IF NOT EXISTS generated_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content_item_id uuid REFERENCES content_items(id) ON DELETE CASCADE NOT NULL,
  platform text NOT NULL CHECK (platform IN ('twitter', 'instagram', 'linkedin', 'tiktok')),
  content text NOT NULL,
  media_url text,
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'published')),
  created_at timestamptz DEFAULT now(),
  scheduled_for timestamptz
);

ALTER TABLE generated_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their generated posts"
  ON generated_posts
  FOR ALL
  USING (EXISTS (
    SELECT 1 FROM content_items
    WHERE content_items.id = generated_posts.content_item_id
    AND content_items.user_id = auth.uid()
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM content_items
    WHERE content_items.id = generated_posts.content_item_id
    AND content_items.user_id = auth.uid()
  ));

-- Campaigns Table
CREATE TABLE IF NOT EXISTS campaigns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  name text NOT NULL,
  description text,
  status text DEFAULT 'active' CHECK (status IN ('active', 'paused', 'completed')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their campaigns"
  ON campaigns
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Analytics Events Table
CREATE TABLE IF NOT EXISTS analytics_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  event_type text NOT NULL,
  content_item_id uuid REFERENCES content_items(id),
  generated_post_id uuid REFERENCES generated_posts(id),
  platform text,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their analytics"
  ON analytics_events
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "System can insert analytics"
  ON analytics_events
  FOR INSERT
  WITH CHECK (true);

-- Add updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for updated_at
CREATE TRIGGER update_content_items_updated_at
  BEFORE UPDATE ON content_items
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_campaigns_updated_at
  BEFORE UPDATE ON campaigns
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();