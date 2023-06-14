import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const redirectURL = new URL('/', process.env.NEXT_PUBLIC_URL)
  return NextResponse.redirect(redirectURL.href, {
    headers: {
      'Set-Cookie': [
        'token=; Path=/; Max-Age=0',
        'redirectTo=; Path=/; Max-Age=0',
      ].join(', '),
    },
  })
}
