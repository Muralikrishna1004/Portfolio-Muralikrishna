import { useEffect, useState } from 'react';
import { supabase } from './supabase';

interface VisitorStats {
  totalVisitors: number;
  loading: boolean;
}

export function useVisitorStats(): VisitorStats {
  const [totalVisitors, setTotalVisitors] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function trackAndFetchVisitors() {
      try {
        // Track this visit
        const { error: insertError } = await supabase
          .from('visitors')
          .insert({ ip_hash: 'anonymous' });

        if (insertError) console.log('Visit tracking:', insertError.message);

        // Get total count
        const { count, error: countError } = await supabase
          .from('visitors')
          .select('*', { count: 'exact', head: true });

        if (!countError && count) {
          setTotalVisitors(count);
        }
      } catch (err) {
        console.error('Visitor tracking error:', err);
      } finally {
        setLoading(false);
      }
    }

    trackAndFetchVisitors();
  }, []);

  return { totalVisitors, loading };
}

export async function submitContactForm(data: {
  name: string;
  email: string;
  subject?: string;
  message: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.from('contacts').insert([data]);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    return { success: false, error: 'Failed to submit form' };
  }
}
