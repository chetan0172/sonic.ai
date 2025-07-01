import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Please ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in your .env file.'
  );
}

// Validate URL format and HTTPS
try {
  const url = new URL(supabaseUrl);
  if (url.protocol !== 'https:') {
    throw new Error('Supabase URL must use HTTPS protocol');
  }
  if (!url.host.includes('.supabase.co')) {
    throw new Error('Invalid Supabase URL domain. URL must be from supabase.co domain');
  }
} catch (error) {
  if (error instanceof Error) {
    throw new Error(
      `Invalid VITE_SUPABASE_URL configuration: ${error.message}. Please check your .env file.`
    );
  }
  throw error;
}

// Validate anon key format (should be a JWT-like string)
if (
  typeof supabaseAnonKey !== 'string' || 
  !supabaseAnonKey.match(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/)
) {
  throw new Error(
    'Invalid VITE_SUPABASE_ANON_KEY format. Please ensure it is a valid Supabase anonymous key.'
  );
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});