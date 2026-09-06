import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

function getSupabase(): SupabaseClient {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY;
  if (!url || !key) {
    throw new Error('Supabase not configured');
  }
  return createClient(url, key);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, license_number, broker_company, sign_in_method } = body;

    if (!name || !email || !license_number || !broker_company) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields'
      }, { status: 400 });
    }

    const emailLower = email.toLowerCase();
    const supabase = getSupabase();

    // Upsert the agent request (using existing table structure)
    const { data, error } = await supabase
      .from('agent_requests')
      .upsert({
        email: emailLower,
        name,
        phone: phone || null,
        license_number,
        broker_company,
        status: 'pending',
        rejection_reason: null,
        submitted_at: new Date().toISOString(),
        reviewed_at: null,
      }, { onConflict: 'email' })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      data
    });
  } catch (error) {
    console.error('Agent submit error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to submit agent request'
    }, { status: 500 });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
