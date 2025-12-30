import { NextResponse } from 'next/server'
import { createSupabaseServerAuth } from '@/lib/supabase/server-auth'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')

  if (!code) {
    return NextResponse.redirect(`${origin}/login`)
  }

  const supabase = createSupabaseServerAuth()

  await supabase.auth.exchangeCodeForSession(code)

  return NextResponse.redirect(`${origin}/dashboard`)
}
