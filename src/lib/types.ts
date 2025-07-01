export interface Database {
  public: {
    Tables: {
      content_items: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          content_type: 'video' | 'audio' | 'blog';
          storage_path: string;
          original_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          content_type: 'video' | 'audio' | 'blog';
          storage_path: string;
          original_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          content_type?: 'video' | 'audio' | 'blog';
          storage_path?: string;
          original_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      generated_posts: {
        Row: {
          id: string;
          content_item_id: string;
          platform: 'twitter' | 'instagram' | 'linkedin' | 'tiktok';
          content: string;
          media_url: string | null;
          status: 'draft' | 'scheduled' | 'published';
          created_at: string;
          scheduled_for: string | null;
        };
        Insert: {
          id?: string;
          content_item_id: string;
          platform: 'twitter' | 'instagram' | 'linkedin' | 'tiktok';
          content: string;
          media_url?: string | null;
          status?: 'draft' | 'scheduled' | 'published';
          created_at?: string;
          scheduled_for?: string | null;
        };
        Update: {
          id?: string;
          content_item_id?: string;
          platform?: 'twitter' | 'instagram' | 'linkedin' | 'tiktok';
          content?: string;
          media_url?: string | null;
          status?: 'draft' | 'scheduled' | 'published';
          created_at?: string;
          scheduled_for?: string | null;
        };
      };
      campaigns: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          description: string | null;
          status: 'active' | 'paused' | 'completed';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          description?: string | null;
          status?: 'active' | 'paused' | 'completed';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          description?: string | null;
          status?: 'active' | 'paused' | 'completed';
          created_at?: string;
          updated_at?: string;
        };
      };
      analytics_events: {
        Row: {
          id: string;
          user_id: string;
          event_type: string;
          content_item_id: string | null;
          generated_post_id: string | null;
          platform: string | null;
          metadata: Record<string, any>;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          event_type: string;
          content_item_id?: string | null;
          generated_post_id?: string | null;
          platform?: string | null;
          metadata?: Record<string, any>;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          event_type?: string;
          content_item_id?: string | null;
          generated_post_id?: string | null;
          platform?: string | null;
          metadata?: Record<string, any>;
          created_at?: string;
        };
      };
      wishlists: {
        Row: {
          id: string;
          email: string;
          created_at: string;
          features: Record<string, any>;
          additional_features: string | null;
          first_name: string | null;
          last_name: string | null;
          company_name: string | null;
          role: string | null;
        };
        Insert: {
          id?: string;
          email: string;
          created_at?: string;
          features?: Record<string, any>;
          additional_features?: string | null;
          first_name?: string | null;
          last_name?: string | null;
          company_name?: string | null;
          role?: string | null;
        };
        Update: {
          id?: string;
          email?: string;
          created_at?: string;
          features?: Record<string, any>;
          additional_features?: string | null;
          first_name?: string | null;
          last_name?: string | null;
          company_name?: string | null;
          role?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}