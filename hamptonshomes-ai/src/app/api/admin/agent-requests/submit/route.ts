import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY! // Use service key for writes
);

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