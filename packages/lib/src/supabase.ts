import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@fullbright/types/supabase';

let supabaseInstance: SupabaseClient<Database> | null = null;

export interface SupabaseConfig {
  url: string;
  anonKey: string;
}

/**
 * Initialize Supabase client
 */
export function initSupabase(config: SupabaseConfig): SupabaseClient<Database> {
  if (!supabaseInstance) {
    supabaseInstance = createClient<Database>(config.url, config.anonKey, {
      auth: {
        storage: typeof window !== 'undefined' ? localStorage : undefined,
        persistSession: true,
        autoRefreshToken: true,
      }
    });
  }
  return supabaseInstance;
}

/**
 * Get Supabase client instance
 */
export function getSupabase(): SupabaseClient<Database> {
  if (!supabaseInstance) {
    throw new Error('Supabase client not initialized. Call initSupabase() first.');
  }
  return supabaseInstance;
}

/**
 * Create Supabase client for apps (convenience function)
 */
export function createSupabaseClient(url: string, anonKey: string): SupabaseClient<Database> {
  return createClient<Database>(url, anonKey, {
    auth: {
      storage: typeof window !== 'undefined' ? localStorage : undefined,
      persistSession: true,
      autoRefreshToken: true,
    }
  });
}

export type { SupabaseClient };
