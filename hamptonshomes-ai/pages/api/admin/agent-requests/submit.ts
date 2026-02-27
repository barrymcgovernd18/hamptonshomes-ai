import { createClient } from '@supabase/supabase-js';
import type { NextApiRequest, NextApiResponse } from 'next';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY! // Use service key for writes
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // CORS for mobile apps
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { name, email, phone, license_number, broker_company, sign_in_method } = req.body;

    if (!name || !email || !license_number || !broker_company) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
    }

    const emailLower = email.toLowerCase();

    // Get count for agent_number
    const { count } = await supabase
      .from('agent_requests')
      .select('*', { count: 'exact', head: true });

    const agentNumber = (count || 0) + 1;

    // Upsert the agent request
    const { data, error } = await supabase
      .from('agent_requests')
      .upsert({
        email: emailLower,
        name,
        phone: phone || null,
        license_number,
        broker_company,
        agent_number: agentNumber,
        status: 'pending',
        rejection_reason: null,
        submitted_at: new Date().toISOString(),
        reviewed_at: null,
        sign_in_method: sign_in_method || 'email',
      }, { onConflict: 'email' })
      .select()
      .single();

    if (error) throw error;

    return res.status(200).json({
      success: true,
      data
    });
  } catch (error) {
    console.error('Agent submit error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to submit agent request'
    });
  }
}