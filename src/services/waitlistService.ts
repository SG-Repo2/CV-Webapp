import { SupabaseClient } from '@supabase/supabase-js';

export async function addWaitlistEmail(
  supabase: SupabaseClient,
  email: string,
  metadata?: Record<string, any>
) {
  // Check if email exists by counting matches instead of using single()
  const { count, error: countError } = await supabase
    .from('waitlist')
    .select('*', { count: 'exact', head: true })
    .eq('email', email);

  if (countError) {
    console.error('Error checking email existence:', countError);
    throw countError;
  }

  if (count && count > 0) {
    throw new Error('Email already registered');
  }

  // Insert new email
  const { error: insertError } = await supabase
    .from('waitlist')
    .insert([
      {
        email,
        metadata,
        created_at: new Date().toISOString()
      }
    ]);

  if (insertError) {
    console.error('Error adding email to waitlist:', insertError);
    throw insertError;
  }

  return { success: true };
}